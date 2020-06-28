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

  divToyCollection = document.getElementById('toy-collection')

  
  function fetchGetToys(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
      const toysHTML = renderToys(data)
      divToyCollection.innerHTML = toysHTML.join('')
    })
    .catch(error => alert(error))
  }

  
  const toyLikes = {}

  function renderToys(data) {
   
    return data.map(toyData => {
      return `<div class='card' data-number="${toyData.id}">
              <h2>${toyData.name}</h2>
              <img src=${toyData.image} class="toy-avatar" />
              <p data-number='${toyData.likes}'>${toyData.likes} Likes </p>
              <button class="like-btn">Like <3</button>
              </div>
            `
    })
  }

  function submitNewToy() {
    const formSubmitted = document.querySelector(".add-toy-form")
    formSubmitted.addEventListener('submit', function(e) {
      e.preventDefault()
      const form = e.target
      const newToyName = form.name.value
      const newToyImage = form.image.value
      const newToy = fetchObject(newToyName, newToyImage)
      fetchPostToys('http://localhost:3000/toys', newToy)


    })
  }

    function fetchObject(toyName, toyImage){
      let newToyInfo = {
        name: `${toyName}`,
        image: `${toyImage}`,
        likes: 0
     }
      return newToyInfo
    }

 

  function fetchPostToys(url, submittedToy) {
    fetch(url, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
      body: JSON.stringify(submittedToy)
    })
    .then(response => response.json())
    .then(data => {
      const newToyHTML = renderNewToy(data)
      divToyCollection.innerHTML += newToyHTML
    })
    .catch(error => alert(error))
  }


  function renderNewToy(toyData) {
    return `<div class='card' data-number="${toyData.id}">
              <h2>${toyData.name}</h2>
              <img src=${toyData.image} class="toy-avatar" />
              <p data-number="${toyData.likes}">${toyData.likes} Likes </p>
              <button class="like-btn">Like <3</button>
              </div>
            `
  }

  divToyCollection.addEventListener('click', function(e){
    if (e.target.className === 'like-btn') {
      const divLiked = e.target.parentNode
      const idLiked = divLiked.dataset.number
      const likeP = divLiked.querySelector('p')
      const newLikes = parseInt(likeP.dataset.number) + 1
      fetchAddLikes('http://localhost:3000/toys', idLiked, newLikes)
    }
  })


  function fetchAddLikes(url, id, likeCount) {
    fetch(`${url}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(
        {
        likes: `${likeCount}`
      })
    })
    .then(response => response.json())
    .then(data => {
      updateToyData(data)
    })
    .catch(error => alert(error))
  }

  function updateToyData(data) {
    const updatedToy = document.querySelector(`div[data-number="${data.id}"]`)
    const updatedP = updatedToy.querySelector('p')  
    updatedP.textContent = `${data.likes} Likes`
    updatedP.dataset.number = `${data.likes}`
  }


  fetchGetToys('http://localhost:3000/toys')
  submitNewToy()


});
