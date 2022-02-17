// let API_KEY = 'b971c2f0de8767f08d2bb84160ba24b7'

let API_KEY = 'dcea1fd7b3e65d34387ad6de7ef9cc5e'
let page = 1

let tokenTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`
let tokenPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
let tokenUpComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${page}`


let appending = document.querySelector('.append')
let count = document.querySelector('.title')



function newToken() {
    tokenTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page} `
    tokenPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
    tokenUpComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${page}`
}

async function rederMovie() {
    let type = window.localStorage.getItem("type") || "top_rated"
    let data = null
    if (type === "top_rated") {
        let response = await fetch(tokenTop)
        console.log(tokenTop)
        data = await response.json()
        data = data.results
    } else if (type === "popular") {
        let response = await fetch(tokenPopular)
        data = await response.json()
        data = data.results
    } else if (type === 'upcoming') {
        let response = await fetch(tokenUpComing)
        data = await response.json()
        data = data.results
    }

    appending.innerHTML = null
    for (let i of data) {
        let element = getHtml(i)
        appending.innerHTML += element
    }


}

async function filter(ism, min, max, score) {
    let type = window.localStorage.getItem("type") || "top_rated"
    let data = null
    if (type === "top_rated") {
        let response = await fetch(tokenTop)
        console.log(tokenTop)
        data = await response.json()
        data = data.results
    } else if (type === "popular") {
        let response = await fetch(tokenPopular)
        data = await response.json()
        data = data.result
    } else if (type === 'upcoming') {
        let response = await fetch(tokenUpComing)
        data = await response.json()
        data = data.results
        // console.log(data) 
    }
    data = data.filter((el, i) => {
        let name = ism ? el.title.toLowerCase().includes(ism.toLowerCase()) : true
        let minDate = min ? el.release_date.slice(0, 4) >= min : true
        let maxDate = max ? el.release_date.slice(0, 4) <= max : true
        let scor = score ? el.vote_average >= score : true


        return name && minDate && maxDate && scor
    })

    appending.innerHTML = null
    if (data.length) {
        console.log(data)
        for (let i of data) {
            let element = getHtml(i)
            appending.innerHTML += element
        }

    }
}


function getHtml({poster_path, title, release_date, vote_average}){
    return `<div class="movie">
                <img src='https://image.tmdb.org/t/p/w500${poster_path}' alt="Fast &amp; Furious Presents: Hobbs &amp; Shaw">

                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="orange">${vote_average}</span>
                </div>
                <span class="date">${release_date}</span>
            </div>`
}



rederMovie()