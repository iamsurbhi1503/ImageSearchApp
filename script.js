const accessKey = 'jhQeaGlR2O0q_nyiXzTfQqzGSxCh6Og_8iWFllhT8s4';

const formElement = document.querySelector('form');
const inputElement = document.getElementById('search-input');
const searchResults = document.querySelector('.search-results');
const showMore = document.getElementById('show-more-btn');

let inputData = '';
let page = 1;

async function searchImages() {
    inputData = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = ''; // Clear existing results
    }

    results.forEach((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('search-result');

        const image = document.createElement('img');
        image.classList.add('img'); // Apply the 'img' class
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement('a');
        imageLink.classList.add('details'); // Apply the 'details' class
        imageLink.href = result.links.html;
        imageLink.target = '_blank';
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper); // Append to searchResults
    });



    page++;
    if (page > 1) {
        showMore.style.display = 'block';
        document.getElementById('back-btn').style.display = 'block'
    }
}

formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener('click', () => {
    searchImages();
});

document.getElementById('back-btn').addEventListener('click', () => {
    window.history.back(); // Go back to the previous page
});