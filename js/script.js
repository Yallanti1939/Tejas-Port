/* =========================================================
   NAVBAR ACTIVE LINK + SMOOTH SECTION SCROLL
========================================================= */

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const header = document.querySelector(".header");


/* =========================================================
   SET ACTIVE NAVBAR LINK
========================================================= */

function setActiveLink(sectionId) {

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${sectionId}`
        ) {
            link.classList.add("active");
        }

    });

}


/* =========================================================
   NAVBAR CLICK
========================================================= */

navLinks.forEach(link => {

    link.addEventListener("click", event => {

        const targetId =
            link.getAttribute("href");

        /*
         * Only handle internal section links
         */
        if (
            !targetId ||
            !targetId.startsWith("#")
        ) {
            return;
        }

        const targetSection =
            document.querySelector(targetId);

        if (!targetSection) {
            return;
        }

        /*
         * Prevent the browser's default jump
         */
        event.preventDefault();


        /*
         * Get fixed navbar height
         */
        const headerHeight =
            header ? header.offsetHeight : 0;


        /*
         * Calculate section position
         *
         * headerHeight
         *      ↓
         * Fixed navbar space
         *
         * 30px
         *      ↓
         * Extra breathing space
         */
        const sectionPosition =
            targetSection.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            30;


        /*
         * Smooth scroll
         */
        window.scrollTo({

            top: Math.max(sectionPosition, 0),

            behavior: "smooth"

        });


        /*
         * Immediately make clicked
         * navbar link active
         */
        setActiveLink(
            targetSection.id
        );

    });

});


/* =========================================================
   ACTIVE NAVBAR WHILE SCROLLING
========================================================= */

window.addEventListener("scroll", () => {

    let currentSection = "";

    /*
     * Position where a section becomes active
     *
     * This takes the fixed navbar into account.
     */
    const scrollPosition =
        window.scrollY +
        (header ? header.offsetHeight : 0) +
        50;


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionBottom =
            sectionTop +
            section.offsetHeight;


        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionBottom
        ) {

            currentSection =
                section.id;

        }

    });


    /*
     * Special case:
     * At the very top, Home should be active.
     */
    if (window.scrollY < 100) {

        const homeSection =
            document.querySelector("#home");

        if (homeSection) {

            currentSection =
                "home";

        }

    }


    if (currentSection) {

        setActiveLink(
            currentSection
        );

    }

});


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

const themeToggle =
    document.querySelector("#theme-toggle");

const themeIcon =
    document.querySelector("#theme-icon");


/* =========================================================
   GET SAVED THEME
========================================================= */

const savedTheme =
    localStorage.getItem("theme");


/* =========================================================
   APPLY SAVED THEME
========================================================= */

if (savedTheme === "dark") {

    document.body.classList.add(
        "dark-mode"
    );

    if (themeIcon) {

        themeIcon.textContent =
            "☀";

    }

} else {

    document.body.classList.remove(
        "dark-mode"
    );

    if (themeIcon) {

        themeIcon.textContent =
            "☾";

    }

}


/* =========================================================
   THEME TOGGLE
========================================================= */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark-mode"
            );


            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );


            /*
             * Change icon
             */

            if (themeIcon) {

                themeIcon.textContent =
                    isDark ? "☀" : "☾";

            }


            /*
             * Save theme preference
             */

            localStorage.setItem(
                "theme",
                isDark ? "dark" : "light"
            );

        }
    );

}


/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop =
    document.querySelector(
        ".back-to-top"
    );


if (backToTop) {

    backToTop.addEventListener(
        "click",
        event => {

            event.preventDefault();


            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });


            /*
             * Make Home active
             */

            setActiveLink("home");

        }
    );

}


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.querySelector(
        "#contact-form"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document
                    .querySelector("#name")
                    .value
                    .trim();


            const email =
                document
                    .querySelector("#email")
                    .value
                    .trim();


            const message =
                document
                    .querySelector("#message")
                    .value
                    .trim();


            /*
             * Validate fields
             */

            if (
                !name ||
                !email ||
                !message
            ) {

                alert(
                    "Please fill in all the fields."
                );

                return;

            }


            /*
             * Email subject
             */

            const subject =
                encodeURIComponent(
                    `Portfolio Contact from ${name}`
                );


            /*
             * Email body
             */

            const body =
                encodeURIComponent(

                    `Name: ${name}\n\n` +

                    `Email: ${email}\n\n` +

                    `Message:\n${message}`

                );


            /*
             * Open user's email client
             */

            window.location.href =
                `mailto:venkatasai.yallanti@gmail.com` +
                `?subject=${subject}&body=${body}`;

        }
    );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(

        ".about-card, " +

        ".education-item, " +

        ".experience-card, " +

        ".project-card, " +

        ".contact-info, " +

        ".contact-form-wrapper"

    );


/*
 * Check whether browser supports
 * IntersectionObserver
 */

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );


                        /*
                         * Stop observing once
                         * animation has happened
                         */

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(element => {

        element.classList.add(
            "reveal"
        );

        revealObserver.observe(
            element
        );

    });

} else {

    /*
     * Fallback for older browsers
     */

    revealElements.forEach(element => {

        element.classList.add(
            "show"
        );

    });

}


/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYear =
    document.querySelector(
        "#current-year"
    );


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}