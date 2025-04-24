const accessKey = "xeaPR3kCwY20sQ2EEXpajGstr3xMZQzBA-1wK7BYsRU";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");  // Fixed input reference
const searchResult = document.getElementById("search-result");
const showMoreButton = document.getElementById("show-more-button");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value.trim();
    if (!keyword) return; // Prevents empty search requests

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchResult.innerHTML = ""; // Clears previous search results
    }

    const results = data.results;

    results.forEach((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = keyword;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html; // Fixed reference
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    });

    if (data.total_pages > page) {
        showMoreButton.style.display = "block";
    } else {
        showMoreButton.style.display = "none";
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreButton.addEventListener("click", () => {
    page++;
    searchImages();
});
