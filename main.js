// Chadele HR Advisory Nigeria - Mobile-Native & Full-Page Flow Logic
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth <= 768;

  // =========================================================================
  // 1. MOBILE SLIDE-OVER DRAWER NAVIGATION
  // =========================================================================
  const mobileMenuBtn = document.getElementById('btn-mobile-menu');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileDrawerClose = document.getElementById('mobile-drawer-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      mobileMenuBtn?.classList.add('active');
      mobileMenuBtn?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      mobileMenuBtn?.classList.remove('active');
      mobileMenuBtn?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer?.classList.contains('open');
      if (isOpen) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });
  }

  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', closeMobileDrawer);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileDrawer);
  });

  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        closeMobileDrawer();
      }
    });
  }

  // =========================================================================
  // 2. FULL-PAGE SCROLL CHOREOGRAPHY (GSAP + ScrollTrigger)
  // =========================================================================
  if (!prefersReducedMotion) {
    const navbar = document.querySelector('.navbar-wrapper');
    gsap.from('.navbar-inner', {
      y: -20,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    });

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    });

    // Hero Staged Entrance Timeline
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
      .from('.hero-title', {
        y: 35,
        opacity: 0,
        duration: 0.8,
        clearProps: 'transform,opacity'
      })
      .from('.hero-description', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        clearProps: 'transform,opacity'
      }, '-=0.45')
      .from('.hero-cta-group .btn-pill', {
        y: 16,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        clearProps: 'transform,opacity'
      }, '-=0.4')
      .from('.hero-metrics > div', {
        y: 18,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        clearProps: 'transform,opacity'
      }, '-=0.35')
      .from('.hero-section .cutout-wrapper', {
        scale: 0.94,
        opacity: 0,
        duration: 0.85,
        ease: 'power2.out',
        clearProps: 'opacity'
      }, '-=0.7')
      .from('.hero-section .cutout-contour-shadow', {
        x: 12,
        y: -12,
        opacity: 0,
        duration: 0.65,
        ease: 'power2.out',
        clearProps: 'opacity'
      }, '-=0.55');

    // Social Proof / Trust Strip
    gsap.from('.trust-inner', {
      scrollTrigger: {
        trigger: '.trust-strip',
        start: 'top 92%'
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      clearProps: 'transform,opacity'
    });

    // About Our Firm
    gsap.from('#about .cutout-wrapper', {
      scrollTrigger: {
        trigger: '#about',
        start: 'top 85%'
      },
      x: isMobile ? 0 : -30,
      y: isMobile ? 25 : 0,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      clearProps: 'transform,opacity'
    });

    gsap.from('#about .about-content > *', {
      scrollTrigger: {
        trigger: '#about',
        start: 'top 85%'
      },
      y: 25,
      opacity: 0,
      stagger: 0.08,
      duration: 0.65,
      ease: 'power3.out',
      clearProps: 'transform,opacity'
    });

    // Services Cards
    gsap.from('.service-card', {
      scrollTrigger: {
        trigger: '#services-grid',
        start: 'top 88%'
      },
      y: 35,
      opacity: 0,
      stagger: isMobile ? 0.06 : 0.1,
      duration: 0.6,
      ease: 'power3.out',
      clearProps: 'transform,opacity'
    });

    // Interactive Calculator
    gsap.from('.calc-wrapper', {
      scrollTrigger: {
        trigger: '#calculator',
        start: 'top 85%'
      },
      y: 30,
      opacity: 0,
      duration: 0.75,
      ease: 'power2.out',
      clearProps: 'transform,opacity'
    });

    // Why Choose Us
    gsap.from('.why-pill-card', {
      scrollTrigger: {
        trigger: '.why-card-grid',
        start: 'top 88%'
      },
      y: 25,
      opacity: 0,
      stagger: 0.07,
      duration: 0.5,
      ease: 'power2.out',
      clearProps: 'transform,opacity'
    });

    // Case Studies & Testimonials
    gsap.from('.case-card', {
      scrollTrigger: {
        trigger: '.cases-grid',
        start: 'top 88%'
      },
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
      clearProps: 'transform,opacity'
    });

    gsap.from('.testimonial-card', {
      scrollTrigger: {
        trigger: '.testimonials-grid',
        start: 'top 88%'
      },
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
      clearProps: 'transform,opacity'
    });
  }

  // =========================================================================
  // 3. INTERACTIVE ROI CALCULATOR (DUAL CURRENCY: NGN ₦ / USD $)
  // =========================================================================
  let currentCurrency = 'NGN'; // 'NGN' or 'USD'

  const btnNgn = document.getElementById('btn-currency-ngn');
  const btnUsd = document.getElementById('btn-currency-usd');

  const sliderHeadcount = document.getElementById('slider-headcount');
  const sliderSalary = document.getElementById('slider-salary');
  const sliderTurnover = document.getElementById('slider-turnover');

  const valHeadcount = document.getElementById('val-headcount');
  const valSalary = document.getElementById('val-salary');
  const valTurnover = document.getElementById('val-turnover');

  const statTurnoverCost = document.getElementById('stat-turnover-cost');
  const statSavings = document.getElementById('stat-savings');

  function formatMoney(amount, currency) {
    const symbol = currency === 'NGN' ? '₦' : '$';
    return symbol + Math.round(amount).toLocaleString('en-US');
  }

  function updateCalculator() {
    if (!sliderHeadcount || !sliderSalary || !sliderTurnover) return;
    const headcount = parseInt(sliderHeadcount.value, 10);
    const salary = parseInt(sliderSalary.value, 10);
    const turnoverRate = parseInt(sliderTurnover.value, 10) / 100;

    valHeadcount.textContent = `${headcount.toLocaleString()} employees`;
    valSalary.textContent = formatMoney(salary, currentCurrency);
    valTurnover.textContent = `${sliderTurnover.value}%`;

    // Replacement cost benchmark: approx 50% of departed employee's annual gross salary
    const annualTurnovers = headcount * turnoverRate;
    const turnoverLoss = annualTurnovers * (salary * 0.5);
    const projectedSavings = turnoverLoss * 0.35; // 35% retention improvement with Chadele

    statTurnoverCost.textContent = formatMoney(turnoverLoss, currentCurrency);
    statSavings.textContent = formatMoney(projectedSavings, currentCurrency);
  }

  function setCurrency(currency) {
    currentCurrency = currency;
    if (currency === 'NGN') {
      btnNgn?.classList.add('active');
      btnUsd?.classList.remove('active');
      if (sliderSalary) {
        sliderSalary.min = "3000000";
        sliderSalary.max = "45000000";
        sliderSalary.step = "500000";
        sliderSalary.value = "12500000";
      }
    } else {
      btnUsd?.classList.add('active');
      btnNgn?.classList.remove('active');
      if (sliderSalary) {
        sliderSalary.min = "25000";
        sliderSalary.max = "180000";
        sliderSalary.step = "5000";
        sliderSalary.value = "75000";
      }
    }
    updateCalculator();
  }

  btnNgn?.addEventListener('click', () => setCurrency('NGN'));
  btnUsd?.addEventListener('click', () => setCurrency('USD'));

  if (sliderHeadcount && sliderSalary && sliderTurnover) {
    sliderHeadcount.addEventListener('input', updateCalculator);
    sliderSalary.addEventListener('input', updateCalculator);
    sliderTurnover.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // =========================================================================
  // 4. PRACTICE AREA DETAILS (NIGERIAN CONTEXT)
  // =========================================================================
  const practiceData = {
    policies: {
      category: 'Nigerian Labour Act Compliance',
      title: 'Labour Act Compliance & Employee Handbooks',
      desc: 'Ensure 100% legal alignment with the Nigerian Labour Act (2004), Trade Disputes Act, and National Industrial Court of Nigeria precedents. Prevent costly employee claims and industrial disputes.',
      deliverables: [
        'Comprehensive Nigerian Labour Act (2004) Policy Review',
        'State-Specific PAYE Tax & LIRS/FIRS Exemption Audits',
        'National Industrial Court Tested Disciplinary Clauses',
        'Multi-Tier Severance, Redundancy & Gratuity Governance'
      ]
    },
    performance: {
      category: 'Productivity & Culture',
      title: 'Performance Management & KPI Engineering',
      desc: 'Design transparent appraisal systems, quarterly OKRs, and merit-driven bonuses that motivate distributed Nigerian teams across Lagos, Abuja, Port Harcourt, and remote hubs.',
      deliverables: [
        'Objective OKR and Strategic Priority Cascading Matrices',
        'Seniority & Competency-Based Career Progression Frameworks',
        'Quarterly 360-Degree Peer Feedback Calibration Guides',
        'Manager Coaching for Objective Performance Scoring'
      ]
    },
    talent: {
      category: 'Japa Defense & Talent Acquisition',
      title: 'Japa-Resilience & Executive Search',
      desc: 'Combat high turnover driven by international talent relocation. We build institutional succession pipelines, recruit experienced Diaspora returnees, and offer a 12-month candidate replacement warranty.',
      deliverables: [
        'Japa Risk Matrix & Key Personnel Retention Roadmaps',
        'Executive & Technical Leadership Recruitment across West Africa',
        'Structured Scorecard Interview Questions & Scoring',
        'Unconditional 12-Month Replacement Guarantee'
      ]
    },
    compensation: {
      category: 'FX & Total Rewards Strategy',
      title: 'FX & Inflation-Indexed Compensation Design',
      desc: 'Protect your staff against macroeconomic volatility. We design dual-currency packages, Naira cost-of-living adjustments, and Radford-calibrated executive bonus structures.',
      deliverables: [
        'Macroeconomic & Naira Inflation Salary Benchmarking',
        'Dual-Currency (USD/NGN) Compensation & Bonus Modeling',
        'Executive Equity Vesting & Phantom Stock Plans',
        'Transparent Salary Tiering & CIPM Grade Leveling'
      ]
    },
    relations: {
      category: 'Industrial Relations & Mediation',
      title: 'Trade Union Relations & Conflict Mediation',
      desc: 'Manage union relationships smoothly with certified arbitration. We support collective bargaining agreements (CBA) and conduct independent internal grievance investigations.',
      deliverables: [
        'Trade Union (NLC/TUC Affiliates) Negotiation & CBA Support',
        'Independent Third-Party Workplace Investigations',
        'Statutory Dispute Mediation & Settlement Agreements',
        'Confidential Whistleblower & Workplace Ethics Policies'
      ]
    },
    hrtech: {
      category: 'HR Tech & Payroll Automation',
      title: 'Nigerian HRIS & Automated Payroll Integration',
      desc: 'Eliminate payroll errors and automate statutory deductions. Turnkey deployment of SeamlessHR, Workpay, BambooHR, and Paystack integration with automated PenCom schedules.',
      deliverables: [
        'SeamlessHR / Workpay / BambooHR System Configuration',
        'Automated PAYE, Pension (PenCom), NHF, and NSITF Calculations',
        'Digital Employee Onboarding & Asset Tracking Workflows',
        'Real-time Executive People Analytics & Attrition Dashboards'
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

  practiceCloseBtn?.addEventListener('click', () => practiceModal?.classList.remove('open'));
  practiceModalBack?.addEventListener('click', () => practiceModal?.classList.remove('open'));

  // =========================================================================
  // 5. SERVICES FILTER TABS
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
          { opacity: 0, y: 15 }, 
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out', clearProps: 'transform,opacity' }
        );
      }
    });
  });

  // =========================================================================
  // 6. CONSULTATION & QUOTE REQUEST MODAL
  // =========================================================================
  const consultationModal = document.getElementById('consultation-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalFormContent = document.getElementById('modal-form-content');
  const modalSuccessContent = document.getElementById('modal-success-content');
  const consultationForm = document.getElementById('consultation-form');
  const btnModalDone = document.getElementById('btn-modal-done');

  function openConsultationModal() {
    closeMobileDrawer();
    practiceModal?.classList.remove('open');
    if (consultationModal) {
      if (modalFormContent) modalFormContent.style.display = 'block';
      if (modalSuccessContent) modalSuccessContent.style.display = 'none';
      consultationModal.classList.add('open');
    }
  }

  function closeConsultationModal() {
    consultationModal?.classList.remove('open');
  }

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openConsultationModal();
    });
  });

  modalCloseBtn?.addEventListener('click', closeConsultationModal);
  btnModalDone?.addEventListener('click', closeConsultationModal);

  [consultationModal, practiceModal].forEach(modal => {
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeConsultationModal();
      practiceModal?.classList.remove('open');
      closeMobileDrawer();
    }
  });

  consultationForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('btn-submit-consultation');
    if (submitBtn) {
      submitBtn.textContent = 'Transmitting Scope Request...';
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

  // =========================================================================
  // 7. FAQ ACCORDION
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  // =========================================================================
  // 8. NEWSLETTER SUBSCRIPTION
  // =========================================================================
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterFeedback = document.getElementById('newsletter-feedback');
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (newsletterFeedback) newsletterFeedback.style.display = 'block';
    newsletterForm.reset();
    setTimeout(() => {
      if (newsletterFeedback) newsletterFeedback.style.display = 'none';
    }, 4000);
  });

  // =========================================================================
  // 9. ACTIVE NAV SCROLLSPY
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
