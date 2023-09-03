$("#side-toggler").click(function(e) {
    $("aside").animate({"left": "0"})
    $("#side-toggler").css("display","none")
    $("#side-closer").css('display',"block")
})

$("#side-closer").click(function(e) {
    $("aside").animate({"left": "-250px"})
    $("#side-toggler").css("display","block")
    $("#side-closer").css('display',"none")
})

let d;

async function get() {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    const data = await res.json()

    let elements = ''

    data.meals.forEach((meal, i) => {
        elements += `
            <div class="col-md-3" >
                <div class="item" data-index="${i}">
                    <img class="d-block w-100" src="${meal.strMealThumb}" alt="">
                    <div class="overlay d-flex flex-column justify-content-center">
                        <h2 class='p-2'>${meal.strMeal}</h2>
                    </div>
                </div>
            </div>
        `
    });
    $(".gallery").html(elements)
    $(".item").click(function() {
        let meal = data.meals[this.dataset.index]
        $(".gallery").hide()
        $('.details .col-md-3 div').html(`<img class="d-block w-100" src="${meal.strMealThumb}" alt="">
        <h2 class="text-white">${meal.strMeal}</h2>
        `)

        $(".details .col-md-9 div").html(`
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>
            <h3>Area: ${meal.strArea}</h3>
            <h3>Category: ${meal.strCategory}</h3>
            <h3>Recipe:</h3>
            <div class="recipe"></div>
            <a class="btn btn-success" href="${meal.strSource}">Source</a>
            <a class="btn btn-danger" href="${meal.strYoutube}">Youtube</a>
        `)

        document.querySelector(".details").classList.remove("d-none")
    })
    
    d = await data
}

get()
console.log(d)

$(".item").click(() => {
    alert("fsfsd")
})

$("#categories").click(async function() {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    const data = await res.json()
    
    let elements = ''

    data.categories.forEach((meal, i) => {
        elements += `
            <div class="col-md-3" >
                <div class="item overflow-hidden" data-index="${i}">
                    <img class="d-block w-100" src="${meal.strCategoryThumb}" alt="">
                    <div class="overlay text-center p-2ذ">
                        <h2 class='p-2'>${meal.strCategory}</h2>
                        <p>${meal.strCategoryDescription}</p>
                    </div>
                </div>
            </div>
        `
    });
    $(".gallery").hide()
    $(".categories").html(elements)
})