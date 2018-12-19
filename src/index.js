document.addEventListener('DOMContentLoaded', () => {
  getDogs();

  const parent = document.getElementById('table-body').addEventListener('click', dogInfo);

})

function dogInfo(e) {
  if (e.target.innerText === "Edit") {
    id = e.target.parentElement.parentElement.getAttribute('data-id');
    sex = e.target.parentElement.previousElementSibling.innerText;
    breed = e.target.parentElement.previousElementSibling.previousElementSibling.innerText;
    name = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText;

    document.querySelector('input[name="name"]').value = name;
    document.querySelector('input[name="breed"]').value = breed;
    document.querySelector('input[name="sex"]').value = sex;
  }
}
const submitBtn = document.querySelector('input[type="submit"]').addEventListener('click', editDogs)

async function editDogs(event) {
  event.preventDefault()
  const response = await fetch(`http://localhost:3000/dogs/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      name: document.querySelector('input[name="name"]').value,
      breed: document.querySelector('input[name="breed"]').value,
      sex: document.querySelector('input[name="sex"]').value
    })
  })
}

editDogs().then(dog => {
  if (response.ok) {
    let dogRow = document.querySelector(`tr[data-id="${id}"]`)
    dogRow.children[0].innerText = document.querySelector('input[name="name"]').value
    dogRow.children[1].innerText = document.querySelector('input[name="breed"]').value
    dogRow.children[2].innerText = document.querySelector('input[name="sex"]').value
  }
});


async function getDogs() {
  const response = await fetch("http://localhost:3000/dogs");
  const data = await response.json();
  console.log(data);
  return data;
}

getDogs().then(dogs => {
  let output = '';

  dogs.forEach(function (dog) {
    output += rowDog(dog.id, dog.name, dog.breed, dog.sex)
  })
  document.getElementById('table-body').innerHTML = output;
});

function rowDog(id, name, breed, sex) {
  return (
    `<tr data-id=${id}>
      <td>${name}</td>
      <td>${breed}</td>
      <td>${sex}</td>
      <td><button>Edit</button></td>
  </tr>
  `
  )
}


















 // async function editDogs(event) {
  //   event.preventDefault()
  //   e.preventDefault();
  //   const response = await fetch(`http://localhost:3000/dogs/${id}`, {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       name: document.querySelector('input[name="name"]').value,
  //       breed: document.querySelector('input[name="breed"]').value,
  //       sex: document.querySelector('input[name="sex"]').value
  //     })
  //   })
  //   if (response.ok) {
  //     let dogRow = document.querySelector(`tr[data-id="${id}"]`)
  //     dogRow.children[0].innerText = document.querySelector('input[name="name"]').value
  //     dogRow.children[1].innerText = document.querySelector('input[name="breed"]').value
  //     dogRow.children[2].innerText = document.querySelector('input[name="sex"]').value
  //   }
  // }