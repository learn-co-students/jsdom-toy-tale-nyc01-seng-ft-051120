let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById("toy-collection");
  const newTf = document.querySelector(".add-toy-form");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function getToys(){
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => {toys.forEach(function(toy){
      render(toy)
    })
    })
  }
  
  function postToys(){
    newTf.addEventListener('submit', function(e){
      e.preventDefault()
      
      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: newTf.name.value,
          image: newTf.image.value,
          likes: 0
        })
      })
      .then(resp => resp.json())
      .then(toy => {
        let newToy = render(toy)
        toyCollection.append(newToy)
      })
      newTf.reset()
    })
  }

  function likeToys(){
    document.addEventListener('click', function(e){
      if(e.target.className === 'like-btn'){
        e.preventDefault()
        const button = e.target
      let likeNum =  parseInt(button.previousElementSibling.innerText)+1
      let likes = button.parentNode.querySelector("p")
      likes.innerText = `${likeNum} Likes`

      fetch(`http://localhost:3000/toys/${e.target.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({likes: likeNum})
      })
      .then(resp => resp.json())
      .then(data => {likes})
    }
    })    
  }
  
  function render(toy){
      const toyDiv = document.createElement("div");
      toyDiv.setAttribute('class', 'card')
      toyDiv.innerHTML += `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes</p>
      <button class="like-btn" id=${toy.id}>Like <3</button>
      `
      toyCollection.append(toyDiv)
  }

  getToys()
  postToys()
  likeToys()
});


