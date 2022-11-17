const container = document.querySelector(".container");

let groceryList = [];

// fetch the data ;
fetch("http://localhost:3000/read")
.then((res) => {
    return res.json();
}).then((data) => {
    console.log(data);

    groceryList = data.output;

    // DOM manipulation and adding elements in ul element
    groceryList.forEach(grocery => {
        
        let div = document.createElement("div");
        if (grocery.completed) {
            div.innerHTML = `
                <div id="list-box" class="completed">
                    <h2>${grocery.name}</h2>
                    <p>${grocery.description}</p>
                    <h4>Total Cost: ${grocery.cost}</h4>
                    <h4>Ratings: ${grocery.ratings}/10</h4>
                    <div class="btngroup">
                        <button class="edit" id="edit" value=${grocery._id}>
                            update
                        </button>
                        <button class="done" id="undone" value=${grocery._id} key="revert">
                            Revert
                        </button>
                        <button class="delete" id="delete" value=${grocery._id}>
                            Remove
                        </button>
                    </div>
                </div>
        `;
        } else {
            div.innerHTML = `
                <div id="list-box">
                    <h2>${grocery.name}</h2>
                    <p>${grocery.description}</p>
                    <h4>Total Cost: ${grocery.cost}</h4>
                    <h4>Ratings: ${grocery.ratings}/10</h4>
                    <div class="btngroup">
                        <button class="edit" id="edit" value=${grocery._id}>
                            update
                        </button>
                        <button class="done" id="done" value=${grocery._id} key="bought">
                            Bought
                        </button>
                        <button class="delete" id="delete" value=${grocery._id}>
                            Remove
                        </button>
                    </div>
                </div>
        `;
        }
        container.appendChild(div);
    });

    let edits = document.querySelectorAll(".edit");

    edits.forEach((edit) => {
        edit.addEventListener("click",(e) => {
            // store the id to window.localstorage
            window.localStorage.setItem("id",e.target.value);
            window.location = window.location.href.replace("/index.html","/edit.html");
        })
    })
    

    // get the done and delete button
    const dones = document.querySelectorAll(".done");
    const dels = document.querySelectorAll(".delete");
    // delete function
    dels.forEach((del) => {
        del.addEventListener("click",(e) => {
            e.preventDefault();
            // fetch delete 
            fetch(`http://localhost:3000/delete/${e.target.value}`,{
                method: "DELETE"
            })
            .then((result) => {
                return result.json();
            }).then((data) => {
                console.log(data);
                if (data.success) {
                    alert("Grocery Deleted");
                    window.location.reload();
                } else {
                    alert("ERROR OCCURRED");
                }
            })
        })
    })

    // done fucntion
    dones.forEach((done) => {
        done.addEventListener("click",(e) => {
            let key = e.target.id;
            if (key === "undone") {
                // fetch update the completed grocery
                let res = {
                    completed: false
                }
                
                fetch(`http://localhost:3000/completed/${e.target.value}`,{
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(res)
                })
                .then((result) => {
                    return result.json();
                })
                .then((data) => {
                    if (data.success) {
                        console.log("Completed");
                        console.log(data);
                        window.location.reload();
                    } else {
                        console.log("Error occured");
                    }
                })
            } else {
                // fetch update the uncomplete grocery
                let res = {
                    completed: true
                };

                fetch(`http://localhost:3000/completed/${e.target.value}`,{
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(res)
                })
                .then((result) => {
                    return result.json();
                })
                .then((data) => {
                    if (data.success) {
                        console.log("Completed");
                        console.log(data);
                        window.location.reload()
                    } else {
                        console.log("Error occured");
                    }
                })
            }
        })
    });

    // remove all functionality
    const removeAll = document.querySelector(".removeAll");

    removeAll.addEventListener("click",(e) => {
        e.preventDefault();
        
        fetch("http://localhost:3000/removeall",{
            method: "DELETE"
        })
        .then((result) => {
            return result.json();
        })
        .then((data) => {
            console.log(data);
            if (data.success) {
                window.location.reload();
            } else {
                console.log("Error");
            }
        })
    })
});
