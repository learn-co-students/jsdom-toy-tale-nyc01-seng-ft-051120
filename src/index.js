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

  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(data => {
    const toyCollection = document.querySelector("#toy-collection")
    const toyDiv = document.createElement('div')
    

    data.forEach(toy => { 
     toyDiv.innerHTML += `
     <div class="card" >
     <h2>${toy.name}</h2>
     <img src=${toy.image} class="toy-avatar" />
     <p>${toy.likes} Likes </p>
     <button class="like-btn" id=${toy.id} >Like <3</button>
     </div>
     `
     })
     
    
     toyCollection.append(toyDiv)

  })

  const toyForm = document.getElementsByClassName("input-text")


  const submitButton = document.querySelector(".submit")

  submitButton.addEventListener("click", function(e){
    e.preventDefault()

    const formInput = {
      name: toyForm.name.value,
      image: toyForm.image.value,
      likes: 0
    }
    
    fetch ("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formInput)
    })
    const toyCollection = document.querySelector("#toy-collection")
    const toyDiv = document.createElement('div')
    toyDiv.class = "card"

    toyDiv.innerHTML = `
     <h2>${toyForm.name.value}</h2>
     <img src=${toyForm.image.value} class="toy-avatar" />
     <p> 0 Likes </p>
     <button class="like-btn">Like <3</button>
     `
    toyCollection.append(toyDiv)

    // formInput.reset()
  })

  
  document.addEventListener('click', function(e){
     if(e.target.className === 'like-btn'){
       console.log(e.target.id)
     const button = e.target
     const likeScore = button.parentNode.querySelector("p")
     likeScore.innerText = `${parseInt(likeScore.innerText) + 1} Likes`}
  
     let more = parseInt(e.target.previousElementSibling.innerText)
   
     fetch(`http://localhost:3000/toys/${e.target.id}`, {
       method: "PATCH",
       headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
       },
       body: JSON.stringify({"likes": more})
     })
      
  })




})