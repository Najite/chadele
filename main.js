// Chadele HR Advisory - Full Page Motion Choreography (GSAP & Emil Kowalski Principles)
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // =========================================================================
  // 1. FULL PAGE SCROLL CHOREOGRAPHY (GSAP + ScrollTrigger)
  // =========================================================================
  if (!prefersReducedMotion) {
    // A. Navbar Entrance & Morph on Scroll
    const navbar = document.querySelector('.navbar-wrapper');
    gsap.from('.navbar-inner', {
      y: -24,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out'
    });

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    });

    // B. Hero Staged Entrance Timeline
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
      .from('.hero-title', {
        y: 40,
        opacity: 0,
        duration: 0.85,
        clearProps: 'transform,opacity'
      })
      .from('.hero-description', {
        y: 24,
        opacity: 0,
        duration: 0.65,
        clearProps: 'transform,opacity'
      }, '-=0.45')
      .from('.hero-cta-group .btn-pill', {
        y: 18,
        opacity: 0,
        stagger: 0.12,
        duration: 0.55,
        clearProps: 'transform,opacity'
      }, '-=0.4')
      .from('.hero-metrics > div', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.55,
        clearProps: 'transform,opacity'
      }, '-=0.35')
      .from('.hero-section .cutout-wrapper', {
        scale: 0.94,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
        clearProps: 'opacity'
      }, '-=0.8')
      .from('.hero-section .cutout-contour-shadow', {
        x: 14,
        y: -14,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        clearProps: 'opacity'
      }, '-=0.6');

    // C. Social Proof / Trust Strip
    gsap.from('.trust-inner', {
      scrollTrigger: {
        trigger: '.trust-strip',
        start: 'top 90%'
      },
      y: 25,
      opacity: 0,
      duration: 0.65,
      ease: 'power2.out',
      clearProps: 'transform,opacity'
    });

    // D. About Our Firm Section
    gsap.from('#about .cutout-wrapper', {
      scrollTrigger: {
        trigger: '#about',
        start: 'top 82%'
      },
      x: -35,
      opacity: 0,
      duration: 0.85,
      ease: 'power2.out',
      clearProps: 'transform,opacity'
    });

    gsap.from('#about .about-content > *', {
      scrollTrigger: {
        trigger: '#about',
        start: 'top 82%'
      },
      y: 28,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power3.out',
      clearProps: 'transform,opacity'
    });

    // E. Practice Areas / Services Header & Cards Stagger
    gsap.from('#services .section-header-center > *', {
      scrollTrigger: {
        trigger: '#services',
        start: 'top 85%'
      },
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power3.out',
      clearProps: 'transform,opacity'
    });

    gsap.from('.service-card', {
      scrollTrigger: {
        trigger: '#services-grid',
        start: 'top 85%'
      },
      y: 45,
      opacity: 0,
      stagger: 0.1,
      duration: 0.65,
      ease: 'power3.out',
      clearProps: 'transform,opacity'
    });

    // F. Interactive Calculator Section
    gsap.from('.calc-wrapper', {
      scrollTrigger: {
        trigger: '#calculator',
        start: 'top 82%'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      clearProps: 'transform,opacity'
    });

    // G. Why Choose Us Section
    gsap.from('#why-us .why-card-title, #why-us .category-badge, #why-us .section-title, #why-us .section-subtitle', {
      scrollTrigger: {
        trigger: '#why-us',
        start: 'top 82%'
      },
      y: 25,
      opacity: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power2.out',
      clearProps: 'transform,opacity'
    });

    gsap.from('.why-pill-card', {
      scrollTrigger: {
        trigger: '.why-card-grid',
        start: 'top 85%'
      },
      y: 30,
      opacity: 0,
      stagger: 0.08,
      duration: 0.55,
      ease: 'power3.out',
      clearProps: 'transform,opacity'
    });

    gsap.from('#why-us .cutout-wrapper', {
      scrollTrigger: {
        trigger: '#why-us',
        start: 'top 80%'
      },
      x: 35,
      opacity: 0,
      duration: 0.85,
      ease: 'power2.out',
      clearProps: 'transform,opacity'
    });

    // H. Case Studies Cards Stagger
    gsap.from('.case-card', {
      scrollTrigger: {
        trigger: '.cases-grid',
        start: 'top 85%'
      },
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 0.65,
      ease: 'power3.out',
      clearProps: 'transform,opacity'
    });

    // I. Testimonial Cards Stagger
    gsap.from('.testimonial-card', {
      scrollTrigger: {
        trigger: '.testimonials-grid',
        start: 'top 85%'
      },
      y: 35,
      opacity: 0,
      stagger: 0.12,
      duration: 0.6,
      ease: 'power3.out',
      clearProps: 'transform,opacity'
    });

    // J. FAQ Items Stagger
    gsap.from('.faq-item', {
      scrollTrigger: {
        trigger: '.faq-container',
        start: 'top 85%'
      },
      y: 25,
      opacity: 0,
      stagger: 0.09,
      duration: 0.5,
      ease: 'power2.out',
      clearProps: 'transform,opacity'
    });

    // K. CTA Bottom Banner
    gsap.from('.cta-banner-wrapper', {
      scrollTrigger: {
        trigger: '.cta-banner-wrapper',
        start: 'top 85%'
      },
      scale: 0.96,
      y: 35,
      opacity: 0,
      duration: 0.75,
      ease: 'power3.out',
      clearProps: 'transform,opacity'
    });
  }

  // =========================================================================
  // 2. INTERACTIVE ROI CALCULATOR
  // =========================================================================
  const sliderHeadcount = document.getElementById('slider-headcount');
  const sliderSalary = document.getElementById('slider-salary');
  const sliderTurnover = document.getElementById('slider-turnover');

  const valHeadcount = document.getElementById('val-headcount');
  const valSalary = document.getElementById('val-salary');
  const valTurnover = document.getElementById('val-turnover');

  const statTurnoverCost = document.getElementById('stat-turnover-cost');
  const statSavings = document.getElementById('stat-savings');

  function formatCurrency(num) {
    return '$' + Math.round(num).toLocaleString('en-US');
  }

  function updateCalculator() {
    if (!sliderHeadcount || !sliderSalary || !sliderTurnover) return;
    const headcount = parseInt(sliderHeadcount.value, 10);
    const salary = parseInt(sliderSalary.value, 10);
    const turnoverRate = parseInt(sliderTurnover.value, 10) / 100;

    valHeadcount.textContent = `${headcount.toLocaleString()} employees`;
    valSalary.textContent = formatCurrency(salary);
    valTurnover.textContent = `${sliderTurnover.value}%`;

    // SHRM standard: replacement cost is approx 50% of departed employee's annual wage
    const annualTurnovers = headcount * turnoverRate;
    const turnoverCost = annualTurnovers * (salary * 0.5);
    const savings = turnoverCost * 0.35; // 35% retention improvement

    statTurnoverCost.textContent = formatCurrency(turnoverCost);
    statSavings.textContent = formatCurrency(savings);
  }

  if (sliderHeadcount && sliderSalary && sliderTurnover) {
    sliderHeadcount.addEventListener('input', updateCalculator);
    sliderSalary.addEventListener('input', updateCalculator);
    sliderTurnover.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // =========================================================================
  // 3. PRACTICE AREA DETAILS DATA & ACCESSIBLE MODAL
  // =========================================================================
  const practiceData = {
    policies: {
      category: 'Compliance & Governance',
      title: 'HR Policies And Procedures Advisory',
      desc: 'Our compliance specialists design compliant, culturally aligned employee handbooks, multi-state remote work guidelines, and risk-mitigated employment contracts.',
      deliverables: [
        'Complete 50-State Employee Handbook Audit & Rewrite',
        'FLSA Wage-and-Hour Overtime & Exemption Review',
        'State-Specific Mandatory Leave & Sick Pay Policies',
        'Digital Signature & Acknowledgment Onboarding Workflows'
      ]
    },
    performance: {
      category: 'Productivity & Culture',
      title: 'Performance Management Architecture',
      desc: 'Transform stressful annual reviews into a continuous performance culture. We implement lightweight OKRs, 360-degree feedback loops, and objective merit appraisal tiers.',
      deliverables: [
        'Company-wide OKR and Key Results Cascading Matrices',
        'Competency-Based Career Progression Frameworks',
        'Quarterly 360-Degree Feedback Calibration Guides',
        'Manager Coaching & Constructive Evaluation Training'
      ]
    },
    talent: {
      category: 'Executive Strategy',
      title: 'Talent Acquisition & Executive Search',
      desc: 'Build high-velocity hiring engines with structured scorecard interviewing, candidate pipeline analytics, and an unconditional 12-month candidate replacement warranty.',
      deliverables: [
        'Structured Scorecard Interview Questions & Rubrics',
        'Executive Search with 12-Month Replacement Warranty',
        'Employer Value Proposition (EVP) Brand Overhaul',
        'Applicant Tracking System (ATS) Funnel Optimization'
      ]
    },
    compensation: {
      category: 'Total Rewards Strategy',
      title: 'Compensation & Total Rewards Benchmarking',
      desc: 'Defend your talent from competitor poaching with real-time Radford and Option Impact market salary bands, equity grant models, and transparent career leveling.',
      deliverables: [
        'Radford & Option Impact Industry Benchmark Leveling',
        'Executive Stock Option & Equity Vesting Schedule Modeling',
        'Transparent Base + Bonus Incentive Compensation Tiers',
        'Pay Equity & Multi-State Salary Transparency Audit'
      ]
    },
    relations: {
      category: 'Compliance & Mediation',
      title: 'Employee Relations & Dispute Investigations',
      desc: 'Objective third-party workplace dispute resolutions, confidential harassment or misconduct investigations, and restorative culture interventions.',
      deliverables: [
        'Independent Third-Party Workplace Investigations',
        'Comprehensive Legal-Ready Investigative Report & Findings',
        'EEOC & Regulatory Dispute Representation Support',
        'Restorative Team Mediation & Cultural Reset Sprints'
      ]
    },
    hrtech: {
      category: 'Digital Operations & Analytics',
      title: 'HR Technology Automation & People Analytics',
      desc: 'Modernize legacy systems with turnkey selection, migration, and workflow automation across Workday, Rippling, BambooHR, and Carta.',
      deliverables: [
        'HRIS / HCM Vendor Evaluation & RFP Facilitation',
        'Automated Employee Onboarding & Offboarding Workflows',
        'Real-time Executive Retention & Churn Analytics Dashboards',
        'Payroll, Benefits & 401(k) API Synchronization'
      ]
    }
  };

  const practiceModal = document.getElementById('practice-modal');
  const practiceCloseBtn = document.getElementById('practice-close-btn');
  const practiceModalBack = document.getElementById('practice-modal-back');
  const practiceModalCategory = document.getElementById('practice-modal-category');
  const practiceModalTitle = document.getElementById('practice-modal-title');
  const practiceModalDesc = document.getElementById('practice-modal-desc');
  const practiceModalDeliverables = document.getElementById('practice-modal-deliverables');

  document.querySelectorAll('.open-practice-modal').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceKey = link.getAttribute('data-service');
      const data = practiceData[serviceKey];
      if (data && practiceModal) {
        practiceModalCategory.textContent = data.category;
        practiceModalTitle.textContent = data.title;
        practiceModalDesc.textContent = data.desc;
        practiceModalDeliverables.innerHTML = data.deliverables.map(item => `<li>${item}</li>`).join('');
        practiceModal.classList.add('open');
      }
    });
  });

  if (practiceCloseBtn) {
    practiceCloseBtn.addEventListener('click', () => practiceModal.classList.remove('open'));
  }
  if (practiceModalBack) {
    practiceModalBack.addEventListener('click', () => practiceModal.classList.remove('open'));
  }

  // =========================================================================
  // 4. SERVICES FILTER TABS WITH RE-TRIGGERED ENTRANCE
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      const visibleCards = [];

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          visibleCards.push(card);
        } else {
          card.style.display = 'none';
        }
      });

      if (!prefersReducedMotion && visibleCards.length > 0) {
        gsap.fromTo(visibleCards, 
          { opacity: 0, y: 16 }, 
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out', clearProps: 'transform,opacity' }
        );
      }
    });
  });

  // =========================================================================
  // 5. CONSULTATION & QUOTE REQUEST MODAL
  // =========================================================================
  const consultationModal = document.getElementById('consultation-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalFormContent = document.getElementById('modal-form-content');
  const modalSuccessContent = document.getElementById('modal-success-content');
  const consultationForm = document.getElementById('consultation-form');
  const btnModalDone = document.getElementById('btn-modal-done');

  function openConsultationModal() {
    if (practiceModal) practiceModal.classList.remove('open');
    if (consultationModal) {
      if (modalFormContent) modalFormContent.style.display = 'block';
      if (modalSuccessContent) modalSuccessContent.style.display = 'none';
      consultationModal.classList.add('open');
    }
  }

  function closeConsultationModal() {
    if (consultationModal) consultationModal.classList.remove('open');
  }

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openConsultationModal();
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeConsultationModal);
  }
  if (btnModalDone) {
    btnModalDone.addEventListener('click', closeConsultationModal);
  }

  [consultationModal, practiceModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (consultationModal) consultationModal.classList.remove('open');
      if (practiceModal) practiceModal.classList.remove('open');
    }
  });

  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('btn-submit-consultation');
      if (submitBtn) {
        submitBtn.textContent = 'Submitting Request...';
        submitBtn.style.opacity = '0.7';
      }

      setTimeout(() => {
        if (modalFormContent) modalFormContent.style.display = 'none';
        if (modalSuccessContent) modalSuccessContent.style.display = 'block';
        consultationForm.reset();
        if (submitBtn) {
          submitBtn.textContent = 'Submit Scope Request';
          submitBtn.style.opacity = '1';
        }
      }, 500);
    });
  }

  // =========================================================================
  // 6. FAQ ACCORDION (INTERRUPTIBLE ANIMATION)
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });

  // =========================================================================
  // 7. NEWSLETTER SUBSCRIPTION
  // =========================================================================
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterFeedback = document.getElementById('newsletter-feedback');
  if (newsletterForm && newsletterFeedback) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterFeedback.style.display = 'block';
      newsletterForm.reset();
      setTimeout(() => {
        newsletterFeedback.style.display = 'none';
      }, 4000);
    });
  }

  // =========================================================================
  // 8. ACTIVE NAV LINK HIGHLIGHT & SCROLLSPY
  // =========================================================================
  const sections = document.querySelectorAll('main section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);
      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });
});
