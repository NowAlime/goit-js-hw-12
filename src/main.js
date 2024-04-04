import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImage } from "./js/pixabay-api";
import { renderImages } from "./js/render-functions.js";

const input = document.querySelector("input");
const form = document.querySelector("form");
const loader = document.querySelector('.loader');
const galleryList = document.querySelector("ul.gallery");
const buttonLoadMore = document.querySelector(".btn-load-more");
let inputValue="";
let currentPage = 1;
let maxPage = 0;
const perPage = 15;
hideLoader();
hideLoadMore();
  form.addEventListener("submit",submitHandle);

  async function submitHandle (event)  {
    event.preventDefault();
    galleryList.innerHTML = "";
    currentPage = 1;
   inputValue = event.target.elements.search.value.trim();
    
    if (!inputValue) {
     
        iziToast.show({
            message: 'Please complete the field!',
            position: 'topRight',
           
        });
        hideLoader();
        return;
    }
    try { const data = await fetchImage(inputValue, currentPage);
        maxPage = Math.ceil(data.totalHits / perPage);
        if (data.hits.length === 0) {
          iziToast.error({
            message: '❌Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
                });
                hideLoadMore();
            } else {
                renderImages(data.hits);
                checkButtonStatus();
                showLoadMore();
              
              }
            } catch (error) {
                iziToast.error({
                  message: 'Sorry, an error occurred while loading. Please try again!',
                  position: 'topRight', });
                }
               showLoader();
                form.reset();
              }

              
buttonLoadMore.addEventListener("click", onLoadMore);

async function onLoadMore() {
  currentPage +=1;
 showLoader();
  

  try {
    const data = await fetchImage(inputValue, currentPage);
    renderImages(data.hits);
    showLoader();
  } catch (error) {
    iziToast.error({
      message: 'Sorry, an error occurred while loading. Please try again!',
      position: 'topRight',
    });

} hideLoader();
checkButtonStatus();
}

function checkButtonStatus() {
    if (currentPage >= maxPage) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
    });
} else {
    showLoadMore();
    
  }
}

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}


function showLoadMore() {
  buttonLoadMore.classList.remove("hidden");
}
function hideLoadMore() {
  buttonLoadMore.classList.add("hidden");
}