/* Mobile menu */
const mobileToggle = document.getElementById("mobileMenuToggle");
const navMenu = document.getElementById("navMenu");

if (mobileToggle && navMenu) {
  mobileToggle.addEventListener("click", function () {
    navMenu.classList.toggle("open");
    mobileToggle.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  document.querySelectorAll(".nav-link").forEach(function (item) {
    item.addEventListener("click", function () {
      navMenu.classList.remove("open");
      mobileToggle.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });
}

/* Portfolio filtering */
const filterButtons = document.querySelectorAll(".filter-btn");
const items = document.querySelectorAll(".portfolio-item");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const filter = button.getAttribute("data-filter");

    filterButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    items.forEach(function (item) {
      const category = item.getAttribute("data-category");
      item.style.display =
        filter === "all" || filter === category ? "block" : "none";
    });
  });
});

/* === Responsive Testimonials Carousel (Mobile-Safe + Looping) === */
const track = document.querySelector(".testimonial-track");
const cards = track ? Array.from(track.children) : [];
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let currentIndex = 0;

// Helper: Scroll to card smoothly
function scrollToCard(index) {
  if (!cards[index]) return;
  cards[index].scrollIntoView({
    behavior: "smooth",
    inline: "start",
    block: "nearest",
  });
  currentIndex = index;
}

// Next button
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % cards.length;
    scrollToCard(currentIndex);
  });
}

// Prev button
if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    scrollToCard(currentIndex);
  });
}

// Optional: Auto-advance every 6 seconds (uncomment if needed)
/*
setInterval(() => {
  if (nextBtn) nextBtn.click();
}, 6000);
*/
