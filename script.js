const searchInput = document.getElementById("searchInput");

const heroContainer = document.getElementById("heroContainer");
const newHeroBtn = document.getElementById("newHeroButton");
const searchBtn = document.getElementById("searchButton");

const API_ACCESS_TOKEN = "944b421b0efd86f26f5f085dcbe0c52c";
const BASE_URL = `https://superheroapi.com/api.php/${API_ACCESS_TOKEN}`;

const statToEmoji = {
	intelligence: "🧠",
	strength: "💪",
	speed: "⚡",
	durability: "🏋️‍♂️",
	power: "📊",
	combat: "⚔️",
};

const createCardElement = (data) => {
	const heroCardDiv = document.createElement("div");
	heroCardDiv.classList.add("hero-card");

	const heroImage = document.createElement("img");
	heroImage.src = data.image.url;
	heroImage.alt = data.name;
	heroImage.classList.add("hero-img");

	const heroName = document.createElement("h2");
	heroName.textContent = data.name;
	heroName.classList.add("hero-heading");

	const heroStatsDiv = document.createElement("div");
	heroStatsDiv.classList.add("hero-stats");

	heroStatsDiv.innerHTML = "";

	for (let key in statToEmoji) {
		const paragraph = document.createElement("p");
		paragraph.innerHTML = `${statToEmoji[key]} ${key}: ${data.powerstats[key]}`;
		heroStatsDiv.appendChild(paragraph);
	}

	heroCardDiv.append(heroImage);
	heroCardDiv.append(heroName);
	heroCardDiv.append(heroStatsDiv);

	return heroCardDiv;
};

const renderCardElement = (heroCard) => {
	heroContainer.innerHTML = "";
	const cardElement = createCardElement(heroCard);
	heroContainer.appendChild(cardElement);
};

const getSuperHero = (id) => {
	fetch(`${BASE_URL}/${id}`)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			renderCardElement(data);
			showHeroContainer();
			searchInput.value = "";
			searchInput.focus();
		});
};

const getSuperHeroByName = (heroName) => {
	fetch(`${BASE_URL}/search/${heroName}`)
		.then((response) => response.json())
		.then((data) => {
			if (
				data.response === "success" &&
				data.results &&
				data.results.length > 0
			) {
				const heroResult = data.results.find(
					(hero) => hero.name.toLowerCase() === heroName.toLowerCase()
				);
				renderCardElement(heroResult);
				showHeroContainer();
			} else {
				heroContainer.innerHTML = `<p>No superhero found with the name "${heroName}".</p>`;
			}
		});
};

const randomizeId = () => {
	const numberOfHeroes = 731;
	const randomHeroId = Math.floor(Math.random() * numberOfHeroes) + 1;
	return randomHeroId;
};

const searchHeroName = () => {
	const characterName = searchInput.value;
	return characterName;
};

const showHeroContainer = () => {
	heroContainer.style.display = "block";
};

newHeroBtn.onclick = () => getSuperHero(randomizeId());

searchBtn.onclick = () => getSuperHeroByName(searchHeroName());
