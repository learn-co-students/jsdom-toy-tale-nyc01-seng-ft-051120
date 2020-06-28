let addToy = false;
let divCollection = document.querySelector('#toy-collection')
const baseUrl = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", () => {
 
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', e => {
        e.preventDefault()
        postToy(e.target)
        
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys()
  postToy()
});

const postToy = toyData => {
  fetch(baseUrl, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toyData.name.value,
      "image": toyData.image.value,
      "likes": 0
    })
  })
  .then(resp => resp.json())
  .then(toyObj => {
    let newToy = renderToys(toyObj)
    divCollection.append(newToy)
  })
}

const likes = e => {
  e.preventDefault()
  let addLike = parseInt(e.target.previousElementSibling.innerText) + 1
  
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method:"PATCH",
    headers:{
      "Content-Type": 'application/json',
      Accept: 'application/json'
    },
    body:JSON.stringify ({
      likes: addLike
    })
  })
  .then(resp => resp.json())
  .then(likeObj => {
    e.target.previousElementSibling.innerText = `${addLike} likes`;
  })
}

const getToys = () => {
  fetch(baseUrl)
    .then(response => response.json())
    .then(toys => {
      toys.forEach(toy => {
        renderToys(toy)
      });
    })
}


function renderToys(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.src = toy.image
  // img.setAttribute('src', toy.image)
  img.className = 'toy-avatar'
  // img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let button = document.createElement('button')
  button.className = 'like-btn'
  button.id = toy.id
  button.innerText = 'like'
  button.addEventListener('click', e =>{
    // console.log(e.target.dataset)
    likes(e)
  })

  let divCard = document.createElement('div')
  divCard.className = 'card'
  // divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, button)
  divCollection.append(divCard)
}
  



/*
1. Do a  fetch  request to the endpoint get toy data
2. When data return from the server, render that data to the DOM
3. 
*/