let navbar = document.querySelector(".navbar");
let footMobile = document.querySelector(".footer-mobile");
window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
        navbar.classList.add("nav-on-scroll");
    } else {
        navbar.classList.remove("nav-on-scroll");
    }
});