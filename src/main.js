import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImages } from "./js/pixabay-api.js";
import { renderImages } from "./js/render-functions.js";

const input = document.querySelector("input");
const form = document.querySelector("form");
const loader = document.querySelector('.loader');
const galleryList = document.querySelector("ul.gallery");
function showLoader() {
    loader.classList.remove('hidden');
  }
  
  function hideLoader() {
    loader.classList.add('hidden');
  }


  hideLoader();
  form.addEventListener("submit",submitHandle);

function submitHandle (event)  {
    event.preventDefault();
   
    galleryList.innerHTML = "";
    const valueInput = input.value.trim();

    
    if (valueInput  === "") {
     
        iziToast.error({
            color: 'yellow',
            message: ` Please fill in the field for search`,
            position: 'topRight',
        });
       
        showLoader();
    }   
    if (valueInput ) {
        fetchImages(valueInput)
            .then(data => renderImages(data.hits))
            .catch(error => {
                console.log(error);
                iziToast.error({
                    title: 'Error',
                    message: `❌ Sorry, there are no images matching your search query. Please, try again!`,
                    position: 'topRight',
                })

            }).finally(() => hideLoader() )
            
        
    }
   
}
