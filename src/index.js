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

  function fetchToys(url) {
    fetch(url)
    .then(resp => resp.json())
    .then(allToysDataObject => renderToys(allToysDataObject));
  }

  fetchToys("http://localhost:3000/toys")

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


  
  function updateLike(url, num) {
    fetch(url, {
      method: 'PATCH', 
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
      const likesText = toyDiv.querySelector('p')
      
      const likeInt = parseInt(likesText.innerText.split(" ")[0])
      const newLikes = (likeInt + 1)
      likesText.innerText = `${newLikes} Likes`
      updateLike(`http://localhost:3000/toys/${toyId}`, `${newLikes}`)
      
    } 
  }) 


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
        "likes": `${toy.likes}`
      })
    })
    .then(resp => resp.json())
    .then(toyObject => renderToy(toyObject))
  }

  const form = document.querySelector(".add-toy-form")
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const newToy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
  
    postToy('http://localhost:3000/toys', newToy);
    form.reset()
  }) 


 
});
