// ============================
// 0) Helper functions
// ============================
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


// ============================
// 1) Smooth Scroll (Tüm anchor linklerde)
// ============================
$$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = $(this.getAttribute("href"));
        if (!target) return;

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});


// ============================
// 2) Header fade-in + Page intro animation
// ============================
window.addEventListener("load", () => {
    const header = $("header");
    header.style.opacity = 0;
    setTimeout(() => {
        header.style.transition = "1.5s ease";
        header.style.opacity = 1;
    }, 200);
});


// ============================
// 3) Typing Effect (Gelişmiş sürüm)
// ============================
const typingEl = $(".job");
const typingTexts = [
    "Frontend Developer",
    "UI Designer",
    "React Developer",
    "Freelancer",
    "Web Designer"
];

let textIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < typingTexts[textIndex].length) {
        typingEl.textContent += typingTexts[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 70);
    } else {
        setTimeout(deleteText, 1500);
    }
}

function deleteText() {
    if (charIndex > 0) {
        typingEl.textContent = typingTexts[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(deleteText, 50);
    } else {
        textIndex = (textIndex + 1) % typingTexts.length;
        setTimeout(type, 200);
    }
}

typingEl.textContent = "";
type();


// ============================
// 4) Project card hover animations
// ============================
$$(".project-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-6px) scale(1.03)";
        card.style.transition = "0.35s";
        card.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
        card.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
    });
});


// ============================
// 5) Scroll Reveal Animation (Soft entry)
// ============================
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.25 });

$$("section, .project-card").forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(40px)";
    el.style.transition = "1s ease";
    revealObserver.observe(el);
});


// ============================
// 6) Dark Mode (Otomatik kayıt + buton)
// ============================
let darkMode = localStorage.getItem("darkMode");

const enableDark = () => {
    document.body.classList.add("dark");
    localStorage.setItem("darkMode", "enabled");
    darkBtn.textContent = "☀️";
};

const disableDark = () => {
    document.body.classList.remove("dark");
    localStorage.setItem("darkMode", "disabled");
    darkBtn.textContent = "🌙";
};

// Dark Mode button
const darkBtn = document.createElement("button");
darkBtn.classList.add("dark-toggle-btn");
darkBtn.textContent = darkMode === "enabled" ? "☀️" : "🌙";
document.body.appendChild(darkBtn);

// Apply saved theme
if (darkMode === "enabled") enableDark();

darkBtn.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode");
    darkMode !== "enabled" ? enableDark() : disableDark();
});


// ============================
// 7) Sticky Header (Sayfa kayınca yapışma)
// ============================
const headerEl = $("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 150) {
        headerEl.classList.add("sticky");
    } else {
        headerEl.classList.remove("sticky");
    }
});


// ============================
// 8) Back to Top Button
// ============================
const topBtn = document.createElement("button");
topBtn.classList.add("back-to-top");
topBtn.textContent = "▲";
document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }
});

topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


// ============================
// 9) Parallax Effect (Header arka plan hareketi)
// ============================
window.addEventListener("mousemove", (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.002;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.002;

    headerEl.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
});
