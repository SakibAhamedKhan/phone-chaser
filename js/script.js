// LoardSearchResult
const loadSearchResult = () => {
	const searchText = document.getElementById('search-field').value;
	const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
	fetch(url)
	.then(response => response.json())
	.then(data => console.log(data.data));
};