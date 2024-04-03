import axios from "axios";

export async function fetchImage( inputValue, currentPage) {
  const BASE_URL = "https://pixabay.com/api/"
  const params = {
    key: "43075807-09317d918fe027bf1568df9fe",
    q: inputValue,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page: 15,
    page: currentPage,
  };

  const res = await axios.get(BASE_URL, { params });
  return res.data;
};