const updateForm = document.querySelector('.editForm');
const name = document.querySelector(".name");
const description = document.querySelector(".description");
const cost = document.querySelector(".cost");
const ratings = document.querySelector(".ratings");
const container = document.querySelector(".container");

let id = window.localStorage.getItem("id");

// fetch the specific grocery form id
fetch(`http://localhost:3000/read/${id}`)
.then((result) => {
    return result.json();
})
.then((data) => {
    container.innerHTML = `
        <p>Name: ${data.output.name}</p>
        <p>Description: ${data.output.description}</p>
        <p>Cost: ${data.output.cost}</p>
        <p>Ratings: ${data.output.ratings}</p>
    `
})

updateForm.addEventListener("submit",(e) => {
    e.preventDefault();

    // fetch update 
    let updatedGrocery = {
        "name": name.value,
        "description": description.value,
        "cost": cost.value,
        "ratings": ratings.value
    };

    fetch(`http://localhost:3000/edit/${id}`,{
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedGrocery)
    })
    .then((result) => {
        return result.json();
    }).then((data) => {
        if (data.success) {
            alert("Content Updated");
            name.value = "";
            description.value = "";
            cost.value = "";
            ratings.value = "";
            window.location = window.location.href.replace("/edit.html","/index.html");
        } else {
            alert("Error occured");
            console.log(data)
        }
    })

    
})