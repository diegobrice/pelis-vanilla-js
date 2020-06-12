// const getUser = new Promise(function (ok, error) {
//   setTimeout(function () {
//     ok("Datos de usuario");
//   }, 4000);
//   // setTimeout(function () {
//   //   error("Fallo user");
//   // }, 2000);
// });

// const getData = new Promise(function (ok, error) {
//   setTimeout(function () {
//     ok("Datos de formulario");
//   }, 2000);
//   // setTimeout(function () {
//   //   error("Fallo data");
//   // }, 2000);
// });

// getUser
//   .then(function (e) {
//     console.log(e);
//   })
//   .catch(function (e) {
//     console.log(e);
//   });

// Promise.all([getUser, getData])
//   .then(function (message) {
//     console.log(message);
//   })
//   .catch(function (message) {
//     console.log(message);
//   });

// Promise.race([getUser, getData])
//   .then(function (message) {
//     console.log(message);
//   })
//   .catch(function (message) {
//     console.log(message);
//   });

// JQUERY
// $.ajax("https://randomuser.me/api/", {
//   method: "GET",
//   success: function (data) {
//     console.log(data);
//   },
//   error: function (error) {
//     console.log(error);
//   },
// });

// fetch("https://randomuser.me/api/")
//   .then(function (response) {
//     // console.log(response);
//     return response.json();
//   })
//   .then(function (user) {
//     console.log(user.results[0].name.first);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

(async function load() {
  async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  //asincrono
  const actionList = await getData(
    "https://yts.mx/api/v2/list_movies.json?genre=action&limit=50"
  );
  const dramaList = await getData(
    "https://yts.mx/api/v2/list_movies.json?genre=drama&limit=50"
  );
  const animationList = await getData(
    "https://yts.mx/api/v2/list_movies.json?genre=animation&limit=50"
  );
  console.log(actionList, dramaList, animationList);
  //recibe promesa
  // let terrorList;
  // getData("https://yts.mx/api/v2/list_movies.json?genre=drama&limit=50").then(
  //   function (data) {
  //     terrorList = data;
  //     console.log(terrorList);
  //   }
  // );
})();

//SELECTORES
// const $var1 = document.getElementById("featuring");
// const $var2 = document.getElementsByClassName("playlistFriends-item");
// const $var3 = document.getElementsByTagName("img");
// const $var4 = document.querySelector(".logo");
// const $var5 = document.querySelectorAll(".myPlaylist-item");
