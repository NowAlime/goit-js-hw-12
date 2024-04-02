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



  const search = '';
  let currentPage = 1;
  const perPage = 15;


  form.addEventListener("submit",submitHandle);

async function submitHandle (event)  {
    event.preventDefault();

    const search = input.value.trim();
    currentPage = 1;
    galleryList.innerHTML = "";
    
    if (search  === "") {
     
        iziToast.error({
            color: 'yellow',
            message: ` Please fill in the field for search`,
            position: 'topRight',
        });
       
        showLoader();
        return;
    }   

    try {
  const images = await fetchImages(search, perPage);
  const totalHits = images.totalHits;
        if (images.hits.length === 0) {
            galleryList.innerHTML = "";
            iziToast.error({
              message: 'Sorry, there are no images matching your search query. Please try again!',
              position: 'topRight',
        }); return;
          } else {
            renderImages(images.hits);
         
          }
        } catch (error) {
          iziToast.error({
            message: 'Sorry, an error occurred while loading. Please try again!',
            position: 'topRight',
          });
        }
        hideLoader();
        form.reset();}
      

