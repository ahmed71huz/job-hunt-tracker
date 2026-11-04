
const form = document.querySelector("#job-form")
const board = document.querySelector("#board")

let applications = [];

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const company = document.querySelector("#company").value.trim();
    const role = document.querySelector("#role").value.trim();
    const status = document.querySelector("#job-stat").value;
    const application = { id: Date.now(), company: company, role: role, status: status }
    applications.push(application)
    console.log(applications)
    form.reset();
    renderBoard();
})
function renderBoard() {

    document.querySelectorAll(".cards").forEach(function (div) {
        div.innerHTML = "";
    })
    applications.forEach(function (application) {
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.dataset.action = "delete"
        deleteBtn.dataset.id = application.id
        const card = document.createElement("div")
        card.textContent = application.company + " - " + application.role;
        card.classList.add("card")
        card.appendChild(deleteBtn)
        const column = document.querySelector(`[data-status="${application.status}"] .cards`);
        column.appendChild(card);
    })


}
board.addEventListener("click", function (event) {
    const btn = event.target.closest("[data-action]")
    if (btn === null) {
        return;
    }
    if (btn.dataset.action === "delete") {
        applications = applications.filter(function (application) {
            return application.id !== Number(btn.dataset.id)
        })
        renderBoard()

    }
})

