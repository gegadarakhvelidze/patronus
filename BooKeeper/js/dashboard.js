class Course {
    getScoresHTML() {
        let scoresHTML = "";
        let totalScore = 0;
        for (const categoryScore of this.criterionScores) {
            const { score, criterion } = categoryScore;
            const scoreHTML = `
                <div class="criterion-score">
                    <div class="score">
                        <p>${score}</p>
                    </div>
                    <div class="criterion">
                        ${criterion}
                    </div>
                </div>
            `;
            scoresHTML += scoreHTML;
            totalScore += score;
        }
        const totalScoreHTML = `
            <div class="criterion-score">
                <div class="total-score">
                    <p>${totalScore}</p>
                </div>
                <div class="criterion">
                    Total
                </div>
            </div>
        `;
        scoresHTML += totalScoreHTML;
        return scoresHTML;
    }
}

class Term {
    toHTML() {
        let sectionHeader = `<h2>${this.term}</h2>`;
        let culumnNames = `
            <div class="table-column-names">
                <h4 class="large-cell">Course</h4>
                <h4 class="large-cell">Tutor</h4>
                <h4 class="small-cell remove-on-mobile">Credits</h4>
                <h4 class="small-cell">Score</h4>
                <h4 class="small-cell">Grade</h4>
            </div>
        `;
        let coursesHTML = "";
        for (let course of this.courses) {
            let courseHTML = `
                <a href="#">
                    <div class="course-entry-container" id=${course.id}>
                        <div class="course-entry">
                            <p class="large-cell">${course.name}</p>
                            <p class="large-cell">${course.tutor.name}</p>
                            <p class="small-cell remove-on-mobile">${course.credits}</p>
                            <p class="small-cell">${course.score}</p>
                            <p class="small-cell">${course.grade}</p>
                        </div>
                    </div>
                </a>
            `;
            coursesHTML += courseHTML.trim();
        }

        let html = `
            <div class="term">
                ${sectionHeader.trim()}
                ${culumnNames.trim()}
                ${coursesHTML.trim()}
            </div>
        `;

        return html;
    }
};


handleDashboard = () => {
    container = document.querySelector(".center-container");
    container.innerHTML = "";
    terms = fetch("/BooKeeper/data/courses.json")
        .then(response => response.json())
        .then(terms => {
            for (term of terms) {
                term = Object.assign(new Term(), term);
                let termHTML = term.toHTML();
                container.innerHTML += termHTML;
            }
        });
}

handleDashboard();

document.addEventListener("click", (e) => {
    if (e.target.closest(".course-entry-container")) {
        const courseContainer = e.target.closest(".course-entry-container");
        const container = document.querySelector(".main-container");
        const centerContainer = document.querySelector(".center-container");
        const courseDetails = document.querySelector(".details-panel");

        // Terrible way of fetching course by ID
        terms = fetch("/BooKeeper/data/courses.json")
            .then(response => response.json())
            .then(terms => {
                let courseById;
                for (term of terms) {
                    for (course of term.courses) {
                        if (course.id == courseContainer.id) {
                            courseById = course;
                            break;
                        }
                    }
                    if (courseById) {
                        break;
                    }
                }
                courseById = Object.assign(new Course(), courseById);
                courseDetails.querySelector("h2").innerHTML = courseById.name;
                courseDetails.querySelector("h3").innerHTML = courseById.tutor.name;
                courseDetails.querySelector(".details-course-description").innerHTML = courseById.description;
                courseDetails.querySelector(".details-scores").innerHTML = courseById.getScoresHTML();
                courseDetails.querySelector(".details-chart").src = courseById.gradeChart;
            })
            .then(() => {
                container.classList.add("main-container-shrinked");
                centerContainer.classList.add("center-container-shrinked");
                courseDetails.style.display = "block";
            });
    } else if (e.target.closest(".details-exit")) {
        const container = document.querySelector(".main-container");
        const centerContainer = document.querySelector(".center-container");
        const courseDetails = document.querySelector(".details-panel");

        container.classList.remove("main-container-shrinked");
        centerContainer.classList.remove("center-container-shrinked");
        courseDetails.style.display = "none";
    }
})