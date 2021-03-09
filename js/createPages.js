import {numberOfItem,createUrl,calculate,changeStartIndex} from "./main.js"
let pageToShow;
let pageChoosen=1

//-----------------------------------------------------------------------------------------LISTOFPAGE----------------------------
function setPageChoosen(val){
    pageChoosen=val
}

function setPages(allItems){
    let numOfPages=Math.floor(allItems/numberOfItem)+1
    let pages=[]
    for(let c =1;c<=numOfPages;c++){
        pages.push(`<a class="simple"href="#navbar"><li class="list-group-item page mb-5">${c}</li></a>`)
    }
    let pageBefore= (pageChoosen==1||pageChoosen==2||pageChoosen==3)?0:pageChoosen-3
    let title=`<h5 id="page-number" class="text-center">Pagine</h5>`
    let openUl=`<ul class="list-group list-group-horizontal " id="num-of-page">`
    let closeUl=` </ul>`
    let fivePages=pages.slice(pageBefore,pageBefore+5).join("")
    pageToShow=title+openUl+fivePages+closeUl
    document.querySelector("#pages-div").innerHTML=pageToShow
    choosePage()
}

function choosePage(){
    const chooserPage = document.querySelectorAll(".page");
    for(let x of chooserPage){
        x.addEventListener("click",(e=>{
            pageChoosen=e.target.innerHTML
            changeStartIndex((numberOfItem*(pageChoosen-1)))
            for(let z of chooserPage){
                z.classList.remove("items-active")
            }
            e.target.classList.add("items-active")
            calculate(false)
            createUrl()
        }))
        if(x.innerHTML==pageChoosen){
            x.classList.add("items-active")
        }
    }
}

export {setPages,choosePage,pageChoosen as pageChoosed,pageToShow,setPageChoosen}