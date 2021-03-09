console.log("MAIN JS FILE")

import {getReadyForShowDetails} from "./detailsPage.js"
import {setPages,choosePage,page} from "./pages.js"

const divShowBooks =document.querySelector("#list")
const chooserNumberOfItem = document.querySelectorAll(".item");

let numberOfItem=5
let inputSearch="";
let totalItems;
let calculateTotalItems=true;


let URL=""
let FULL_URL=""
let search=""
let dataArray;
let listOfBook=""

let startIndexValue=0


document.addEventListener("load",createUrl())


//----------------------------------------------CHANGE NUMBER OF ITEM PER PAGE------------------------------------
for(let i of chooserNumberOfItem){
    i.addEventListener("click",(e=>{
        numberOfItem=parseInt(e.target.innerHTML); 
        for(let t of chooserNumberOfItem){
            t.classList.remove("items-active")
        }
        e.target.classList.add("items-active")
        calculate(true)
        createUrl()
    }))
}

//----------------------------------------------LIVE SEARCH------------------------------------
document.querySelector("#search-bar").addEventListener("keyup",(e=>{
        inputSearch=e.target.value;
        calculate(true)
        startIndexValue=0
        page(1)
        choosePage()
        createUrl()
    }))

function calculate(val){
    calculateTotalItems=val
}

function changeStartIndex(val){
    startIndexValue=val
}


function createUrl(start){
    document.querySelector("#number-of-item").classList.remove("hide")
    search = "{"+inputSearch+"}"
    URL ="https://www.googleapis.com/books/v1/volumes?q="
    let resultsPerPage=`&maxResults=${numberOfItem}`
    // startIndexValue=start?start:startIndexValue
    console.log("startIndexValue",startIndexValue)
    let startIndex=`&startIndex=${startIndexValue}`
    FULL_URL =URL+search+resultsPerPage+startIndex
    getBooks(FULL_URL)
}

function getBooks(url){
    console.log("calcula",calculateTotalItems)
    let loading=`<h3 class="text-center">Caricamento...</h3>`
    divShowBooks.innerHTML=loading
    fetch(url).then(res=> res.json()).then(data=>{
        if(data.items){
            dataArray= data.items.map((el)=>{
                const item = {
                    id:el.id,
                    title: el.volumeInfo.title?el.volumeInfo.title:"Titolo non disponible",
                    subtitle: el.volumeInfo.subtitle?el.volumeInfo.subtitle:"Nessun Sottotitolo",
                    authors: el.volumeInfo.authors?el.volumeInfo.authors.join(","):"Autore non disponible",
                    lang: el.volumeInfo.language?el.volumeInfo.language:"Lingua non disponible",
                    image: el.volumeInfo.imageLinks?el.volumeInfo.imageLinks.thumbnail:"./img/notFound.jpg",
                    link:el.volumeInfo.infoLink?el.volumeInfo.infoLink:"Nessun Link presente"
                }; 
                return item
            })
            calculateTotalItems?totalItems=data.totalItems:totalItems=totalItems
            calculate(true)
            setPages(totalItems)
            showResult(dataArray)
        }else{
            divShowBooks.innerHTML=`<h4 class="text-center">Nessun altro libro Trovato</h4>`
        }
    }).catch(err=>{ 
        divShowBooks.innerHTML=`<h4 class="text-center">Sembra ci sia qualche errore...</h4>`;
        createButtonTryAgain()
        console.log("err ",err)
    })
}


//------------------------------------------------------TRY AGAIN---------------------
function createButtonTryAgain(){
    console.log("hello ")
    const tryButton =`
    <div class="btn-div">
    <button  id="btn-try" class="btn btn-success">Riprova</button>
    </div>`
    document.querySelector("#pages-div").innerHTML=tryButton
    let btnTry= document.querySelector("#btn-try")
    document.querySelector("#number-of-item").classList.add("hide")
    btnTry.addEventListener("click",(()=>{
        createUrl()
    }))

}




function showResult(listOfResult){
    listOfBook=""
    for(let Book of listOfResult){
        listOfBook+= `
        <a class="simple" href="#navbar">
        <div class="book d-flex mt-3"  id="${Book.id}">
            <div class="image-book ">
                <img src=${Book.image}>
            </div>
            <div class="description-book">
            <h5 class="prova">
            <b>Titolo:</b><span> ${Book.title}</span>
                <b>Sottotitolo: </b><span> ${Book.subtitle}</span>
                </h5>
            </div>
        </div>
        </a>
        `
    divShowBooks.innerHTML=listOfBook
    }
    getReadyForShowDetails()
}



/*

//------------------------------------------------------------DETAILS-------------------
function getReadyForShowDetails(){
    const books = document.querySelectorAll(".book");
    for(el of books){
        el.addEventListener("click",(e=>{
            let idBookSelected=e.target.closest(".book").id;
            showDetails(idBookSelected)
        }))
    }
}

function showDetails(id){
    let [bookSelected]=dataArray.filter(e=>e.id===id)
    let details= `
    <div class="book-details d-flex mt-3">
        <div class="image-details">
        <img src=${bookSelected.image}>
        </div>
        <div class="description-book-details mt-5">
            <h5><b>Titolo:</b> <span> ${bookSelected.title}</span></h5>
            <h5><b>Sottotitolo: </b><span> ${bookSelected.subtitle}</span></h5>
            <h5><b>Autore:</b> <span> ${bookSelected.authors}</span></h5>
            <h5><b>Lingua: </b><span> ${bookSelected.lang}</span></h5>
            <h5><b>InfoLink: </b><span> <a href="${bookSelected.link}">Scopri di più</a></span></h5>
        </div>
    </div> 
    `
    divShowBooks.innerHTML=details
    selectorNumberOfItem.classList.add("hide")
    const backButton =`
        <div class="btn-div">
        <button  id="btn-back" class="btn btn-success">Torna alla lista</button>
        </div>`
    titleOfPageNumber.innerHTML=backButton
    goBack()
}







//-----------------------------------------------------------------------------------------GO BACK FUNCTION 
function goBack(){
    document.querySelector("#btn-back").addEventListener("click",(()=>{
        divShowBooks.innerHTML=listOfBook;
        showNumOfPages.innerHTML=pageToShow
        choosePage()
        getReadyForShowDetails()
        selectorNumberOfItem.classList.remove("hide")
    }
    ))
}

*/







/*

//-----------------------------------------------------------------------------------------LISTOFPAGE----------------------------


//-----------------------------------------------------------------------------------------SETPAGES FUNCTION 

function setPages(allItems){
    let numOfPages=Math.floor(allItems/numberOfItem)+1
    let pages=[]
    for(let c =1;c<=numOfPages;c++){
        pages.push(`<a class="simple"href="#navbar"><li class="list-group-item page" >${c}</li></a>`)
    }
    let pageBefore= (pageChoosed==1||pageChoosed==2||pageChoosed==3)?0:pageChoosed-3
    let title=`<h5 id="page-number" class="text-center">Pagine</h5>`
    let openUl=`<ul class="list-group list-group-horizontal " id="num-of-page">`
    let closeUl=` </ul>`
    pageToShow=title+openUl+pages.slice(pageBefore,pageBefore+5)+closeUl
    // let  showNumOfPages=document.querySelector("#pages-div");
    document.querySelector("#pages-div").innerHTML=pageToShow
    choosePage()
}


//--------------------------------------------------------------------------CHANGE NUMBER OF PAGE------------------------------------

function choosePage(){
    const chooserPage = document.querySelectorAll(".page");
    for(let x of chooserPage){
        x.addEventListener("click",(e=>{
            pageChoosed=e.target.innerHTML
            startIndexValue= (numberOfItem*(pageChoosed-1))
            for(let z of chooserPage){
                z.classList.remove("items-active")
            }
            e.target.classList.add("items-active")
            calculateTotalItems=false
            createUrl(inputSearch,numberOfItem,startIndexValue,calculateTotalItems)
        }))
        if(x.innerHTML==pageChoosed){
            x.classList.add("items-active")
        }
    }
}
*/
export {dataArray,divShowBooks,listOfBook,numberOfItem,changeStartIndex,createUrl,calculate}