const addForm = document.querySelector(".addForm");
const name = document.querySelector(".name");
const description = document.querySelector(".description");
const cost = document.querySelector(".cost");
const ratings = document.querySelector(".ratings");

// submit form action
addForm.addEventListener("submit",(e) => {
    e.preventDefault();
    let grocery = {
        "name" : name.value,
        "description": description.value,
        "cost": cost.value,
        "ratings": ratings.value
    }
    console.log(grocery);
    // fetch post 
    fetch("http://localhost:3000/add",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(grocery)
    })
    .then((result) => {
        return result.json();
    }).then((data) => {
        console.log(data);
        if (data.success) {
            alert("Grocery Added");
            name.value = "";
            description.value = "";
            cost.value = "";
            ratings.value = "";
        } else {
            alert("ERROR OCCURED");
        }
    })
});