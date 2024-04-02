
export function fetchImages(valueInput) {
    const searchParams = new URLSearchParams({
        key: "43075807-09317d918fe027bf1568df9fe",
        q: valueInput,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",

    });
    
    const url = `https://pixabay.com/api/?${searchParams}`;

    return fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    });
}