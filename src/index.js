let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const TOYSURL = "http://localhost:3000/toys"
  const toyCollectionDiv = document.querySelector("#toy-collection")

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  
  const getToys = (url) => {
    fetch(url)
    .then(resp => resp.json())
    .then(toyObjs => renderToys(toyObjs))
  }

  const renderToys = (toyObjs) => {
    toyObjs.forEach(toy => {
      const div = createToyDiv(toy)
      renderToyDiv(div)
    })
  }

  const createToyDiv = toy => {
    div = document.createElement('div')
    div.className = "card"
    div.id = toy.id
    div.innerHTML = `
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar" />
          <p>${toy.likes} Likes </p>
          <button class="like-btn">Like <3</button>
                    `
    console.log(div);
    
    return div    
  }

  const renderToyDiv = div => {
    toyCollectionDiv.append(div)
  }

  const submitHandler = () => {
    toyFormContainer.addEventListener("submit", function(e){
      e.preventDefault()
      if(formNotEmpty()){
        newToyObj = {
          name: `${e.target.name.value}`,
          image: `${e.target.image.value}`,
          likes: 0
        }
        console.log(newToyObj);
        
        // postNewToy(newToyObj)
      }
    })
  }

  const formNotEmpty = () => {
    const nameField = document.getElementsByName("name").value
    const imageField = document.getElementsByName("image").value
    return (nameField.length > 0) && (imageField.length > 0)
  }

  // const postNewToy = (toy) => {
  //   return fetch(TOYSURL, {
  //     method: "POST",
  //     header: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     },
  //     body: JSON.stringify({
  //       name: `${toy.name}`,
  //       image: `${toy.image}`,
  //       likes: `${toy.likes}`
  //     })
  //   })
  //   .then(resp => resp.json)
  //   .then(toy => {
  //     console.log(toy);
      
  //     // const div = createToyDiv(toy)
  //     // renderToyDiv(div)
  //   })

  // }
  
  submitHandler()
  getToys(TOYSURL)
})
