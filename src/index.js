let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


let addToy = false;
let url = "http://localhost:3000/toys"
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//grab the like button
// add an event listener for when someone clicks
// grab the parent div card class node, and then grab the p in the parent node
// change the inner text of the p to increase by one

document.addEventListener("click", function(e) {
  if (e.target.matches(".like-btn")) {
    let parent = e.target.parentNode
    let toyId = parent.id
    let likes = parent.querySelector("span")
    likes.textContent = parseInt(likes.textContent, 10) + 1
    fetch(`http://localhost:3000/toys/${parent.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({'likes': likes.textContent})
    })
    .then(response => response.json())
    .then(data => {
      console.log("success", data)
    })
  }
})

function createToy(data) {
  const toyDiv = document.createElement("div")
  toyDiv.className = "card"
  toyDiv.id = `${data.id}`
  toyDiv.innerHTML = `
  <h2>${data.name}</h2>
  <img src=${data.image} class="toy-avatar"/>
  <p><span>${data.likes}</span> Likes</p>
  <button class="like-btn">Like <3</button>` 
  let toyCollection = document.getElementById("toy-collection")
  toyCollection.append(toyDiv)
}

fetch(url)
      .then(response => response.json())
       .then(data => {
        data.forEach(toy => {
          createToy(toy)
        })
     })

// grab the form and set it equal to a variable
// add event listener for submit and prevent default
// grab individual attribute off the form
// create a new toy object with these values
// set likes default 0
// create a fetch request in submit event listener to post and put the new toy into the json array

let form = document.querySelector("body > div.container > form")
document.addEventListener("submit", function(e) {
  e.preventDefault()
  let toyForm = e.target
  console.log(toyForm)
   name = toyForm.name.value,
   image = toyForm.image.value,
   likes = 0
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({'name': name, 'image': image, 'likes': likes})
  })
  .then(response => response.json())
  .then(data => {
    console.log("success", data)
  })
  .catch((error) => {
    console.error("error", error)
  })
  toyForm.reset()
})