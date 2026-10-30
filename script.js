
/* =========================================
   NAVIGATION AND MOBILE MENU
========================================= */

const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

const activePage = () => {
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    sections.forEach(section => {
        section.classList.remove('active');
    });

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/* =========================================
   SECTION NAVIGATION
========================================= */

navLinks.forEach((link, idx) => {
    link.addEventListener('click', () => {
        if (!link.classList.contains('active')) {
            activePage();

            link.classList.add('active');

            setTimeout(() => {
                sections[idx].classList.add('active');
            }, 500);
        }
    });
});

/* =========================================
   LOGO NAVIGATION - HOME
========================================= */

logoLink.addEventListener('click', () => {
    if (!navLinks[0].classList.contains('active')) {
        activePage();

        navLinks[0].classList.add('active');

        setTimeout(() => {
            sections[0].classList.add('active');
        }, 500);
    }
});

/* =========================================
   RESUME SECTION TABS
========================================= */

const resumeBtns = document.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-detail');

resumeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {

        resumeBtns.forEach(button => {
            button.classList.remove('active');
        });

        btn.classList.add('active');

        resumeDetails.forEach(detail => {
            detail.classList.remove('active');
        });

        if (resumeDetails[idx]) {
            resumeDetails[idx].classList.add('active');
        }
    });
});

/* =========================================
   PORTFOLIO PROJECT CAROUSEL
========================================= */

const arrowRight = document.querySelector(
    '.portfolio-box .navigation .arrow-right'
);

const arrowLeft = document.querySelector(
    '.portfolio-box .navigation .arrow-left'
);

const portfolioDetails = document.querySelectorAll(
    '.portfolio-detail'
);

const portfolioImages = document.querySelectorAll(
    '.portfolio-carousel .img-slide .img-item'
);

const imgSlide = document.querySelector(
    '.portfolio-carousel .img-slide'
);

let index = 0;

// Automatically detect the number of projects
const totalProjects = Math.min(
    portfolioDetails.length,
    portfolioImages.length
);

/* =========================================
   UPDATE ACTIVE PORTFOLIO PROJECT
========================================= */

const activePortfolio = () => {

    if (totalProjects === 0 || !imgSlide) {
        return;
    }

    // Move carousel to the selected project
    imgSlide.style.transform =
        `translateX(calc(${index * -100}% - ${index * 2}rem))`;

    // Update active project description
    portfolioDetails.forEach((detail, idx) => {
        detail.classList.toggle('active', idx === index);
    });

    // Disable previous arrow at first project
    if (arrowLeft) {
        arrowLeft.classList.toggle(
            'disabled',
            index === 0
        );
        arrowLeft.disabled = index === 0;
    }

    // Disable next arrow at last project
    if (arrowRight) {
        arrowRight.classList.toggle(
            'disabled',
            index === totalProjects - 1
        );
        arrowRight.disabled = index === totalProjects - 1;
    }
};

/* =========================================
   NEXT PROJECT
========================================= */

if (arrowRight) {
    arrowRight.addEventListener('click', () => {

        if (index < totalProjects - 1) {
            index++;
            activePortfolio();
        }

    });
}

/* =========================================
   PREVIOUS PROJECT
========================================= */

if (arrowLeft) {
    arrowLeft.addEventListener('click', () => {

        if (index > 0) {
            index--;
            activePortfolio();
        }

    });
}

/* =========================================
   INITIALIZE PORTFOLIO
========================================= */

if (totalProjects > 0) {
    activePortfolio();
}
