/* ==========================================
   AI HEALTHCARE SYSTEM & AI MEDIKIT GUIDER
   Main JavaScript File
========================================== */


/* ==========================================
   WAIT FOR PAGE TO LOAD
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("AI Healthcare System loaded successfully!");



    /* ==========================================
       MOBILE NAVIGATION
    ========================================== */

    const navbar = document.querySelector(".navbar");
    const navContainer = document.querySelector(".nav-container");
    const navLinks = document.querySelector(".nav-links");

    if (navContainer && navLinks) {

        const mobileMenuButton = document.createElement("button");

        mobileMenuButton.classList.add("mobile-menu-btn");

        mobileMenuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        mobileMenuButton.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

        navContainer.appendChild(mobileMenuButton);


        mobileMenuButton.addEventListener("click", function () {

            navLinks.classList.toggle("show-nav");

            const icon = mobileMenuButton.querySelector("i");


            if (navLinks.classList.contains("show-nav")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });


        /* Close menu when a navigation link is clicked */

        const navigationItems =
            navLinks.querySelectorAll("a");


        navigationItems.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("show-nav");

                const icon =
                    mobileMenuButton.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }



    /* ==========================================
       ACTIVE NAVIGATION LINK
    ========================================== */

    const currentPage =
        window.location.pathname.split("/").pop()
        || "index.html";


    const allNavLinks =
        document.querySelectorAll(".nav-links a");


    allNavLinks.forEach(function (link) {

        const pageName =
            link.getAttribute("href");


        if (pageName === currentPage) {

            allNavLinks.forEach(function (item) {

                item.classList.remove("active");

            });


            link.classList.add("active");

        }

    });



    /* ==========================================
       SYMPTOM CHECKER
    ========================================== */

    const symptomForm =
        document.getElementById("symptomForm");


    if (symptomForm) {

        symptomForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const age =
                    document.getElementById("age").value;

                const gender =
                    document.getElementById("gender").value;

                const symptoms =
                    document
                        .getElementById("symptoms")
                        .value
                        .trim();

                const duration =
                    document
                        .getElementById("duration")
                        .value;


                /* Basic Validation */

                if (
                    age === "" ||
                    gender === "" ||
                    symptoms === "" ||
                    duration === ""
                ) {

                    showNotification(
                        "Please complete all fields before continuing.",
                        "warning"
                    );

                    return;

                }


                /* Show analysis result */

                showSymptomResult(
                    age,
                    gender,
                    symptoms,
                    duration
                );

            }
        );

    }



    /* ==========================================
       MEDICINE SEARCH
    ========================================== */

    const medicineSearchButton =
        document.getElementById("searchMedicine");


    const medicineSearchInput =
        document.getElementById("medicineSearch");


    if (
        medicineSearchButton &&
        medicineSearchInput
    ) {

        medicineSearchButton.addEventListener(
            "click",
            function () {

                const medicineName =
                    medicineSearchInput.value.trim();


                if (medicineName === "") {

                    showNotification(
                        "Please enter a medicine or medical item name.",
                        "warning"
                    );

                    return;

                }


                showMedicineResult(
                    medicineName
                );

            }
        );

    }



    /* ==========================================
       MEDICINE INFORMATION SEARCH
    ========================================== */

    const medicineInfoSearch =
        document.getElementById(
            "medicineInfoSearch"
        );


    if (medicineInfoSearch) {

        const searchButton =
            medicineInfoSearch
                .parentElement
                .querySelector("button");


        if (searchButton) {

            searchButton.addEventListener(
                "click",
                function () {

                    const medicineName =
                        medicineInfoSearch
                            .value
                            .trim();


                    if (medicineName === "") {

                        showNotification(
                            "Please enter a medicine name.",
                            "warning"
                        );

                        return;

                    }


                    showMedicineResult(
                        medicineName
                    );

                }
            );

        }

    }



    /* ==========================================
       CONTACT FORM
    ========================================== */

    const contactForm =
        document.getElementById("contactForm");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document
                        .getElementById("name")
                        .value
                        .trim();


                const email =
                    document
                        .getElementById("email")
                        .value
                        .trim();


                const message =
                    document
                        .getElementById("message")
                        .value
                        .trim();


                if (
                    name === "" ||
                    email === "" ||
                    message === ""
                ) {

                    showNotification(
                        "Please complete all fields.",
                        "warning"
                    );

                    return;

                }


                /* Simple email validation */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    showNotification(
                        "Please enter a valid email address.",
                        "warning"
                    );

                    return;

                }


                showNotification(
                    "Thank you! Your feedback has been received.",
                    "success"
                );


                contactForm.reset();

            }
        );

    }



    /* ==========================================
       ENTER KEY FOR MEDICINE SEARCH
    ========================================== */

    if (medicineSearchInput) {

        medicineSearchInput.addEventListener(
            "keypress",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    medicineSearchButton.click();

                }

            }
        );

    }



    if (medicineInfoSearch) {

        medicineInfoSearch.addEventListener(
            "keypress",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();


                    const searchButton =
                        medicineInfoSearch
                            .parentElement
                            .querySelector("button");


                    if (searchButton) {

                        searchButton.click();

                    }

                }

            }
        );

    }



    /* ==========================================
       SMOOTH SCROLL
    ========================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


                if (
                    targetId === "#"
                ) {
                    return;
                }


                const targetElement =
                    document.querySelector(
                        targetId
                    );


                if (targetElement) {

                    event.preventDefault();


                    targetElement.scrollIntoView({

                        behavior: "smooth"

                    });

                }

            }
        );

    });

});



/* ==========================================
   SHOW SYMPTOM RESULT
========================================== */

function showSymptomResult(
    age,
    gender,
    symptoms,
    duration
) {

    /* Remove previous result if it exists */

    const oldResult =
        document.querySelector(
            ".symptom-result"
        );


    if (oldResult) {

        oldResult.remove();

    }


    /* Create result container */

    const result =
        document.createElement("div");


    result.classList.add(
        "symptom-result"
    );


    result.innerHTML = `

        <div class="result-header">

            <div class="result-icon">
                <i class="fa-solid fa-brain"></i>
            </div>

            <div>

                <h2>Preliminary AI Guidance</h2>

                <p>
                    Based on the information you entered
                </p>

            </div>

        </div>


        <div class="result-details">

            <div class="result-item">

                <strong>Age</strong>

                <span>${escapeHTML(age)}</span>

            </div>


            <div class="result-item">

                <strong>Gender</strong>

                <span>${escapeHTML(gender)}</span>

            </div>


            <div class="result-item">

                <strong>Duration</strong>

                <span>${escapeHTML(duration)}</span>

            </div>

        </div>


        <div class="symptom-summary">

            <h3>
                Symptoms Entered
            </h3>

            <p>
                ${escapeHTML(symptoms)}
            </p>

        </div>


        <div class="guidance-box">

            <i class="fa-solid fa-heart-pulse"></i>

            <div>

                <h3>General Guidance</h3>

                <p>
                    Your information has been recorded for preliminary
                    guidance. This demonstration does not provide a medical
                    diagnosis. Monitor your condition and consider consulting
                    a qualified healthcare professional if symptoms persist,
                    worsen, or cause significant concern.
                </p>

            </div>

        </div>


        <div class="medical-warning">

            <i class="fa-solid fa-triangle-exclamation"></i>

            <p>
                This AI healthcare project is intended for educational and
                preliminary guidance purposes only. It does not replace a
                doctor, medical diagnosis, treatment, or emergency services.
            </p>

        </div>

    `;


    const symptomForm =
        document.getElementById(
            "symptomForm"
        );


    if (symptomForm) {

        symptomForm.parentElement.appendChild(
            result
        );


        result.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    }

}



/* ==========================================
   SHOW MEDICINE RESULT
========================================== */

function showMedicineResult(
    medicineName
) {

    /* Remove previous result */

    const oldResult =
        document.querySelector(
            ".medicine-result"
        );


    if (oldResult) {

        oldResult.remove();

    }


    const result =
        document.createElement("div");


    result.classList.add(
        "medicine-result"
    );


    result.innerHTML = `

        <div class="result-header">

            <div class="result-icon">
                <i class="fa-solid fa-pills"></i>
            </div>

            <div>

                <h2>
                    Medicine Search Result
                </h2>

                <p>
                    ${escapeHTML(medicineName)}
                </p>

            </div>

        </div>


        <div class="medicine-information">

            <div class="medicine-info-item">

                <i class="fa-solid fa-circle-info"></i>

                <div>

                    <h3>
                        General Information
                    </h3>

                    <p>
                        Medicine information should always be verified using
                        the official packaging, label, pharmacist, or a
                        qualified healthcare professional.
                    </p>

                </div>

            </div>


            <div class="medicine-info-item">

                <i class="fa-solid fa-list-check"></i>

                <div>

                    <h3>
                        Check the Label
                    </h3>

                    <p>
                        Review the medicine name, ingredients, instructions,
                        expiry information, warnings, and storage details.
                    </p>

                </div>

            </div>


            <div class="medicine-info-item">

                <i class="fa-solid fa-shield-heart"></i>

                <div>

                    <h3>
                        Safety Awareness
                    </h3>

                    <p>
                        Do not use an unidentified medicine or rely on a
                        search result as a substitute for professional
                        medical advice.
                    </p>

                </div>

            </div>

        </div>


        <div class="medical-warning">

            <i class="fa-solid fa-triangle-exclamation"></i>

            <p>
                This demo currently provides general medicine awareness only.
                It does not prescribe medicines or provide personalized dosage
                instructions.
            </p>

        </div>

    `;


    /* Find the appropriate search box */

    const searchBoxes =
        document.querySelectorAll(
            ".search-box"
        );


    if (searchBoxes.length > 0) {

        const searchBox =
            searchBoxes[0];


        searchBox.parentElement.insertBefore(
            result,
            searchBox.nextSibling
        );


        result.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    }

}



/* ==========================================
   NOTIFICATION SYSTEM
========================================== */

function showNotification(
    message,
    type = "success"
) {

    /* Remove existing notification */

    const existingNotification =
        document.querySelector(
            ".notification"
        );


    if (existingNotification) {

        existingNotification.remove();

    }


    const notification =
        document.createElement("div");


    notification.classList.add(
        "notification",
        type
    );


    let icon =
        "fa-circle-check";


    if (type === "warning") {

        icon =
            "fa-triangle-exclamation";

    }


    notification.innerHTML = `

        <i class="fa-solid ${icon}"></i>

        <span>
            ${escapeHTML(message)}
        </span>

        <button
            class="notification-close"
            aria-label="Close notification"
        >

            <i class="fa-solid fa-xmark"></i>

        </button>

    `;


    document.body.appendChild(
        notification
    );


    /* Close button */

    const closeButton =
        notification.querySelector(
            ".notification-close"
        );


    closeButton.addEventListener(
        "click",
        function () {

            notification.remove();

        }
    );


    /* Auto remove after 5 seconds */

    setTimeout(function () {

        notification.classList.add(
            "hide"
        );


        setTimeout(function () {

            notification.remove();

        }, 300);

    }, 5000);

}



/* ==========================================
   ESCAPE HTML
   Prevents user input from being interpreted
   as HTML when displayed on the page.
========================================== */

function escapeHTML(value) {

    const temporaryElement =
        document.createElement("div");


    temporaryElement.textContent =
        value;


    return temporaryElement.innerHTML;

}