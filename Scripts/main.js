const addworker = document.getElementById("addworker");
const add_experience = document.getElementById("add-experience");
const experinces_apended = document.getElementById("appended-container-experience");

const overlay = document.getElementById("modal-overlay");
const overlay_inject = document.getElementById("inject-overlay");
const overlay_profile = document.getElementById("profile-overlay");

const close = document.getElementById("close-button");
const close_inject = document.getElementById("close-inject");
const close_profile = document.getElementById("close-profile");

const modal = document.getElementById("modal");

const preview = document.getElementById("pic-preview");
const picture = document.getElementById("picture");
const roles = document.getElementById("roles");

const addBtns = document.querySelectorAll(".add-btn");

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

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-experience")) {
        e.target.closest(".expereince-added").remove();
    }
});

close_inject.addEventListener("click", () => {
    overlay_inject.classList.add("hidden");
});

addBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        let limit = btn.dataset.limit;
        let room = btn.dataset.room;
        let filtred = filterWorkers(room);
        displayWorkersList(filtred, room, limit);
    })
});

function showdetails(workerId) {
    let found = workers.find(worker => worker.id === workerId);
    console.log(overlay_profile);

    overlay_profile.classList.remove("hidden")

    overlay_profile.innerHTML = "";

    overlay_profile.innerHTML = `

<div id="profile-modal" class="bg-[#074A82] w-104 h-[95%] p-5 overflow-y-scroll no-scrollbar flex flex-col gap-10 ">

            <div class="profile&close-button relative">
                <h3 class="text-2xl text-white">Profile</h3>
                <i id="close-profile" onClick="closemodalprofile()"
                    class="fa-solid fa-xmark absolute text-white right-0 top-1 cursor-pointer transition hover:scale-95 hover:text-red-500 text-2xl"></i>
            </div>

            <div class="profile-container flex items-center gap-6">

                <div class="profile-picture flex items-center justify-center border-gray-400 rounded-full border-2 border-dashed w-20 h-20 overflow-hidden">
                    <img id="pic-profile" height="80" width="80" src="${found.picture}" alt="profile">
                </div>

                <div class="name&role">

                    <div id="profile-name" class="text-white text-2xl"><h3>${found.fullname}</h3></div>
                    <div id="profile-role" class="text-white text-xl"><h4>${found.role}</h4></div>

                </div>

            </div>

            <div class="current-r flex flex-col gap-1">
                <h3 class="text-xl text-white">Current Room</h3>
                <h4 id="current-room" class="text-gray-300 text-sm">${found.curruntroom.replace("workers-", "")}</h4>
            </div>

            <div class="contact-info flex flex-col gap-2">

                <h3 class="text-xl text-white">Contact Info</h3>

                <div class="email flex items-center gap-2">
                    <i class="fa-regular fa-envelope text-gray-300"></i>
                    <a id="profile-email" href="mailto:${found.email}" class="text-gray-300 text-sm">${found.email}</a>
                </div>

                <div class="phone flex items-center gap-2">
                    <i class="fa-solid fa-phone text-gray-300"></i>
                    <a id="profile-phone" href="tel:${found.phone}" class="text-gray-300 text-sm">${found.phone}</a>
                </div>
                
            </div>

            <div class="experinces-profile flex flex-col gap-2">
                ${found.experiences.map(exp =>
        `<div id="experience-profile" class="flex flex-col gap-3">

                    <h3 class="text-xl text-white">Experience</h3>

                    <h4 class="text-lg text-white">Job</h4>
                    <h5 id="ex-job" class="text-gray-300 text-sm">${exp.job}</h5>

                    <h4 class="text-lg text-white">Company</h4>
                    <h5 id="ex-company" class="text-gray-300 text-sm">${exp.company}</h5>

                    <h4 class="text-lg text-white">Date</h4>
                    <h5 id="ex-date" class="text-gray-300 text-sm">Sartdate:${exp.start_date} Enddate:${exp.end_date}</h5>

                    <h4 class="text-lg text-white">Description</h4>
                    <textarea id="ex-description" disabled class="text-sm text-gray-300 w-full border px-2 py-1 rounded">${exp.description}</textarea>`).join("")

        }
                </div>

            </div>

        </div>
`
}

function closemodalprofile() {
    overlay_profile.classList.add("hidden");
}

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

function filterWorkers(room) {
    let filtred = [];
    if (room === "workers-conference") {
        filtred = workers.filter(w => w.curruntroom === "unsigned");
    }
    else if (room === "workers-Reception") {
        filtred = workers.filter(w => (w.role === "receptionist" || w.role === "manager") && w.curruntroom === "unsigned");
    }
    else if (room === "workers-Server") {
        filtred = workers.filter(w => (w.role === "technician" || w.role === "manager" || w.role === "cleaner") && w.curruntroom === "unsigned");
    }
    else if (room === "workers-Security") {
        filtred = workers.filter(w => (w.role === "security" || w.role === "manager" || w.role === "cleaner") && w.curruntroom === "unsigned");
    }
    else if (room === "workers-Staff") {
        filtred = workers.filter(w => w.curruntroom === "unsigned");
    }
    else if (room === "workers-Archives") {
        filtred = workers.filter(w => w.role === "manager" && w.curruntroom === "unsigned");
    }
    return filtred;
}

function displayWorkersList(filtred, room, limit) {
    overlay_inject.classList.remove("hidden");
    let container = document.querySelector("#inject-modal .cards-container");

    container.innerHTML = "";

    if (filtred.length > 0) {
        filtred.forEach(worker_now => {
            let div = document.createElement('div');
            div.innerHTML = `<div
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
            div.addEventListener("click", () => {
                addToRoom(worker_now, room, limit);
                overlay_inject.classList.add("hidden");
            })
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

function addToRoom(worker, room, limit) {
    let container = document.getElementById(room);
    let count = container.children.length
    if (count < limit) {
        let div = document.createElement("div");
        div.className = "bg-white p-1 flex gap-2 items-center rounded-md transition hover:[&_.remove-worker]:flex"
        div.innerHTML = `
                        <div class="remove-worker w-3.5 h-3.5 bg-red-600 justify-center items-center  rounded-full cursor-pointer hidden">
                                <i class="fa-solid fa-minus text-[0.5rem] text-white"></i>
                            </div>

                            <div class="w-[30px] h-[30px] rounded-full overflow-hidden">
                                <img src="${worker.picture}" width="30" alt="profile">
                            </div>

                            <div class="flex-container">

                                <p class="text-[0.6rem]">${worker.fullname}</p>
                                <p class="text-[0.5rem]">${worker.role}</p>

                            </div>`

        div.addEventListener("click", () => {
            showdetails(worker.id);
        })

        let remove_worker = div.querySelector(".remove-worker")
        remove_worker.addEventListener("click", (e) => {
            e.stopPropagation();
            div.remove();
            worker.curruntroom = "unsigned";
            displayWorkers();
        })

        container.appendChild(div);
        worker.curruntroom = room;
        displayWorkers();
    }
    else {
        alert("Room is full!!!");
    }
}