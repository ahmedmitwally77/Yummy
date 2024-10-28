//* Variables 

let home=document.querySelector("#home");
let showDetailsMeal=document.querySelector(".show-details");
let seacrhPage=document.querySelector("#search");
let categories=document.querySelector("#categories");
let area=document.querySelector("#area");
let ingredients=document.querySelector("#ingredients");
let contactUs=document.querySelector("#contact-us");
let regex={
  name:/^[a-zA-Z]{3,15}$/,
  email:/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
  password:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
  phone:/^01[0125][0-9]{8}$/,
  age:/^[0-9]{2,3}$/
}

//* document ready in home page
$('document').ready(function(){
  $('.spinner-layer').addClass('d-none')
  $('body').removeClass('overflow-hidden')
})

//* sideBar To Active or Not 
let header=$(".sideBar");
header.css('left',-header.outerWidth())
$(".fa-bars").click(function(){
  if(header.css('left')=='0px'){
    header.css('left',-header.outerWidth())
    $(".toggle i").removeClass("fa-x").addClass("fa-bars")
  }else{
    header.css('left',0)
    $(".toggle i").removeClass("fa-bars").addClass("fa-x")
  }
  
})



//* Search 
async function searchByName(key){
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`);
  let data=await res.json();
  return data
}
async function searchByFirstName(key){
  key == "" ? key = "a" : "";
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${key}`);
  let data=await res.json();
  return data
}


// * Display boxes
async function display(key){
let data = await searchByName(key);
let cartona="";
data.meals.map((meal)=>{
  cartona+=`          
          <div class="col-md-3 rounded-4" data-id="${meal.idMeal}">
            <div class="inner rounded-2 overflow-hidden position-relative">
              <img src="${meal.strMealThumb}" alt="" class="meal-img w-100">
              <div
                class="layer p-3 position-absolute  rounded-2 d-flex justify-content-start align-items-center">
                <h5 class="meal-name fs-2 fw-bold text-black">${meal.strMeal}</h5>
              </div>
            </div>
          </div>`
})

return cartona;
}

async function displayOneChar(key){
  let data = await searchByFirstName(key);
  let cartona="";
  data.meals.map((meal)=>{
    cartona+=`          
            <div class="col-md-3 rounded-4" data-id="${meal.idMeal}">
              <div class="inner rounded-2 overflow-hidden position-relative">
                <img src="${meal.strMealThumb}" alt="" class="meal-img w-100">
                <div
                  class="layer p-3 position-absolute  rounded-2 d-flex justify-content-start align-items-center">
                  <h5 class="meal-name fs-2 fw-bold text-black">${meal.strMeal}</h5>
                </div>
              </div>
            </div>`
  })
  
  
  return cartona;
  }

// *Display Home Page
async function displayHome(){
  $('section').addClass('d-none')
  home.classList.remove('d-none')
  let myRow=document.querySelector(".home .row");
  $('.spinner-layer').removeClass('d-none')
  myRow.innerHTML+= await display(" ")  
  $('.spinner-layer').addClass('d-none')
  let myRow2=document.querySelector(".show-details  .row");
  $("#home .col-md-3").click( async function(e){
    $('section').addClass('d-none')
    showDetailsMeal.classList.remove('d-none')
    $('.spinner-layer').removeClass('d-none')
    myRow2.innerHTML=await showDetails(e.currentTarget.dataset.id) ;
    $('.spinner-layer').addClass('d-none')
    showDetailsMeal.classList.remove("d-none")

    $(".exist-meal").click(function(){
      $('.spinner-layer').removeClass('d-none')
      showDetailsMeal.classList.add('d-none');
      home.classList.remove('d-none')
      $('.spinner-layer').addClass('d-none')
    })
  })

}
displayHome(" ")

//* Display InDetails 
async function showDetails(id){
  $('section').addClass('d-none')
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);  
  let data= await res.json();
  let meal=data.meals[0];

  let ingredients="";
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients+=`<li class="recipes m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
    }
  }

  let cartona=`
          <div class="exist-meal icon p-2 text-end position-absolute top-0 end-0 "><i class="fa-solid fa-x fa-1x"></i> </div>
          <div class="col-md-4">
            <img src="${meal.strMealThumb}" class="w-100" alt="">
            <h3 class="mt-3">${meal.strMeal}</h3>
          </div>
          <div class="col-md-8">
            <h2>Instructions</h2>
            <p class="desc mt-3">
              ${meal.strInstructions}
            </p>
            <h3 class="mt-3">Area : <span class="area">${meal.strArea}</span></h3>
            <h3 class="mt-3">Catogories : <span class="catogories">${meal.strCategory}</span></h3>
            <div class="mt-3"><h3>Recipes :</h3> 
              <div class="all-recipes mt-3 g-2">
                <ul class='list-unstyled d-flex g-3 flex-wrap'>
                  ${ingredients}
                </ul>
              </div>
            </div>
            <div class="mt-3">
              <h3>Tags :</h3>
              <button class="tags mt-3 btn btn-outline-success"><a href="${meal.strSource}" target="_blank" class="text-decoration-none text-white">Sourcs</a></button>
              <button class="tags btn  mt-3 btn-outline-danger"><a href="${meal.strYoutube}" target="_blank" class="text-decoration-none text-white">Youtube</a></button>
            </div>
          </div>
        `  

return cartona;
}

//* When Click in SideBar
$('.sideBar ul li').on('click',async function(e){
  if(e.target.textContent=='Search'){
    showSearch()
  }
  else if(e.target.textContent=='Categories'){
    showCategories()
  }
  else if(e.target.textContent=='Area'){
  showAreas()
  }
  else if(e.target.textContent=='Ingredients'){
  showIngredients()
  }
  else if(e.target.textContent=='Contacts us'){
    $('.spinner-layer').removeClass('d-none')
    $('section').addClass('d-none')
    contactUs.classList.remove('d-none')
    $('.spinner-layer').addClass('d-none')
  }
  header.css('left',-header.outerWidth())
  $(".toggle i").removeClass("fa-x").addClass("fa-bars")

}


)

//* Start Display Search

async function showSearch(){
  $('.spinner-layer').removeClass('d-none')
  $('section').addClass('d-none')
    seacrhPage.classList.remove('d-none')
    $('.spinner-layer').addClass('d-none')

    $('.search-name').on('keyup', async function(e){
      async function searchInterval(){
        $('.spinner-layer').removeClass('d-none')
        let data=await display(e.target.value)
        $('#search .row-display').html(data)
        $('.spinner-layer').addClass('d-none')
        $('#search .col-md-3').click(async function(e){
          $('section').addClass('d-none')
          $('.spinner-layer').removeClass('d-none')
          let data=await showDetails(e.currentTarget.dataset.id);
          $('#search .row-display').html(data)
          $('#search .row-input').addClass('d-none')
          $('.spinner-layer').addClass('d-none')
          seacrhPage.classList.remove("d-none")
          $('.exist-meal').click(function(){
            $('.spinner-layer').removeClass('d-none')
          $('#search .row-input').removeClass('d-none')
          $('.spinner-layer').addClass('d-none')
            searchInterval()
          })
      }
        )
      }
      searchInterval()
    })
    $('.search-letter').on('keyup', async function(e){
        async function searchInterval2(){
          $('.spinner-layer').removeClass('d-none')
          let data=await displayOneChar(e.target.value)
          $('#search .row-display').html(data)
          $('.spinner-layer').addClass('d-none')
          $('#search .col-md-3').click(async function(e){
            $('section').addClass('d-none')
            $('.spinner-layer').removeClass('d-none')
            let data=await showDetails(e.currentTarget.dataset.id);
            $('#search .row-display').html(data)
            $('#search .row-input').addClass('d-none')
            $('.spinner-layer').addClass('d-none')
            seacrhPage.classList.remove("d-none")
            $('.exist-meal').click(function(){
              $('.spinner-layer').removeClass('d-none')
            $('#search .row-input').removeClass('d-none')
            $('.spinner-layer').addClass('d-none')
              searchInterval2()
            })
        }
          )
        }
        searchInterval2()
      
    })
}
//* End Display Search 

//* Start Display Categories 
async function showCategories(){
  $('section').addClass('d-none')
  categories.classList.remove('d-none')
  $('.spinner-layer').removeClass('d-none')
  let data=await getAllCategories()
  $('.spinner-layer').addClass('d-none')
  let cartona="";
  data.categories.map((category)=>{
    cartona+=`<div class="col-md-3 rounded-4" data-category="${category.strCategory}"  data-id="${category.idCategory}}">
          <div class="inner rounded-2 overflow-hidden position-relative">
            <img src="${category.strCategoryThumb}" alt="" class="w-100">
            <div class="layer p-3 position-absolute  rounded-2 flex-column d-flex justify-content-start align-items-center">
              <h5 class="meal-name fs-4 fw-bold text-black">${category.strCategory}</h5>
              <p class="desc mt-1 text-black">${category.strCategoryDescription.slice(0,100)}</p>
            </div>
          </div>
        </div>`
  })
  $('#categories .row-display').html(cartona)

  $('#categories .col-md-3').click(async function(e){
    $('section').addClass('d-none')
    categories.classList.remove('d-none')
    let keySearch=e.currentTarget.dataset.category;

  async function catSel(){
    $('.spinner-layer').removeClass('d-none')
    let data=await displaySelectedCategories( keySearch)
    $('.spinner-layer').addClass('d-none')
    
    $('#categories .row-display').html(data)
    $('.cat-details').click(async function(e){
      $('section').addClass('d-none')
      categories.classList.remove('d-none')
      $('.spinner-layer').removeClass('d-none')
      let data=await showDetails(e.currentTarget.dataset.id)
      $('.spinner-layer').addClass('d-none')
      $('#categories .row-display').html(data)
      categories.classList.remove('d-none')
      $("#categories .exist-meal").click(async function(){
        catSel()
        })
  })
  }
  catSel()
    }
  )
}
async function getAllCategories(){
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  let data=await res.json();
  return data;
}

async function displaySelectedCategories(key){
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${key}`);
  let data=await res.json();
  let cartona="";
  
data.meals.map((meal)=>{
  cartona+=`          
          <div class="col-md-3 cat-details rounded-4" data-id="${meal.idMeal}">
            <div class="inner rounded-2 overflow-hidden position-relative">
              <img src="${meal.strMealThumb}" alt="" class="meal-img w-100">
              <div
                class="layer p-3 position-absolute  rounded-2 d-flex justify-content-start align-items-center">
                <h5 class="meal-name fs-2 text-black fw-bold">${meal.strMeal}</h5>
              </div>
            </div>
          </div>`
})

return cartona;
}
//* End Display Categories 

//* Start Display Areas

async function showAreas(){
  $('section').addClass('d-none')
  areas.classList.remove('d-none')

  $('.spinner-layer').removeClass('d-none')
  let data=await getAllAreas()
  $('.spinner-layer').addClass('d-none')

  let cartona="";
  data.meals.map((area)=>{
    cartona+=`<div class="col-md-3 area-all-details rounded-4" data-id="${area.strArea}">
          <div class="inner rounded-2 overflow-hidden position-relative">
            <i class="fa-solid fa-house-laptop fs-1"></i>
            <h3 class="text-white">${area.strArea}</h3>
          </div>
        </div>`
  })
  $('#areas .row-display').html(cartona)

  $('#areas .area-all-details').click(async function(e){
    let keySearch=e.currentTarget.dataset.id;
    async function areSel(){
      $('.spinner-layer').removeClass('d-none')
      let data=await displaySelectedAreas(keySearch)
      $('.spinner-layer').addClass('d-none')
      $('#areas .row-display').html(data)
      areas.classList.remove('d-none')
      $('#areas .area-details').click(async function(e){
        $('section').addClass('d-none')
        areas.classList.remove('d-none')
        $('.spinner-layer').removeClass('d-none')
        let data=await showDetails(e.currentTarget.dataset.id)
        $('.spinner-layer').addClass('d-none')
        $('#areas .row-display').html(data)
        areas.classList.remove('d-none')
        $("#areas .exist-meal").click(async function(){
          areSel()
        })
    })
    
    }
    areSel()
    })
}

async function getAllAreas(){
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  let data=await res.json();
  return data;
}

async function displaySelectedAreas(key){
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${key}`);
  let data=await res.json();
  let cartona="";
  
data.meals.map((meal)=>{
  cartona+=`          
          <div class="col-md-3 area-details rounded-4" data-id="${meal.idMeal}">
            <div class="inner rounded-2 overflow-hidden position-relative">
              <img src="${meal.strMealThumb}" alt="" class="meal-img w-100">
              <div
                class="layer p-3 position-absolute  rounded-2 d-flex justify-content-start align-items-center">
                <h5 class="meal-name fs-2 text-black fw-bold">${meal.strMeal}</h5>
              </div>
            </div>
          </div>`
})

return cartona;
}
// * End Display Areas


// * Start Display Ingredients

async function showIngredients(){
  $('section').addClass('d-none')
  ingredients.classList.remove('d-none')
  $('.spinner-layer').removeClass('d-none')
  let data=await getAllIngredients()
  $('.spinner-layer').addClass('d-none')
  
  let cartona="";
  data.meals.map((ingredient)=>{
    cartona+=`<div class="col-md-3 ingredient-all-details rounded-4"  data-id="${ingredient.strIngredient}">
          <div class="inner rounded-2 overflow-hidden position-relative d-flex justify-content-center flex-column text-center">
            <i class="fa-solid fa-drumstick-bite fs-1"></i>
            <h3 class="text-white">${ingredient.strIngredient}</h3>
            <p class="text-white">${ingredient.strDescription ? ingredient.strDescription.split(" ").slice(0, 20).join(" ") : ""}</p>
          </div>
        </div>`        
  })
  $('#ingredients .row-display').html(cartona)

  $('#ingredients .ingredient-all-details').click(async function(e){
    $('section').addClass('d-none')
    ingredients.classList.remove('d-none')
    let keySearch=e.currentTarget.dataset.id
    async function ingSel(){
      $('.spinner-layer').removeClass('d-none')
    let data=await displaySelectedIngredients(  keySearch)
    $('.spinner-layer').addClass('d-none')

    $('#ingredients .row-display').html(data)
    $('#ingredients .ingredients-details').click(async function(e){
      $('section').addClass('d-none')
      ingredients.classList.remove('d-none')
      $('.spinner-layer').removeClass('d-none')
      let data=await showDetails(e.currentTarget.dataset.id)
      ingredients.classList.remove('d-none')
      $('.spinner-layer').addClass('d-none')
      $('#ingredients .row-display').html(data)

      $("#ingredients .exist-meal").click(async function(){
        ingSel()
      })
    })
    }
    ingSel()
})

}

async function getAllIngredients(){
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  let data=await res.json();
  return data;
}

async function displaySelectedIngredients(key){
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${key}`);
  let data=await res.json();
  let cartona="";
  console.log(key);
  
  console.log(data);
  

data.meals.map((meal)=>{
  cartona+=`          
          <div class="col-md-3 ingredients-details rounded-4" data-id="${meal.idMeal}">
            <div class="inner rounded-2 overflow-hidden position-relative">
              <img src="${meal.strMealThumb}" alt="" class="meal-img w-100">
              <div
                class="layer p-3 position-absolute  rounded-2 d-flex justify-content-start align-items-center">
                <h5 class="meal-name fs-2 text-black fw-bold">${meal.strMeal}</h5>
              </div>
            </div>
          </div>`
})

return cartona;
}

//* End Display Ingredients

//* Start main validation 
$('#contact-us input').on('input',function(e){
  mainValidation(e.target)
})

function mainValidation(val){ 
  console.log(val);
  if(val.getAttribute('name') === 'repassword'){
    if(val.value === document.querySelector('#contact-us input[name="password"]').value){
      val.classList.remove('is-invalid')
      val.classList.add('is-valid')
      val.nextElementSibling.nextElementSibling.classList.add('d-none')
      return true
  }
  else{
    val.nextElementSibling.nextElementSibling.classList.remove('d-none')
    val.classList.add('is-invalid')
    val.classList.remove('is-valid')
    return false
  }
  }

  else if(regex[val.name].test(val.value) ){
    val.classList.remove('is-invalid')
    val.classList.add('is-valid')
    val.nextElementSibling.nextElementSibling.classList.add('d-none')
    return true
  }else{
    val.nextElementSibling.nextElementSibling.classList.remove('d-none')
    val.classList.add('is-invalid')
    val.classList.remove('is-valid')
    return false
  }
}


function conatctUs(){
  let name=document.querySelector('#contact-us input[name="name"]')
  let email=document.querySelector('#contact-us input[name="email"]')
  let subject=document.querySelector('#contact-us input[name="phone"]')
  let message=document.querySelector('#contact-us textarea[name="age"]')
  let password=document.querySelector('#contact-us input[name="password"]')
  let rePassword=document.querySelector('#contact-us input[name="repassword"]')
  if(mainValidation(name)&&mainValidation(email)&&mainValidation(password)&&mainValidation(subject)&&mainValidation(message)){
    if(password.value===rePassword.value){
      return true
    }else{
      return false
    }
  }
}

$('#submit').on('click',function(e){
  e.preventDefault()
  if(conatctUs()){
    alert('done')
  }else{
    $('#submit').next().addClass('d-none')
  }
})

//* End main validation 