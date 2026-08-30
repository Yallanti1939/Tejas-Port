/* =========================================================
   PORTFOLIO WEBSITE - COMPLETE JAVASCRIPT
========================================================= */


/* =========================================================
   1. SELECT ELEMENTS
========================================================= */

const navbar = document.querySelector(".navbar");

const navLinks =
    document.querySelectorAll(".nav-link");

const sections =
    document.querySelectorAll("section[id]");

const mobileMenuBtn =
    document.querySelector("#mobile-menu-btn");

const navLinksContainer =
    document.querySelector("#nav-links");

const themeToggle =
    document.querySelector("#theme-toggle");

const themeIcon =
    document.querySelector("#theme-icon");

const backToTop =
    document.querySelector(".back-to-top");

const contactForm =
    document.querySelector("#contact-form");


/* =========================================================
   2. GET NAVBAR HEIGHT
========================================================= */

function getNavbarHeight() {

    if (!navbar) {
        return 0;
    }

    return navbar.offsetHeight;
}


/* =========================================================
   3. MOBILE MENU
========================================================= */

function openMobileMenu() {

    if (!navLinksContainer) {
        return;
    }

    navLinksContainer.classList.add("mobile-open");

    if (mobileMenuBtn) {

        mobileMenuBtn.classList.add("active");

        mobileMenuBtn.setAttribute(
            "aria-expanded",
            "true"
        );

        mobileMenuBtn.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        const icon =
            mobileMenuBtn.querySelector("i");

        if (icon) {

            icon.classList.remove(
                "fa-bars"
            );

            icon.classList.add(
                "fa-xmark"
            );

        }
    }
}


function closeMobileMenu() {

    if (!navLinksContainer) {
        return;
    }

    navLinksContainer.classList.remove("mobile-open");

    if (mobileMenuBtn) {

        mobileMenuBtn.classList.remove("active");

        mobileMenuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileMenuBtn.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        const icon =
            mobileMenuBtn.querySelector("i");

        if (icon) {

            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );

        }
    }
}


function toggleMobileMenu() {

    if (!navLinksContainer) {
        return;
    }

    const menuIsOpen =
        navLinksContainer.classList.contains(
            "mobile-open"
        );

    if (menuIsOpen) {

        closeMobileMenu();

    } else {

        openMobileMenu();

    }
}


/* =========================================================
   4. MOBILE MENU BUTTON CLICK
========================================================= */

if (mobileMenuBtn) {

    mobileMenuBtn.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();

            toggleMobileMenu();

        }
    );

}


/* =========================================================
   5. SET ACTIVE NAVIGATION LINK
========================================================= */

function setActiveLink(sectionId) {

    navLinks.forEach(link => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (
            href ===
            `#${sectionId}`
        ) {

            link.classList.add("active");

        }

    });

}


/* =========================================================
   6. NAVIGATION LINK CLICK
========================================================= */

navLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                !targetId.startsWith("#")
            ) {

                return;

            }


            const targetSection =
                document.querySelector(
                    targetId
                );


            if (!targetSection) {
                return;
            }


            event.preventDefault();


            /* -----------------------------------------
               Set active link immediately
            ----------------------------------------- */

            const sectionId =
                targetId.substring(1);

            setActiveLink(sectionId);


            /* -----------------------------------------
               Calculate scroll position
            ----------------------------------------- */

            const navbarHeight =
                getNavbarHeight();

            const extraSpace = 20;

            const targetPosition =
                targetSection.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                extraSpace;


            /* -----------------------------------------
               Smooth scroll
            ----------------------------------------- */

            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });


            /* -----------------------------------------
               Close mobile menu
            ----------------------------------------- */

            closeMobileMenu();

        }
    );

});


/* =========================================================
   7. ACTIVE NAVIGATION WHILE SCROLLING
========================================================= */

function updateActiveSection() {

    let currentSection = "";

    const navbarHeight =
        getNavbarHeight();


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >=
            sectionTop -
            navbarHeight -
            150
        ) {

            currentSection =
                section.id;

        }

    });


    /* -----------------------------------------
       Home at very top
    ----------------------------------------- */

    if (window.scrollY < 100) {

        currentSection = "home";

    }


    if (currentSection) {

        setActiveLink(
            currentSection
        );

    }

}


/* =========================================================
   8. SCROLL EVENT
========================================================= */

window.addEventListener(
    "scroll",
    updateActiveSection
);


/* =========================================================
   9. INITIAL ACTIVE LINK
========================================================= */

window.addEventListener(
    "load",
    () => {

        updateActiveSection();

    }
);


/* =========================================================
   10. CLOSE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            !navLinksContainer ||
            !mobileMenuBtn
        ) {

            return;

        }


        const clickedInsideMenu =
            navLinksContainer.contains(
                event.target
            );

        const clickedMenuButton =
            mobileMenuBtn.contains(
                event.target
            );


        if (
            !clickedInsideMenu &&
            !clickedMenuButton
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   11. CLOSE MOBILE MENU ON DESKTOP
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (window.innerWidth > 768) {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   12. DARK / LIGHT MODE
========================================================= */

const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.body.classList.add(
        "dark-mode"
    );

} else {

    document.body.classList.remove(
        "dark-mode"
    );

}


/* =========================================================
   13. UPDATE THEME ICON
========================================================= */

function updateThemeIcon() {

    if (!themeIcon) {
        return;
    }


    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    /*
       Font Awesome icon
    */

    if (
        themeIcon.tagName === "I"
    ) {

        themeIcon.classList.remove(
            "fa-sun",
            "fa-moon"
        );

        themeIcon.classList.add(
            isDark
                ? "fa-sun"
                : "fa-moon"
        );

        return;

    }


    /*
       If icon is inside another element
    */

    const icon =
        themeIcon.querySelector("i");


    if (icon) {

        icon.classList.remove(
            "fa-sun",
            "fa-moon"
        );

        icon.classList.add(
            isDark
                ? "fa-sun"
                : "fa-moon"
        );

        return;

    }


    /*
       Text fallback
    */

    themeIcon.textContent =
        isDark
            ? "☀"
            : "☾";

}


/* =========================================================
   14. INITIAL THEME ICON
========================================================= */

updateThemeIcon();


/* =========================================================
   15. THEME TOGGLE
========================================================= */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        event => {

            event.preventDefault();


            /* Toggle dark mode */

            document.body.classList.toggle(
                "dark-mode"
            );


            /* Check current mode */

            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );


            /* Update icon */

            updateThemeIcon();


            /* Save preference */

            localStorage.setItem(
                "theme",
                isDark
                    ? "dark"
                    : "light"
            );

        }
    );

}


/* =========================================================
   16. BACK TO TOP
========================================================= */

if (backToTop) {

    backToTop.addEventListener(
        "click",
        event => {

            event.preventDefault();


            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   17. SHOW / HIDE BACK TO TOP
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        if (!backToTop) {
            return;
        }


        if (window.scrollY > 500) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================================
   18. HIRE ME BUTTON
========================================================= */

const hireButtons =
    document.querySelectorAll(
        ".hire-btn"
    );


hireButtons.forEach(button => {

    button.addEventListener(
        "click",
        event => {

            const href =
                button.getAttribute("href");


            if (
                !href ||
                !href.startsWith("#")
            ) {

                return;

            }


            const target =
                document.querySelector(
                    href
                );


            if (!target) {
                return;
            }


            event.preventDefault();


            const navbarHeight =
                getNavbarHeight();

            const extraSpace = 20;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                extraSpace;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });


            closeMobileMenu();

        }
    );

});


/* =========================================================
   19. CONTACT FORM
========================================================= */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.querySelector(
                    "#name"
                )?.value.trim();


            const email =
                document.querySelector(
                    "#email"
                )?.value.trim();


            const message =
                document.querySelector(
                    "#message"
                )?.value.trim();


            /* -----------------------------------------
               Validation
            ----------------------------------------- */

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


            /* -----------------------------------------
               Email subject
            ----------------------------------------- */

            const subject =
                encodeURIComponent(
                    `Portfolio Contact from ${name}`
                );


            /* -----------------------------------------
               Email body
            ----------------------------------------- */

            const body =
                encodeURIComponent(

                    `Name: ${name}\n\n` +

                    `Email: ${email}\n\n` +

                    `Message:\n${message}`

                );


            /* -----------------------------------------
               Open email
            ----------------------------------------- */

            window.location.href =
                `mailto:venkatasai.yallanti@gmail.com` +
                `?subject=${subject}` +
                `&body=${body}`;

        }
    );

}


/* =========================================================
   20. SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(

        ".about-card, " +
        ".education-item, " +
        ".experience-card, " +
        ".project-card, " +
        ".contact-info, " +
        ".contact-form-wrapper, " +
        ".skill-card"

    );


/* =========================================================
   21. INTERSECTION OBSERVER
========================================================= */

if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );


                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }

        );


    revealElements.forEach(
        element => {

            element.classList.add(
                "reveal"
            );


            revealObserver.observe(
                element
            );

        }
    );

} else {

    /*
       Fallback for older browsers
    */

    revealElements.forEach(
        element => {

            element.classList.add(
                "show"
            );

        }
    );

}


/* =========================================================
   22. CURRENT YEAR
========================================================= */

const currentYear =
    document.querySelector(
        "#current-year"
    );


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   23. INITIALIZE
========================================================= */

window.addEventListener(
    "load",
    () => {

        closeMobileMenu();

        updateThemeIcon();

        updateActiveSection();

    }
);



/* =========================================================
   END OF SCRIPT
========================================================= */
