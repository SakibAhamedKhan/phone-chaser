// LoardSearchResult
const loadSearchResult = () => {
	const searchText = document.getElementById('search-field').value;
	const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
	fetch(url)
	.then(response => response.json())
	.then(data => displaySearchResult(data.data));
};

// DisplaySearchResult
const displaySearchResult = (data) => {
	const container = document.getElementById('result-card');
	document.getElementById('search-not-found').style.display = 'none';
	
	if(data.length === 0){
		document.getElementById('search-not-found').style.display = 'block';
	}
	container.textContent = ``;
	data.forEach(d => {
		const div = document.createElement('div');
		div.classList.add('col');
		div.innerHTML = `
		<div class="card h-100">
			<img src="${d.image}" class="card-img-top w-25 mx-auto my-4" alt="">
			<h4 class="mx-auto mt-4">${d.phone_name}</h4>
			<h5 class="mx-auto mb-4">${d.brand}</h5	>
			<button class="btn btn-dark w-50  mx-auto mb-4">Explore</button>
	  	</div>
		`;
		container.appendChild(div);

	});
}