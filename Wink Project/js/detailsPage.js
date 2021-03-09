import {dataArray,divShowBooks,listOfBook} from "./main.js"
import {choosePage,pageToShow} from "./createPages.js"

function getReadyForShowDetails(){
    const books = document.querySelectorAll(".book");
    for(let el of books){
        el.addEventListener("click",(e=>{
            let idBookSelected=e.target.closest(".book").id;
            showDetails(idBookSelected)
        }))
    }
}

function showDetails(id){
    let [bookSelected]=dataArray.filter(e=>e.id===id)
    let details= `
    <div class="book-details d-flex mt-3 pt-3">
        <div class="image-details">
        <img src=${bookSelected.image}>
        </div>
        <div class="description-book-details mt-5">
            <h5><b >Titolo:</b> <span> ${bookSelected.title}</span></h5>
            <h5><b>Sottotitolo: </b><span> ${bookSelected.subtitle}</span></h5>
            <h5><b>Autore:</b> <span> ${bookSelected.authors}</span></h5>
            <h5><b>Lingua: </b><span> ${bookSelected.lang}</span></h5>
            <h5><b>InfoLink: </b><span> <a class="underline" href="${bookSelected.link}">Scopri di più</a></span></h5>
        </div>
    </div> 
    `
    divShowBooks.innerHTML=details
    document.querySelector("#number-of-item").classList.add("hide")
    const backButton =`
        <div class="btn-div mb-3">
        <a class="simple"href="#navbar"><button  id="btn-back" class="btn my-btn">Torna alla lista</button></a>
        </div>`
        document.querySelector("#pages-div").innerHTML=backButton
        document.querySelector("#search-bar").classList.add("hide")
    goBack()
}

function goBack(){
    document.querySelector("#btn-back").addEventListener("click",(()=>{
        divShowBooks.innerHTML=listOfBook;
        document.querySelector("#pages-div").innerHTML=pageToShow
        choosePage()
        getReadyForShowDetails()
        document.querySelector("#number-of-item").classList.remove("hide")
        document.querySelector("#search-bar").classList.remove("hide")
    }
    ))
}
export {getReadyForShowDetails,goBack}