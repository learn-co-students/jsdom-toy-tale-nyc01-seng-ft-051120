let addToy = false;

let displayToys = toys =>  {
  toys.forEach(toy => {
    displayToy(toy)
  });
}

let displayToy = toy => {
  let toyDiv = document.createElement("div");
  toyDiv.className = "card";
  toyDiv.insertAdjacentHTML("afterbegin",`
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button data-id="${toy.id}" data-likes="${toy.likes}"  class="like-btn">Like <3</button>
  `);
  document.getElementById("toy-collection").insertAdjacentElement("afterbegin", toyDiv);
}

let addNewToy = newToy => {
  const data = {
    method: "POST",
    headers:
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    body: JSON.stringify(newToy)
  }

  fetch("http://localhost:3000/toys", data)
    .then(resp => resp.json())
    .then(json => displayToy(json))
    .catch(err => console.log(err.message))
}

let increaseLike = data => {
  let button = document.querySelector(`[data-id="${data.id}"]`);
  let p = button.parentElement.querySelector("p");
  p.textContent = `${data.likes} likes`;
  button.dataset.likes = data.likes;

}

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

  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(json => displayToys(json));

    toyFormContainer.addEventListener("submit", event => {
      event.preventDefault();
      let name = event.target.name.value;
      let image = event.target.image.value;
      let likes = 0
      
      let newToy = {
        name,
        image,
        likes
      }

      addNewToy(newToy);
      event.target.reset();

    });

    document.addEventListener("click", event => {
      if(event.target.className == "like-btn") {
        let id = event.target.dataset.id;
        let likes = event.target.dataset.likes;
        likes = parseInt(likes) + 1;

        let likesObj =  {
          likes: likes
        };

        const data = {
          method: "PATCH",
          headers:
            {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
          body: JSON.stringify(likesObj)
        }
        
        fetch(`http://localhost:3000/toys/${id}`, data)
          .then(resp => resp.json())
          .then(json => increaseLike(json));
      }
      
    });
});``