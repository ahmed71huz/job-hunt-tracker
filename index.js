
const form = document.querySelector("#job-form")
const board = document.querySelector("#board")

let applications = JSON.parse (localStorage.getItem("application"))|| [];

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const company = document.querySelector("#company").value.trim();
    const role = document.querySelector("#role").value.trim();
    const status = document.querySelector("#job-stat").value;
    const application = { id: Date.now(), company: company, role: role, status: status }
    applications.push(application)
    form.reset();
    renderBoard();
})
function renderBoard() {

    document.querySelectorAll(".cards").forEach(function (div) {
        div.innerHTML = "";
    })
    applications.forEach(function (application) {
        const deleteBtn = document.createElement("button");
        const moveselect = document.createElement("select");
        ["wishlist", "applied", "interview", "offer", "rejected"].forEach(function (status) {
            const option = document.createElement("option");
            option.value = status;
            option.textContent = status;
            moveselect.appendChild(option);
        })
        moveselect.value = application.status;
        moveselect.dataset.action = "move"
        moveselect.dataset.id = application.id;
        deleteBtn.textContent = "Delete";
        deleteBtn.dataset.action = "delete"
        deleteBtn.dataset.id = application.id
        const card = document.createElement("div")
        card.textContent = application.company + " - " + application.role;
        card.classList.add("card")
        card.appendChild(moveselect)
        card.appendChild(deleteBtn)
        const column = document.querySelector(`[data-status="${application.status}"] .cards`);
        column.appendChild(card);
    })
    
    const save = JSON.stringify(applications)
    localStorage.setItem(`application`, save)

}
board.addEventListener("click", function (event) {
    const btn = event.target.closest("[data-action]")

    if (btn === null) {
        return;
    }
    if (btn.dataset.action === "delete") {
        if (!confirm("Delete this application?")) {
            return;
        }
        applications = applications.filter(function (application) {
            return application.id !== Number(btn.dataset.id)
        })
        renderBoard()

    }
})

board.addEventListener("change", function (event) {
    const select  = event.target.closest("[data-action]")
    if(select === null){
        return
    }
    if (select.dataset.action === "move"){
        const id = Number(select.dataset.id)
        const found = applications.find(function (application) {
            return application.id === id
        })
        found.status = select.value
        renderBoard()
    }
})


renderBoard()



