let btns = document.querySelectorAll('.btns') 
let prev = document.querySelector(".prev") 
let next = document.querySelector(".next") 
let filtering = document.querySelector('.btn')

for(let i of btns){ 
    i.addEventListener('click', (e) => { 
        page = 1 
        count.textContent = page
        newToken() 
        window.localStorage.setItem("type", e.target.value) 
        rederMovie() 
    }) 
} 
 
next.onclick = event => { 
    page++ 
    count.textContent = page 
    newToken() 
    rederMovie() 
} 
 
 
prev.onclick = event => { 
    if(page > 1){ 
        page-- 
        count.textContent = page 
        newToken() 
        rederMovie() 
    } 
}

filtering.onclick = event => { 
    filter(search.value, min.value, max.value, score.value) 
}