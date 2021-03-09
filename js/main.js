import {getReadyForShowDetails} from "./detailsPage.js"
import {setPages,choosePage,setPageChoosen} from "./createPages.js"

const divShowBooks =document.querySelector("#list")
const chooserNumberOfItem = document.querySelectorAll(".item");
let numberOfItem=5
let inputSearch="";
let totalItems;
let calculateTotalItems=true;
let dataArray;
let listOfBook=""
let startIndexValue=0

document.querySelector("#logo").addEventListener("click",()=>window.location.reload())

function calculate(val){
    calculateTotalItems=val
}

function changeStartIndex(val){
    startIndexValue=val
}

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
document.querySelector("#search-bar").addEventListener("keyup",(e=>liveSearch(e)))
document.addEventListener("keydown",(e=>{if(e.keyCode===13){e.preventDefault()}}))

function liveSearch(e){
    inputSearch=e.target.value;
    if(inputSearch){
        calculate(true)
        startIndexValue=0
        setPageChoosen(1)
        choosePage()
        createUrl()
    }else{
        document.querySelector("#number-of-item").classList.add("hide")
        document.querySelector("#pages-div").innerHTML=""
        divShowBooks.innerHTML= `
        <div class="hero">
        <h1 class="text-center">Cerca tutti i tuoi libri preferiti!</h1>
    </div>`
    }
}

function createUrl(){
    document.querySelector("#number-of-item").classList.remove("hide")
    document.querySelector("#search-bar").classList.remove("hide")
    let search = "{"+inputSearch+"}"
    const URL ="https://www.googleapis.com/books/v1/volumes?q="
    let resultsPerPage=`&maxResults=${numberOfItem}`
    let startIndex=`&startIndex=${startIndexValue}`
    const FULL_URL =URL+search+resultsPerPage+startIndex
    getBooks(FULL_URL)
}

//-----------------------------------------------------------------------GET----------------------------------------
function getBooks(url){
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

//----------------------------------------------------------------SHOW LIST OF BOOK---------------------------------------
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
            <h5 class="cut">
            <b>Titolo:</b><span>  ${Book.title}</span>
                <b>Sottotitolo: </b><span>  ${Book.subtitle}</span>
                </h5>
            </div>
        </div>
        </a>
        `
    divShowBooks.innerHTML=listOfBook
    }
    getReadyForShowDetails()
}

//------------------------------------------------------TRY AGAIN---------------------

function createButtonTryAgain(){
    console.log("hello ")
    const tryButton =`<div class="btn-div">
    <button  id="btn-try" class="btn btn-success">Riprova</button>
    </div>`
    document.querySelector("#pages-div").innerHTML=tryButton
    let btnTry= document.querySelector("#btn-try")
    document.querySelector("#number-of-item").classList.add("hide")
    btnTry.addEventListener("click",(()=>{
        createUrl()
    }))
}

export {dataArray,divShowBooks,listOfBook,numberOfItem,changeStartIndex,createUrl,calculate}