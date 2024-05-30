"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

window.addEventListener("load", initApp); // When the page is loaded, run initApp function

// Function to initialize the Web App
async function initApp() {
  console.log("initApp: app.js is running 🎉"); // Log to the console that the app is running
  const posts = await getPosts();
  posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  //displayPosts(posts);
  console.log(posts);

  displayPostsGrid(posts);
}

async function getPosts() {
  const response = await fetch(
    "https://programmingexam.aleksandraciesla.dk/wp-json/wp/v2/projects?acf_format=standard"
  );
  const data = await response.json();
  return data;
}

function displayPosts(posts) {
  const postsList = document.querySelector("#posts-list");

  for (const post of posts) {
    postsList.insertAdjacentHTML(
      "beforeend",
      /*html*/ `
    <li>${post.title.rendered}</li>
`
    );
  }
}

function displayPostsGrid(posts) {
  const postsGrid = document.querySelector("#posts-grid");

  for (const post of posts) {
    postsGrid.insertAdjacentHTML(
      "beforeend",
      /*html*/ `
  <article class="grid-item">
    <img src="${post.acf.image}" alt="${post.title.rendered}" />
    <h2>${post.title.rendered}</h2>
    <p class="text">${post.acf.text}</p>
    <p class="link">Link to solution: <a href="${post.acf.link}">Link</a></p>
    <p class="client">Client: ${post.acf.client}</p>
    <p class="type"> ${post.acf.type}</p>
  </article>
`
    );
  }
}
