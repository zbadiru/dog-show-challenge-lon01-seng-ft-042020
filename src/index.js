const API_ENDPOINT = "http://localhost:3000/dogs/";
let table = document.querySelector('#table-body')
const dogForm = document.querySelector('#dog-form')

document.addEventListener('DOMContentLoaded', () => {
    get()
})

function populateForm(dog) {
    dogForm.name.value = dog.name
    dogForm.breed.value = dog.breed
    dogForm.sex.value = dog.sex

    dogForm.addEventListener('submit', e => patch(e, dog))
}

//////////////////////////api calls

function get() {
    table.innerHTML = ""
    return fetch(API_ENDPOINT)
    .then((res) => res.json()) 
    .then((dogs) => dogs.forEach((dog) => makeOneRow(dog)));
}

function patch(e, dog) {
    e.preventDefault();
    return fetch(API_ENDPOINT + dog.id, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: e.target[0].value,
                breed: e.target[1].value,
                sex: e.target[2].value
            }),
    }).then((res) => res.json()).then(dog => {
        table.innerHTML = ""
        get()
    })
}



//////////////// functions -- call the master function

function makeOneRow(dog) {
    const row = table.insertRow(0);

    const cell1 = row.insertCell(0);
    cell1.innerText = dog.name;

    const cell2 = row.insertCell(1);
    cell2.innerText = dog.breed;

    const cell3 = row.insertCell(2);
    cell3.innerText = dog.sex;

    const cell4 = row.insertCell(3);
    const button = document.createElement('button')
    button.className = 'edit-button'
    button.innerText = 'Edit'
    button.addEventListener("click", () => populateForm(dog))
    cell4.append(button)

}

// get(API_ENDPOINT).then((dogs) => dogs.forEach((dog) => makeOneRow(dog)));

headers: 
{
  "Content-Type": "application/json",
  Accept: "application/json",
};
body: JSON.stringify({
})
