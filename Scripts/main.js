const addworker = document.getElementById("addworker");
const add_experience = document.getElementById("add-experience");
const experinces_apended = document.getElementById("appended-container-experience");

const close = document.getElementById("close-button");
const overlay = document.getElementById("modal-overlay");

const modal = document.getElementById("modal");

const preview = document.getElementById("pic-preview");
const picture = document.getElementById("picture");
const roles = document.getElementById("roles");

let workers = [];

addworker.addEventListener("click", (e) => {
    overlay.classList.toggle("hidden");
});

close.addEventListener("click", (e) => {
    overlay.classList.toggle("hidden");
    modal.reset();
});

add_experience.addEventListener("click", (e) => {
    let uniqueid = Date.now();
    experinces_apended.insertAdjacentHTML("beforeend",
        `
        <div class="exp expereince-added mb-4 border p-3 rounded">
            <div class="job-name relative mb-2">
                <i class="fa-solid fa-xmark delete-experience absolute right-0 top-1 cursor-pointer transition hover:scale-95 hover:text-red-500 text-sm"></i>
                
                <div class="flex-container">
                    <label for="job-${uniqueid}">Job Name</label>
                    <div>
                        <input id="job-${uniqueid}" type="text" name="job[]" placeholder="Job Title" required 
                            class="job-input w-full border px-2 py-1 rounded">
                    </div>
                </div>
            </div>

            <div class="company-name mb-2">
                <label for="company-${uniqueid}">Company Name</label>
                <div>
                    <input id="company-${uniqueid}" type="text" name="company[]" placeholder="Company / Organization" required 
                        class="company-input w-full border px-2 py-1 rounded">
                </div>
            </div>

            <div class="start-end-date flex gap-2 mb-2">
                <div class="start flex-1">
                    <label for="start-date-${uniqueid}">Start Date</label>
                    <input id="start-date-${uniqueid}" type="date" name="start_date[]" required 
                        class="start-date-input w-full border px-2 py-1 rounded">
                </div>
                <div class="end flex-1">
                    <label for="end-date-${uniqueid}">End Date</label>
                    <input id="end-date-${uniqueid}" type="date" name="end_date[]" required 
                        class="end-date-input w-full border px-2 py-1 rounded">
                </div>
            </div>

            <div class="description-experience mb-2">
                <label for="description-${uniqueid}">Description</label>
                <div>
                    <textarea id="description-${uniqueid}" name="description[]" required placeholder="Description" 
                            class="description-input w-full border px-2 py-1 rounded"></textarea>
                </div>
            </div>
        </div>

        `
    )
});

modal.addEventListener("submit", (e) => {

    e.preventDefault();

    const fullname = document.getElementById("full-name").value.trim();
    const age = document.getElementById("age").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    let urlimage = picture.value;

    const jobinput = document.getElementsByClassName("job-input");
    const companyinputs = document.getElementsByClassName("company-input");
    const startdates = document.getElementsByClassName("start-date-input");
    const enddates = document.getElementsByClassName("end-date-input");
    const descriptions = document.getElementsByClassName("description-input");


    if (roles.value === "") {
        document.getElementById("warning").classList.remove("hidden");
        return;
    }

    let namere = /^[A-Za-z ]{4,}$/
    let emailre = /^[^\.\s@]{5,}@[^\.\s\d@]{4,}\.[^\s\d\.@]{2,}$/;
    let phonere = /^\+[\d]{1,3}[\d]{9}$/;

    if (namere.test(fullname) === false) {
        document.getElementById("warning-name").classList.remove("hidden");
        document.getElementById("full-name").focus();
        return;
    }
    else {
        document.getElementById("warning-name").classList.add("hidden");
    }

    if (Number(age) < 18 || Number(age) > 35) {
        document.getElementById("warning-age").classList.remove("hidden");
        document.getElementById("age").focus();
        return;
    }
    else {
        document.getElementById("warning-age").classList.add("hidden");
    }

    if (phonere.test(phone) === false) {
        document.getElementById("warning-phone").classList.remove("hidden");
        document.getElementById("phone").focus();
        return;
    }
    else {
        document.getElementById("warning-phone").classList.add("hidden");
    }

    if (emailre.test(email) === false) {
        document.getElementById("warning-email").classList.remove("hidden");
        document.getElementById("email").focus();
        return;
    }
    else {
        document.getElementById("warning-email").classList.add("hidden");
    }

    for (let i = 0; i < jobinput.length; i++) {

        const start = new Date(startdates[i].value);
        const end = new Date(enddates[i].value);
        const today = new Date();

        if (end <= start) {
            alert("Experience Date must Be Correct not in future or End Before Start");
            return;
        }

        if (end > today) {
            alert("Experience Date must Be Correct not in future or End Before Start");
            return;
        }

        if (start > today) {
            alert("Experience Date must Be Correct not in future or End Before Start");
            return;
        }
    }

    if (urlimage === "") {
        urlimage = "Assets/images/default.png"
    }

    let worker_now =
    {
        id: Date.now(),
        fullname: fullname,
        age: age,
        role: roles.value,
        email: email,
        phone: phone,
        picture: urlimage,
        curruntroom: "unsigned",
        experiences: []
    };

    for (let i = 0; i < jobinput.length; i++) {
        worker_now.experiences.push({
            job: jobinput[i].value,
            company: companyinputs[i].value,
            start_date: startdates[i].value,
            end_date: enddates[i].value,
            description: descriptions[i].value
        })
    }

    workers.push(worker_now);

    displayWorkers();

    alert("Worker add successfuly :)");
    overlay.classList.toggle("hidden");

    preview.setAttribute("src", "Assets/images/PICPRE.png");
    modal.reset();
});

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-experience")) {
        e.target.closest(".expereince-added").remove();
    }
});

picture.addEventListener("input", () => {
    if (picture.value === "") {
        preview.setAttribute("src", "Assets/images/PICPRE.png");
    }
    else {
        preview.setAttribute("src", picture.value);
    }
});

roles.addEventListener("change", () => {
    document.getElementById("warning").classList.add("hidden");
});

function displayWorkers() {
    let container = document.getElementById("cards-container")
    container.innerHTML = "";

    let unsignedWorkeres = workers.filter(w => w.curruntroom === "unsigned");

    if (unsignedWorkeres.length > 0) {
        unsignedWorkeres.forEach(worker_now => {
            let div = document.createElement('div');
            div.innerHTML = `<div onClick="showdetails(${worker_now.id})"
                    class="card cursor-pointer w-80 h-16 px-2 flex gap-4 items-center rounded-xl bg-[#ffffff26] border border-white">

                    <div  id="profile" class="w-[55px] h-[55px] rounded-full overflow-hidden">
                        <img src="${worker_now.picture}" width="55" alt="profile">
                    </div>

                    <div class="name&role">

                        <div id="name" class="text-white">
                            <h2>${worker_now.fullname}</h2>
                        </div>

                        <div id="role" class="text-[#ffffff]">
                            <h3>${worker_now.role}</h3>
                        </div>

                    </div>

                </div>

`;
            container.append(div);
        })
    }
    else {
        container.innerHTML = `<div id="noworker-avalaible" class="flex items-center gap-3 bg-[#ffffffab] border  px-4 py-3 rounded-lg backdrop-blur-sm">
                        <i class="fas fa-user-times text-white text-xl"></i>
                        <span class="text-white font-medium">No unsigned worker</span>
                </div>`
    }
}
displayWorkers();