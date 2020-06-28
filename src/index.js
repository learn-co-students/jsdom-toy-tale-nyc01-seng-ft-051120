let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  

  const toyBox = document.getElementById("toy-collection")
  
  function renderToy(toy) {

    const toyDiv = document.createElement('div')
    toyDiv.className = "card"
    toyDiv.id = `${toy.id}`
    toyDiv.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like ❤️ </button>
    `
    toyBox.append(toyDiv);
  }

  function renderToys(toysData){
    toysData.forEach(toy => {
      renderToy(toy)
    });
  }

  function fetchToys() {
    return fetch("http://localhost:3000/toys")
      .then(resp => resp.json())
      .then(json => renderToys(json));
  }


  fetchToys()

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

  function postToy(url, toy) {
    fetch(url, {
      method: 'POST',
      headers:
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": `${toy.name}`,
        "image": `${toy.image}`,
        "likes": 0
      })
    })
    .then(resp => resp.json())
    .then(toyObject => renderToy(toyObject))
  }

  
  async function updateLike(url, num) {
    const response = await fetch(url, {
      method: 'PATCH', //try patch
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": num
      })
    })
  }

 

  toyBox.addEventListener("click", function(e) {
    if (e.target.className === "like-btn") {
      e.preventDefault()
      const toyDiv = e.target.parentNode
      const toyId = toyDiv.id
      const likes = toyDiv.querySelector('p')
      
      const likeInt = parseInt(likes.innerText.split(" ")[0])
      const newLikes = (likeInt + 1)
      updateLike(`http://localhost:3000/toys/${toyId}`, `${newLikes}`)
      likes.innerText = `${newLikes} Likes`
      
    } 
  }) 

  const form = document.querySelector(".add-toy-form")
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const newToy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
  
    postToy('http://localhost:3000/toys', newToy);
    // renderToy(newToy)
    // const lastToyAdded = fetchToys()[-1]
    // renderToy(lastToyAdded);
    form.reset()

  }) 


 
});
