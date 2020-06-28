let addToy = false;
const baseUrl = 'http://localhost:3000/toys'

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyContainer = document.querySelector("#toy-collection")
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const fetchToys = () => {
    // return fetch()
    fetch(baseUrl)
    .then(r => r.json())
    .then(toys => 
      renderToys(toys)
    )

    const renderToys = (toys) => {
      toys.forEach(toy => {
        const toyCard = document.createElement("div")
        toyCard.className = 'card'
        toyCard.innerHTML = `
        <h2>${toy.name}</h2>
        <img src='${toy.image}' class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button class="like-btn">Like <3</button>
        `
        toyCard.dataset.number = toy.id
        toyContainer.append(toyCard)
      })
    
    }
  }

  document.addEventListener("submit", e => {
    e.preventDefault()
    console.log(e.target);
    
    const form = e.target 

    const name = form.name.value
    const image = form.image.value

    const options = {
      name: name,
      image: image, 
      likes: 0
    }

    form.reset()
    fetch(baseUrl, {method: 'POST',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
        body: JSON.stringify(options)
    })
    .then(r => r.json())
    .then(toy => {
      const toyCard = document.createElement("div")
        toyCard.className = 'card'
        toyCard.innerHTML = `
        <h2>${toy.name}</h2>
        <img src='${toy.image}' class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button class="like-btn">Like <3</button>
        `
        toyCard.dataset.number = toy.id
        toyContainer.append(toyCard)
    })
    
    

  })

  toyContainer.addEventListener("click", e => {
    if (e.target.className === "like-btn"){
      let toyLikes = e.target.parentNode.querySelector("p")
      let newLikes = parseInt(toyLikes.innerText) + 1

  
      
      fetch(baseUrl+`/${e.target.parentNode.dataset.number}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }, 
        body: JSON.stringify({
          "likes": newLikes
        })
      })
      .then(r => r.json())
      .then(r => {
        toyLikes.innerText = `${newLikes} Likes`
      })
    } 
  })


  fetchToys()
});
