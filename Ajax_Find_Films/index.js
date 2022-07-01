let s = document.getElementById("selct_type")
var input = document.getElementById("searcu__text_input")
let btn_find = document.getElementById("load")
let page = document.getElementById('Paage')
let prew = document.getElementById('Prew')
let Next = document.getElementById('Next')
let movieBox = document.getElementById('movieBox')

let span_text_page = document.getElementById('span_text_page')
let loader = document.getElementById('loader')


page = 0
Next.style.visibility = 'hidden'
prew.style.visibility = 'hidden' 
movieBox.style.visibility = 'hidden' 

btn_find.addEventListener('click', function(){
    var value = s.options[s.selectedIndex].value
    console.log(value)
    console.log(input.value)

    if(input.value != ""){
        movieBox.style.visibility = 'visible'
        movieBox.style.height = "200px"
        let span = document.createElement('span')
        span.style.visibility = "hidden"

        while(movieBox.firstChild){
            movieBox.removeChild(movieBox.firstChild)
        }
        while(not_faund.firstChild){
            not_faund.removeChild(not_faund.firstChild)
        }
        page = 1
        GetFilms(page, value)
        setTimeout(function(){
            span_text_page.innerText = `Page: ${page}`
        },2000)         
    }
})

prew.addEventListener('click', function(){
    if(input.value != ""){
        if(page == 1){
            span_text_page.className = "Active"
             setTimeout(go, 400)
        }
        if(page == 0){
             span_text_page.className = "Active"
             setTimeout(go, 400)
        }
        else if(page > 1){
            while(movieBox.firstChild){
                movieBox.removeChild(movieBox.firstChild)
            }
            movieBox.style.visibility = 'visible'
            var value = s.options[s.selectedIndex].value
            page--
            span_text_page.innerText = `Page: ${page}`
            GetFilms(page, value)
        }
    }
})

Next.addEventListener('click', function(){
    while(movieBox.firstChild){
        movieBox.removeChild(movieBox.firstChild)
    }
    movieBox.style.visibility = 'visible'
    var value = s.options[s.selectedIndex].value
    if(input.value != ""){
        page++
        span_text_page.innerText = `Page: ${page}`
        GetFilms(page, value)
    }
})

function GetFilms(page, value){
    function rep(){
        const URl = `http://www.omdbapi.com/?i=tt3896198&apikey=5f10be94&s=${input.value}&type=${value}&page=${page}`
        movieBox.style.height = "200px"
        fetch(URl)
            .then(resp => resp.json())
                .then(PromisResult => {
                    // try{
                        loader.style.height = "auto"
                        loader.style.visibility = "visible"
                        setTimeout(function(){
                            PromisResult.Search.forEach(element => {
                                let html = ` 
                                <div id="card"> 
                                    <div id="img_film"> 
                                        <img src="${element.Poster}" alt=""> 
                                    </div> 
                                    <div id="description_movie"> 
                                        <div class="Type"> 
                                            <span>${value}</span> 
                                        </div> 
                                        <div class="title"> 
                                            <span>${input.value}</span> 
                                        </div> 
                                        <div class="Year"> 
                                            <span>${element.Year}</span> 
                                        </div> 
                                        <button id="btn_description" class="btn btn-primary BT_D" value=${element.imdbID}>Details</button>
                                    </div> 
                                </div> 
                                ` 
                                var div = document.createElement('div') 
                                div.innerHTML = html 
                                movieBox.appendChild(div)  
                                movieBox.style.height = "auto"
                                Next.style.visibility = 'visible'
                                prew.style.visibility = 'visible'
                            })
                        }, 2000)
    
                        setTimeout(function(){
                            loader.style.visibility = "hidden"
                            loader.style.height = 0
                        }, 2000)
                    })
    }
    rep()
    

                    setTimeout(function(){
                        let detailsButton = document.getElementsByClassName('BT_D')
                        detailsButton=Array.from(detailsButton)
                        console.log(detailsButton)
                        detailsButton.forEach(elem => {
                            console.log(elem)
                            elem.addEventListener('click', function(e) {
                                movieBox.style.height = 'auto'
                                while(movieBox.firstChild){
                                    movieBox.removeChild(movieBox.firstChild)
                                }

                                console.log(e.target.value)
                                const URL = `http://www.omdbapi.com/?apikey=5f10be94&i=${e.target.value}`
                                fetch(URL)
                                    .then(resp => resp.json())
                                        .then(PromiseResult => {
                                            loader.style.visibility = 'visible'
                                            loader.style.height = 'auto'
                                            setTimeout(function(){
                                                let html = `
                                            <div id="dop_info_flex">
                                                    <div id="text_info">file info</div>
                                                    <div id="car_Details">
                                                        <div id="img">
                                                            <img src="${PromiseResult.Poster}" alt="">
                                                        </div>
                                                        <div id="details_Content">
                                                            <div id="title_Details">
                                                                <span>Title:</span>
                                                                <span id="content_res" class="description_title">${PromiseResult.Title}</span>
                                                            </div>
                                                            <div id="Releaset">
                                                                <span>Releaset:</span>
                                                                <span id="content_res" class="description_title">${PromiseResult.Released}</span>
                                                            </div>
                                                            <div id="Genre">
                                                                <span>Genre:</span>
                                                                <span id="content_res" class="description_title">${PromiseResult.Genre}</span>
                                                            </div>
                                                            <div id="Couuntry">
                                                                <span>Couuntry:</span>
                                                                <span id="content_res" class="description_title">${PromiseResult.Country}</span>
                                                            </div>
                                                            <div id="Directory">
                                                                <span>Directory:</span>
                                                                <span id="content_res" class="description_title">${PromiseResult.Director}</span>
                                                            </div>
                                                            <div id="Writer">
                                                                <span>Writer:</span>
                                                                <span id="content_res" class="description_title">${PromiseResult.Writer}</span>
                                                            </div>
                                                            <div id="Actors">
                                                                <span>Actors:</span>
                                                                <span id="content_res" class="description_title">${PromiseResult.Actors}</span>
                                                            </div>
                                                            <div id="Awards">
                                                                <span>Awards:</span>
                                                                <span id="content_res" class="description_title">${PromiseResult.Awards}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> 
                                                <button id="buttton_back" class="btn btn-primary">Back</button>
                                            `
                                            var div = document.createElement('div') 
                                            div.innerHTML = html 
                                            movieBox.appendChild(div)  
                                            }, 2000)
                                            setTimeout(function(){
                                                loader.style.visibility = "hidden"
                                                loader.style.height = 0
                                            }, 2000)
                                           
                                        })
                                        setTimeout(function(){
                                            let buttton_back = document.getElementById('buttton_back')
                                            buttton_back.addEventListener('click', function(){
                                                        while(movieBox.firstChild){
                                                            movieBox.removeChild(movieBox.firstChild)
                                                        }
                                                        rep()
                                                
                                                    })
                                                   
                                                }, 3000)
                            })
                        })
                    }, 3000)
                
            }


function go(){
    span_text_page.className = "Active2"
}


