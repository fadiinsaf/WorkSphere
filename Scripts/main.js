const addworker = document.getElementById("addworker");
const overlay = document.getElementById("modal-overlay");
const close = document.getElementById("close-button");

addworker.addEventListener("click", (e) => {
    overlay.classList.toggle("hidden");
});

close.addEventListener("click", (e) => {
    overlay.classList.toggle("hidden");
    modal.reset();
});