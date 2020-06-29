let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  let firstDiv = document.getElementById('toy-collection')

  const allToysFetch = () =>{fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => json.forEach(toys => allToys(toys)))
}
const allToys = (toys) => {
  let newDiv = document.createElement("div")
  newDiv.className = "card"
  newDiv.dataset.id = toys.id
  newDiv.innerHTML = `
  <h2>${toys.name}</h2>
  <img src=${toys.image} class="toy-avatar" />
  <p>${toys.likes}</p>
  <button class="like-btn">Like</button> `
  firstDiv.append(newDiv);
}


let newToy = document.querySelector('form')
newToy.addEventListener('submit',function(e){
  let formValues = e.target
  let name = formValues.name.value
  let image = formValues.image.value
  const obj={
    name:name,
    image:image,
    likes: 0
  }
  fetch("http://localhost:3000/toys", {
method: "POST",
headers: {
"Content-type": "application/json",
},
body: JSON.stringify(obj),
})
formValues.reset();
})

document.addEventListener('click',function(e){
  if (e.target.className == 'like-btn'){
    let toyId =e.target.parentNode.dataset.id
   let toyLikes =e.target.parentNode.querySelector('p')
   toyLikes.textContent = parseInt(toyLikes.textContent )+1
   fetch(`http://localhost:3000/toys/${toyId}`, {
method: "PATCH",
headers: {
"Content-type": "application/json",
},
body: JSON.stringify({'likes':`${toyLikes.textContent}`}),
})
  }
})


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
  allToysFetch()
});
