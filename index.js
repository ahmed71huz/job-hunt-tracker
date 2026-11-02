const form = document.querySelector("#job-form")
let applications = [];

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const company = document.querySelector("#company").value.trim();
    const role = document.querySelector("#role").value.trim();
    const status = document.querySelector("#job-stat").value;
    const application ={id: Date.now(), company: company, role: role, status: status}
    applications.push(application)

    console.log(applications)
})



