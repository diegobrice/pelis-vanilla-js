(async function load() {
  async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  const $form = document.getElementById("form");
  const $home = document.getElementById("home");
  const $featuringContainer = document.getElementById("featuring");

  function setAttributes($element, attributes) {
    for (const attribute in attributes) {
      $element.setAttribute(attribute, attributes[attribute]);
    }
  }

  const BASE_API = "https://yts.mx/api/v2/";

  function featuringTemplate(peli) {
    return `
        <div class="featuring">
          <div class="featuring-image">
            <img
              src="${peli.medium_cover_image}"
              width="70"
              height="100"
              alt=""
            />
          </div>
          <div class="featuring-content">
            <p class="featuring-title">Pelicula Encontrada</p>
            <p class="featuring-album">${peli.title}</p>
          </div>
        </div>`;
  }

  $form.addEventListener("submit", async (event) => {
    event.preventDefault();
    $home.classList.add("search-active");
    const $loader = document.createElement("img");
    setAttributes($loader, {
      src: "src/images/loader.gif",
      width: 50,
      height: 50,
    });
    $featuringContainer.append($loader);

    const data = new FormData($form);
    const peli = await getData(
      `${BASE_API}list_movies.json?limit=1&query_term=${data.get("name")}`
    );
    const HTMLString = featuringTemplate(peli.data.movies[0]);
    $featuringContainer.innerHTML = HTMLString;
  });

  const actionList = await getData(
    `${BASE_API}list_movies.json?genre=action&limit=10`
  );
  const dramaList = await getData(
    `${BASE_API}list_movies.json?genre=drama&limit=10`
  );
  const animationList = await getData(
    `${BASE_API}list_movies.json?genre=animation&limit=10`
  );

  function videoItemTemplate(movie) {
    return `
    <div class="primaryPlaylistItem">
      <div class="primaryPlaylistItem-image">
        <img src="${movie.medium_cover_image}">
      </div>
      <h4 class="primaryPlaylistItem-title">
        ${movie.title}
      </h4>
    </div>`;
  }

  function createTemplate(HTMLstring) {
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLstring;
    return html.body.children[0];
  }

  function addEventClick($element) {
    $element.addEventListener("click", () => {
      showModal();
    });
  }

  function renderMovieList(list, $container) {
    $container.children[0].remove();
    list.data.movies.forEach((movie) => {
      const HTMLstring = videoItemTemplate(movie);
      const movieElement = createTemplate(HTMLstring);
      $container.append(movieElement);
      addEventClick(movieElement);
    });
  }

  const $actionContainer = document.getElementById("action");
  renderMovieList(actionList, $actionContainer);

  const $dramaContainer = document.getElementById("drama");
  renderMovieList(dramaList, $dramaContainer);

  const $animationContainer = document.getElementById("animation");
  renderMovieList(animationList, $animationContainer);

  const $overlay = document.getElementById("overlay");
  const $hideModal = document.getElementById("hide-modal");
  const $modal = document.getElementById("modal");
  const $modalTitle = $modal.querySelector("h1");
  const $modalImage = $modal.querySelector("img");
  const $modalDescription = $modal.querySelector("p");

  function showModal() {
    $overlay.classList.add("active");
    $modal.style.animation = "modalIn .8s forwards";
  }

  $hideModal.addEventListener("click", hideModal);

  function hideModal() {
    $overlay.classList.remove("active");
    $modal.style.animation = "modalOut .8s forwards";
  }
})();
