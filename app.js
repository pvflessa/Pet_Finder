 import fetchJsonp from 'fetch-jsonp';

const petForm = document.querySelector('#petForm')

petForm.addEventListener('submit', fetchAnimals)


//Fetch animals from API

function fetchAnimals(e){
  e.preventDefault()

  //Get user Input

  const animal = document.querySelector('#animal').value
  const zip = document.querySelector('#zip').value


  //Fetch Animals
  fetchJsonp(
    `http://api.petfinder.com/pet.find?format=json&key=1f6a87dad3344508519cd6b224578ae6&animal=${animal}&location=${zip}&callback=callback`,
    {
      jsonpCallbackFunction: 'callback'
    }
  )
  .then(res => res.json())
  .then(data=> showAnimals(data.petfinder.pets.pet))
  .catch(err => console.log(err))

}


//Show a List of pets

function showAnimals(pets){
  const results = document.querySelector('#results')

  //Clear
  results.innerHTML = '';

  //Loop through pets

  pets.forEach((pet)=> {
    const div = document.createElement('div')
    div.classList.add('card','card-body','mb-3')
    div.innerHTML=`

    <div class="row">

      <div class="col-sm-6">
      <h4>${pet.name.$t} (${pet.age.$t})</h4>

      <p class="text-secondary">${pet.breeds.breed.$t}</p>

      <p>${pet.contact.address1.$t} ${pet.contact.city.$t} ${
      pet.contact.state.$t
    } ${pet.contact.zip.$t}</p>
    <ul class="list-group">
          <li class="list-group-item">Phone: ${pet.contact.phone.$t}</li>
          ${pet.contact.email.$t? `<li class="list-group-item">Email: ${pet.contact.email.$t}</li>`: ``}
          <li class="list-group-item">Shelter ID: ${pet.shelterId.$t}</li>
        </ul>

      </div>
      <div class="col-sm-6">
      <img class="img-fluid rounded-circle mt-2" src="${pet.media.photos.photo[3].$t}"></div>

    </div>

    `

    results.appendChild(div)
  })

  if (!isValidZip(zip)) {

    alert('Please Enter a valid Zipcode')


  }


}
