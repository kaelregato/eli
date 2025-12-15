// DOM Elements
const mobileMenu = document.getElementById("mobile-menu");
const navMenu = document.querySelector(".nav-menu");
const backToTopBtn = document.getElementById("backToTop");
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");
const skillProgressBars = document.querySelectorAll(".skill-progress");
const contactForm = document.getElementById("contactForm");

//send email

function sendEmail() {
  let params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  emailjs
    .send("service_z5tg1xj", "template_j6g1wnr", params)
    .then(function (res) {
      alert("Success! " + res.status);
    });
}

//Project Links
const projects = {
  Levites: {
    demoLink: "https://levites.unaux.com/?i=1",
    githubLink: "https://github.com/kaelregato/vercel",
  },
  Portfolio: {
    demoLink: "https://kaelregato.github.io/portfolio/",
    githubLink: "https://github.com/kaelregato/portfolio",
  },
  Shopify: {
    demoLink: "https://drew-shop-9809.myshopify.com/",
    // githubLink: "https://github.com/user/project3",
  },
  Nobatu: {
    demoLink: "https://kaelregato.github.io/Nobatu/",
    githubLink: "https://github.com/kaelregato/Nobatu",
  },
};

// Mobile Menu Toggle with Enhanced Animation
mobileMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  navMenu.classList.toggle("active");

  // Add/remove body overflow when menu is open/closed
  if (navMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.style.overflow = "";
  });
});

// Back to Top Button with Enhanced Scroll
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (scrollY > 500) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }

  // Navbar effect on scroll
  const navbar = document.querySelector(".navbar");
  if (scrollY > 100) {
    navbar.style.background = "rgba(11, 12, 16, 0.95)";
    navbar.style.backdropFilter = "blur(15px)";
    navbar.style.borderBottomColor = "rgba(102, 252, 241, 0.2)";
  } else {
    navbar.style.background = "rgba(11, 12, 16, 0.9)";
    navbar.style.backdropFilter = "blur(10px)";
    navbar.style.borderBottomColor = "rgba(102, 252, 241, 0.1)";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Portfolio Filtering with Enhanced Animation
filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
      btn.style.transform = "scale(1)";
    });

    // Add active class to clicked button
    this.classList.add("active");
    this.style.transform = "scale(1.05)";

    const filterValue = this.getAttribute("data-filter");

    // Filter portfolio items with enhanced animation
    portfolioItems.forEach((item, index) => {
      setTimeout(() => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
        ) {
          item.style.opacity = "0";
          item.style.transform = "translateY(20px)";
          item.style.display = "block";

          setTimeout(() => {
            item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, 10);
        } else {
          item.style.opacity = "0";
          item.style.transform = "translateY(20px)";

          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      }, index * 50); // Staggered animation
    });
  });
});

// Animate skill bars with enhanced effects
function animateSkillBars() {
  skillProgressBars.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    const elementPosition = bar.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    if (elementPosition < screenPosition) {
      bar.style.width = width + "%";
      bar.parentElement.style.boxShadow = "0 0 15px rgba(102, 252, 241, 0.3)";
    }
  });
}

window.addEventListener("scroll", animateSkillBars);

// Form submission with enhanced feedback
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Form validation
  if (!name || !email || !subject || !message) {
    showNotification("Please fill in all fields", "error");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showNotification("Please enter a valid email address", "error");
    return;
  }

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  // Button loading state
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.7";

  // Simulate API call with enhanced animation
  setTimeout(() => {
    // Success animation
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
    submitBtn.style.background = "linear-gradient(135deg, #10b981, #059669)";

    // Show success notification
    showNotification(
      `Thank you, ${name}! Your message has been sent. I'll get back to you soon.`,
      "success"
    );

    // Reset form with animation
    setTimeout(() => {
      contactForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
      submitBtn.style.background = "";
    }, 2000);
  }, 2000);
});

// Notification system
function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <i class="fas fa-${
          type === "success" ? "check-circle" : "exclamation-circle"
        }"></i>
        <span>${message}</span>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "linear-gradient(135deg, #10b981, #059669)"
            : "linear-gradient(135deg, #ef4444, #dc2626)"
        };
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(150%);
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 400px;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 10);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(150%)";
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 5000);
}

// Smooth scrolling for anchor links with offset
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navHeight = document.querySelector(".navbar").offsetHeight;
      const targetPosition = targetElement.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (navMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
      }
    }
  });
});

// Add hover effect to timeline items
document.querySelectorAll(".timeline-item").forEach((item) => {
  const content = item.querySelector(".timeline-content");

  item.addEventListener("mouseenter", () => {
    content.style.transform = "translateX(15px)";
    content.style.boxShadow = "0 20px 60px rgba(102, 252, 241, 0.25)";
  });

  item.addEventListener("mouseleave", () => {
    content.style.transform = "translateX(10px)";
    content.style.boxShadow = "var(--shadow-lg)";
  });
});

// Add click effect to portfolio cards
document.querySelectorAll(".portfolio-card").forEach((card) => {
  card.addEventListener("click", function () {
    const title = this.querySelector("h3").textContent;
    const projectData = projects[title];

    if (!projectData) return; //Exit if no data found

    // Create modal for project details
    const modal = document.createElement("div");
    modal.className = "project-modal";
    modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close"><i class="fas fa-times"></i></button>
                <h2>${title}</h2>
                <p>This is a detailed view of the "${title}" project. In a real portfolio, this would include:</p>
                <ul>
                    <li>Project overview and objectives</li>
                    <li>Technologies used</li>
                    <li>Development process</li>
                    <li>Challenges and solutions</li>
                    <li>Live demo link</li>
                </ul>
                <div class="modal-actions">
                    <a href="${projectData.demoLink}" target="_blank" class="btn btn-primary">View Live Demo</a>
                    <a href="${projectData.githubLink}" target="_blank" class="btn btn-secondary">GitHub Repository</a>
                </div>
            </div>
        `;

    // Add modal styles
    modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(11, 12, 16, 0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

    const modalContent = modal.querySelector(".modal-content");
    modalContent.style.cssText = `
            background: var(--dark-card);
            padding: 40px;
            border-radius: var(--radius-lg);
            border: 1px solid var(--accent-primary);
            max-width: 600px;
            width: 90%;
            position: relative;
            transform: translateY(30px);
            transition: transform 0.3s ease;
        `;

    document.body.appendChild(modal);

    // Trigger animations
    setTimeout(() => {
      modal.style.opacity = "1";
      modalContent.style.transform = "translateY(0)";
    }, 10);

    // Close modal
    modal.querySelector(".modal-close").addEventListener("click", () => {
      modal.style.opacity = "0";
      modalContent.style.transform = "translateY(30px)";
      setTimeout(() => modal.remove(), 300);
    });

    // Close on background click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.opacity = "0";
        modalContent.style.transform = "translateY(30px)";
        setTimeout(() => modal.remove(), 300);
      }
    });
  });
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  // Trigger skill bar animation if already in view
  animateSkillBars();

  // Add loading animation to hero image
  const heroImage = document.querySelector(".image-container");
  if (heroImage) {
    setTimeout(() => {
      heroImage.style.animation = "float 6s ease-in-out infinite";
    }, 500);
  }

  // Add tooltips to social links
  const socialLinks = document.querySelectorAll(".social-links a");
  const platformNames = {
    linkedin: "LinkedIn Profile",
    github: "GitHub Repositories",
    dribbble: "Dribbble Portfolio",
    behance: "Behance Portfolio",
    twitter: "Twitter Profile",
  };

  socialLinks.forEach((link) => {
    const iconClass = Array.from(link.querySelector("i").classList).find(
      (cls) => cls.includes("fa-")
    );

    if (iconClass) {
      const platform = iconClass.replace("fa-", "");
      if (platformNames[platform]) {
        link.setAttribute("title", platformNames[platform]);
        link.setAttribute("aria-label", platformNames[platform]);
      }
    }
  });

  // Add typing effect to hero subtitle
  const heroSubtitle = document.querySelector(".hero-subtitle");

  if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = "";

    let i = 0;

    const typeWriter = () => {
      if (i < text.length) {
        heroSubtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        // Pause, then reset for next loop
        setTimeout(() => {
          heroSubtitle.textContent = "";
          i = 0;
          typeWriter();
        }, 1000); // delay before repeating
      }
    };

    setTimeout(typeWriter, 1000);
  }
});
