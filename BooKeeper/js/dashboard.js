document.querySelectorAll(".course-entry-container").forEach(subject => {
    subject.addEventListener("click", () => {
        const container = document.querySelector(".main-container")
        const centerContainer = document.querySelector(".center-container")
        const courseDetails = document.querySelector(".course-details-panel")
        container.style.width = "50%"
        centerContainer.style.width = "80%"
        courseDetails.style.display = "block"
    })
})