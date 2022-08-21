const errorMsg = document.querySelector(".error-message");

//browsing categories

const getGenres = async () => {
  errorMsg.textContent = "Loading data...";
  try {
    url = `https://cs-steam-game-api.herokuapp.com/genres`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const genres = data.data.map((d) => d.name);
      const selectGenres = document.querySelector("#genres-list");
      genres.forEach((genre) => {
        const genresOption = document.createElement("li");
        genresOption.textContent = genre;
        errorMsg.textContent = "";
        genresOption.addEventListener("click", () => getGamesByGenres(genre));
        selectGenres.appendChild(genresOption);
      });
    }
  } catch (error) {
    console.log(error);
    errorMsg.textContent = error;
    return [];
  }
};

getGenres();

//main page

const getGames = async (genre) => {
  errorMsg.textContent = "Loading data..."
  try {
    url = `https://cs-steam-game-api.herokuapp.com/games?&limit=10`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const games = data.data.map((d) => ({
        appid: d.appid,
        image: d.header_image,
        name: d.name,
        price: d.price,
      }));
      const selectGames = document.querySelector("#games-list");
      games.forEach((game) => {
        const gamesOption = document.createElement("div");
        gamesOption.innerHTML = `
        <img class="card-img" src="${game.image}">
        <div class="card-body">
        <h5 class="card-title">${game.name}</h5> 
        <p class="card-price">Price: ${game.price}$</p>
        </div>
        `;
        if (game.price == 0) {
          gamesOption.innerHTML = `
          <img class="card-img" src="${game.image}">
          <div class="card-body">
          <h5 class="card-title">${game.name}</h5> 
          <p class="card-price">Free to play</p>
          </div>
        `;
        }
        errorMsg.textContent = "";
        gamesOption.addEventListener("click", () => renderSingleGame(game));
        selectGames.appendChild(gamesOption);
      });
    }
  } catch (error) {
    console.log(error);
    errorMsg.textContent = error;
    return [];
  }
};
getGames();

//browsing game by categories

const getGamesByGenres = async (genre) => {
  errorMsg.textContent = "Loading data..."
  try {
    url = `https://cs-steam-game-api.herokuapp.com/games?genres=${encodeURIComponent(
      genre
    )}&limit=10`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const games = data.data.map((d) => ({
        appid: d.appid,
        image: d.header_image,
        name: d.name,
        price: d.price,
      }));
      const selectGames = document.querySelector("#games-list");
      selectGames.innerHTML = "";
      games.forEach((game) => {
        const gamesOption = document.createElement("div");
        gamesOption.innerHTML = `
        <img class="card-img" src="${game.image}">
        <div class="card-body">
        <h5 class="card-title">${game.name}</h5> 
        <p class="card-price">Price: ${game.price}$</p>
        </div>
        `;
        if (game.price == 0) {
          gamesOption.innerHTML = `
          <img class="card-img" src="${game.image}">
          <div class="card-body">
          <h5 class="card-title">${game.name}</h5> 
          <p class="card-price">Free to play</p>
          </div>
        `;
        }
        errorMsg.textContent = "";
        gamesOption.addEventListener("click", () => renderSingleGame(game));
        selectGames.appendChild(gamesOption);
      });
    }
  } catch (error) {
    console.log(error);
    errorMsg.textContent = error;
    return [];
  }
};

// game details
const renderSingleGame = async (gameobj) => {
  errorMsg.textContent = "Loading data..."
  try {
  const { appid } = gameobj;
  const url = `https://cs-steam-game-api.herokuapp.com/single-game/${appid}`;
  const res = await fetch(url);
  const data = await res.json();
  const game = data.data;
  console.log(game);
  const gameDetails = document.querySelector("#games-list");
  gameDetails.innerHTML = `
  <img class="detail-img" src="${game.header_image}">
  <div class="card-detail">
  <h5 class="detail-title">${game.name}</h5> 
  <p class="detail-price">Free to play</p>
  <p class="description">${game.description}</p>
  <button class="detail-genres">${game.genres}</button>
  </div>
  `;
  errorMsg.textContent = "";
}
catch (error) {
  console.log(error);
  errorMsg.textContent = error;
  return [];s
}
}

// search games

const searchGame = async (name) => {
  errorMsg.textContent = "Loading data..."
  console.log("searching...");
  const url = `https://cs-steam-game-api.herokuapp.com/games?q=${name}`;
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.data);
  const result = data.data.map((d) => ({
    appid: d.appid,
    image: d.header_image,
    name: d.name,
    price: d.price,
  }));
  const resultGames = document.querySelector("#games-list");
  resultGames.innerHTML = "";
  result.forEach((game) => {
    const displayResult = document.createElement("div");
    displayResult.innerHTML = `
      <img class="card-img" src="${game.image}">
      <div class="card-body">
      <h5 class="card-title">${game.name}</h5> 
      <p class="card-price">Price: ${game.price}$</p>
      </div>
      `;
    if (game.price == 0) {
      displayResult.innerHTML = `
        <img class="card-img" src="${game.image}">
        <div class="card-body">
        <h5 class="card-title">${game.name}</h5> 
        <p class="card-price">Free to play</p>
        </div>
      `;
    }
    resultGames.appendChild(displayResult);
    errorMsg.textContent = "";
    displayResult.addEventListener("click", () => renderSingleGame(game));
  });
};

const searchBtn = document.querySelector(".search-bar");
searchBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  let val = document.querySelector("#search-game");
  searchGame(val.value);
});



