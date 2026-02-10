// DOM Elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const projectModal = document.getElementById('projectModal');
const projectModalClose = document.getElementById('projectModalClose');
const viewProjectButtons = document.querySelectorAll('.view-project');
const projectCards = document.querySelectorAll('.project-card');
const navLinkItems = document.querySelectorAll('.nav-link');
const progressFills = document.querySelectorAll('.progress-fill');

// Project Data (simplified version)
const projects = [
  {
    id: 0,
    title: "Pawfect Care",
    category: "Pets & Animals",
    description: "Developed Pawfect Care, a comprehensive mobile app designed to provide pet owners with expert guidance and essential information for the proper care of their cats and dogs. This app features curated content, practical tips, and interactive tools to help users provide the best possible care for their furry companions.",
    features: [
      "User-friendly interface with intuitive navigation and search functionality.",
      "Regular content updates with the latest research and best practices.",
      "Personalized recommendations based on pet type, breed, age, and health conditions.",
    ],
    image: "assets/pawfect.jpg"
  },
  {
    id: 1,
    title: "MugMate",
    category: "Coffee Shop",
    description: "Crafted a visually stunning and immersive brand website for a coffee mug company, designed to captivate customers and elevate their online shopping experience. The site leverages modern animations, interactive product showcases, and a focus on visual storytelling to communicate the brand's unique identity and passion for coffee culture.",
    features: [
      "Responsive design optimized for mobile",
      "Integrated contact and order forms",
      "Social media integration",
    ],
    image: "assets/mugmate.jpg"
  },
  {
    id: 2,
    title: "Be Polished",
    category: "SPA Business",
    description: "Developed a cutting-edge Single Page Application (SPA) business website, engineered for optimal performance, engagement, and lead generation. This modern, SEO-optimized platform provides a seamless user experience, establishing a strong online presence for the business.",
    features: [
      "Dynamic, multi-page experience powered by SPA architecture.",
      "Interactive contact form with client-side validation and seamless email integration.",
      "Comprehensive SEO strategy implemented through optimized content and structured data.",
    ],
    image: "assets/website.png"
  }
];

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  
  if (document.body.classList.contains('dark-theme')) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
  themeIcon.classList.remove('fa-moon');
  themeIcon.classList.add('fa-sun');
}

// Back to Top Button
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('active');
  } else {
    backToTop.classList.remove('active');
  }
  
  // Update active nav link based on scroll position
  updateActiveNavLink();
});

// Contact Form Submission
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const subject = contactForm.querySelector('input[placeholder="Subject"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // In a real application, you would send this data to a server
    console.log({ name, email, subject, message });
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
  });
}

// Open Project Modal
function openProjectModal(projectId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;
  
  // Populate modal with project data
  document.getElementById('projectModalTitle').textContent = project.title;
  document.getElementById('projectModalCategory').textContent = project.category;
  document.getElementById('projectModalDescription').textContent = project.description;
  document.getElementById('projectModalImage').src = project.image;
  document.getElementById('projectModalImage').alt = project.title;
  
  // Populate features
  const featuresList = document.getElementById('projectModalFeatures');
  featuresList.innerHTML = '';
  project.features.forEach(feature => {
    const li = document.createElement('li');
    li.textContent = feature;
    featuresList.appendChild(li);
  });
  
  // Show modal
  projectModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close Project Modal
projectModalClose.addEventListener('click', () => {
  projectModal.classList.remove('active');
  document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
projectModal.addEventListener('click', e => {
  if (e.target === projectModal) {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Add click event to project cards and view buttons
projectCards.forEach(card => {
  card.addEventListener('click', (e) => {
    // Don't open modal if clicking on the view button (handled separately)
    if (!e.target.closest('.view-project')) {
      const projectId = parseInt(card.getAttribute('data-project'));
      openProjectModal(projectId);
    }
  });
});

viewProjectButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent card click event
    const projectId = parseInt(button.getAttribute('data-project'));
    openProjectModal(projectId);
  });
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const scrollPos = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Animate skill bars when in viewport
function animateSkills() {
  progressFills.forEach(bar => {
    const level = bar.getAttribute('data-level');
    bar.style.width = `${level}%`;
  });
}

// Intersection Observer for skill animation
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const observerOptions = {
    threshold: 0.3
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
      }
    });
  }, observerOptions);

  observer.observe(skillsSection);
}

// Initialize skill bars with 0% width
progressFills.forEach(bar => {
  bar.style.width = '0%';
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Initialize scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.skill-card, .project-card, .certificate-card, .contact-card, .resume-content');
  
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeInObserver.observe(element);
  });
}

// Add keyboard navigation for modals
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (projectModal.classList.contains('active')) {
      projectModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
});

// Resume Image Preview Lightbox
const resumePreview = document.querySelector('.resume-preview img');
const resumeLightbox = document.createElement('div');
resumeLightbox.className = 'resume-lightbox';
resumeLightbox.innerHTML = `
    <button class="resume-lightbox-close">&times;</button>
    <img src="" alt="Resume Full View">
`;

// Add lightbox to body
document.body.appendChild(resumeLightbox);

// Open lightbox when preview image is clicked
if (resumePreview) {
    resumePreview.addEventListener('click', () => {
        const imgSrc = resumePreview.src;
        resumeLightbox.querySelector('img').src = imgSrc;
        resumeLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close lightbox when X is clicked
resumeLightbox.querySelector('.resume-lightbox-close').addEventListener('click', () => {
    resumeLightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close lightbox when clicking outside the image
resumeLightbox.addEventListener('click', (e) => {
    if (e.target === resumeLightbox) {
        resumeLightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeLightbox.classList.contains('active')) {
        resumeLightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});