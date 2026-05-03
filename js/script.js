// js/main.js
document.addEventListener("DOMContentLoaded", function () {
  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();
  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Check for saved theme
  const currentTheme = localStorage.getItem("theme") || "light";
  if (currentTheme === "dark") {
    body.setAttribute("data-theme", "dark");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener("click", () => {
    if (body.getAttribute("data-theme") === "dark") {
      body.setAttribute("data-theme", "light");
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem("theme", "light");
      showToast("تم تفعيل الوضع الفاتح", "success");
    } else {
      body.setAttribute("data-theme", "dark");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem("theme", "dark");
      showToast("تم تفعيل الوضع الداكن", "success");
    }
  });
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  mobileMenuBtn.addEventListener("click", () => {
    const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
    mobileMenuBtn.setAttribute("aria-expanded", !isExpanded);
    navMenu.classList.toggle("active");
  });


  // Gallery Carousel
  const track = document.querySelector(".carousel-track");
  if (track) {
    document.querySelector(".carousel-prev").addEventListener("click", () => {
      track.scrollBy({ left: -320, behavior: "smooth" });
    });
    document.querySelector(".carousel-next").addEventListener("click", () => {
      track.scrollBy({ left: 320, behavior: "smooth" });
    });
  }
  // Contact Form Validation
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      if (!name || !email || !message) {
        showToast("يرجى ملء جميع الحقول", "error");
        return;
      }

      if (!validateEmail(email)) {
        showToast("يرجى إدخال بريد إلكتروني صحيح", "error");
        return;
      }

      // Simulate form submission
      setTimeout(() => {
        showToast("تم إرسال رسالتك بنجاح!", "success");
        contactForm.reset();
      }, 1000);
    });
  }

  function validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  // Toast Notification Function
  function showToast(message, type) {
    // Create toast container if not exists
    let toastContainer = document.querySelector(".toast-container");
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.className = "toast-container";
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);

    // Show the toast
    setTimeout(() => {
      toast.classList.add("show");
    }, 100);

    // Hide after 3 seconds
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }

  // Initialize Map
  function initMap() {
    if (document.getElementById("map")) {
      const map = L.map("map").setView([12.8, 45.0], 8); // Center on Yemen

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add markers for project locations
      const projects = [
        { name: "تمكين الشباب", coords: [12.8, 44.9] },
        { name: "دعم الصيادين", coords: [13.0, 45.2] },
        { name: "الأمن الغذائي", coords: [14.5, 44.2] },
        { name: "الاستجابة الصحية", coords: [13.5, 44.0] },
      ];

      projects.forEach((project) => {
        L.marker(project.coords).addTo(map).bindPopup(project.name);
      });
    }

    // Initialize contact map
    if (document.getElementById("contact-map")) {
      const contactMap = L.map("contact-map").setView([12.8, 45.0], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(contactMap);

      // Add marker for organization location
      L.marker([12.8, 45.0])
        .addTo(contactMap)
        .bindPopup("مقر المؤسسة")
        .openPopup();
    }
  }

  initMap();

  // Intersection Observer for animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
  });
});
