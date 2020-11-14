document.querySelectorAll(".course-entry-container").forEach(subject => {
    subject.addEventListener("click", () => {
        const container = document.querySelector(".main-container")
        const centerContainer = document.querySelector(".center-container")
        const courseDetails = document.querySelector(".details-panel")

        container.classList.add("main-container-shrinked")
        centerContainer.classList.add("center-container-shrinked")
        courseDetails.style.display = "block"
    })
})

document.querySelector(".details-exit").addEventListener("click", () => {
    const container = document.querySelector(".main-container")
    const centerContainer = document.querySelector(".center-container")
    const courseDetails = document.querySelector(".details-panel")
    
    container.classList.remove("main-container-shrinked")
    centerContainer.classList.remove("center-container-shrinked")
    courseDetails.style.display = "none"
})