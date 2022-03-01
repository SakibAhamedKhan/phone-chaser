// Loard Search Result
const loadSearchResult = () => {
	const searchText = document.getElementById('search-field').value;
	const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
	fetch(url)
	.then(response => response.json())
	.then(data => displaySearchResult(data.data));
};

// Display Search Result
const displaySearchResult = (data) => {
	const container = document.getElementById('result-card');
	document.getElementById('search-not-found').style.display = 'none';
	document.getElementById('phone-details').style.display = 'none';

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
			<h4 class="mx-auto mt-4 fs-4">${d.phone_name}</h4>
			<h5 class="mx-auto mb-4 fs-6">Brand: ${d.brand}</h5	>
			<button class="btn btn-dark w-50  mx-auto mb-4" onclick="loadPhoneDetails('${d.slug}')">Explore</button>
	  	</div>
		`;
		container.appendChild(div);

	});
};


//Load Phone Details
const loadPhoneDetails = (phoneId) => {
	const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
	fetch(url)
	.then(response => response.json())
	.then(data => displayPhoneDetails(data.data));
};

//Display Phone Details
const displayPhoneDetails = (data) => {
	const container = document.getElementById('phone-details');
	container.textContent = ``;
	
	document.getElementById('phone-details').style.display = 'block';
	
	const div = document.createElement('div');
	div.classList.add('card');
	div.classList.add('mb-3');
	div.classList.add('pb-5');
	div.innerHTML = `
		<img src="${data.image}" class="card-img-top w-25 mx-auto my-5" alt="...">
		<div class="card-body">
	  		<h4 class="card-title text-center mt-4 fs-4">${data.name}</h4>
			<h5 class="mx-auto mb-4 fs-6 text-center">Brand: ${data.brand}</h5>
	  		<p class="card-text text-center"><small class="text-muted">${data.releaseDate? data.releaseDate : 'No release date found'}</small></p>
		</div>
		<div class="accordion w-75 mx-auto" id="accordionPanelsStayOpenExample">
			<div class="accordion-item">
			  	<h2 class="accordion-header" id="panelsStayOpen-headingOne">
					<button class="accordion-button bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
					  Main Features
					</button>
			  	</h2>
			  	<div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
					<div class="accordion-body">
					  <li><strong>Display Size: </strong>${data.mainFeatures.displaySize}</li>
					  <li><strong>Chipset: </strong>${data.mainFeatures.chipSet}</li>
					  <li><strong>Memory: </strong>${data.mainFeatures.memory}</li>
					  <li><strong>Storage: </strong>${data.mainFeatures.storage}</li>
					  <li><strong>Sensors: </strong>${data.mainFeatures.sensors}</li>
					</div>
			  	</div>
			</div>
	  </div>
	`;
	
	// Others properties checking
	if(data.others !== undefined){
		div.innerHTML += `
		<div class="accordion w-75 mx-auto" id="accordionPanelsStayOpenExample">
				<div class="accordion-item">
				  	<h2 class="accordion-header" id="panelsStayOpen-headingTwo">
						<button class="accordion-button bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
						  Others
						</button>
				  	</h2>
				  	<div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo">
						<div class="accordion-body">
						<li><strong>WLAN: </strong>${data.others.WLAN}</li>
						<li><strong>Bluetooth: </strong>${data.others.Bluetooth}</li>
						<li><strong>GPS: </strong>${data.others.GPS}</li>
						<li><strong>NFC: </strong>${data.others.NFC}</li>
						<li><strong>Radio: </strong>${data.others.Radio}</li>
						<li><strong>USB: </strong>${data.others.USB}</li>
						</div>
				  	</div>
				</div>
			</div>
		`;
	}
	container.appendChild(div);
}