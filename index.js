
const form = document.querySelector("#job-form")
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
        const card = document.createElement("div")
        card.textContent = application.company + " - " + application.role;
        card.classList.add("card")
        const column = document.querySelector(`[data-status="${application.status}"] .cards`);
        column.appendChild(card);
    })


}


