// Chadele HR Advisory - Mobile-Native & Full-Page Flow Logic
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Prevent browser from jumping to top or fighting GSAP on page reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth <= 768;
  let heroTl = null;

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
    heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

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

  function setCurrency(currency, resetSalary = true) {
    currentCurrency = currency;
    localStorage.setItem('chadele_calc_currency', currency);
    if (currency === 'NGN') {
      btnNgn?.classList.add('active');
      btnUsd?.classList.remove('active');
      if (sliderSalary) {
        sliderSalary.min = "3000000";
        sliderSalary.max = "45000000";
        sliderSalary.step = "500000";
        if (resetSalary) sliderSalary.value = "12500000";
      }
    } else {
      btnUsd?.classList.add('active');
      btnNgn?.classList.remove('active');
      if (sliderSalary) {
        sliderSalary.min = "25000";
        sliderSalary.max = "180000";
        sliderSalary.step = "5000";
        if (resetSalary) sliderSalary.value = "75000";
      }
    }
    updateCalculator();
  }

  btnNgn?.addEventListener('click', () => setCurrency('NGN', true));
  btnUsd?.addEventListener('click', () => setCurrency('USD', true));

  // Restore saved calculator state across reloads
  try {
    const savedCurrency = localStorage.getItem('chadele_calc_currency');
    const savedHeadcount = localStorage.getItem('chadele_calc_headcount');
    const savedSalary = localStorage.getItem('chadele_calc_salary');
    const savedTurnover = localStorage.getItem('chadele_calc_turnover');

    if (savedCurrency === 'USD') {
      setCurrency('USD', !savedSalary);
    }
    if (sliderHeadcount && savedHeadcount) sliderHeadcount.value = savedHeadcount;
    if (sliderSalary && savedSalary) sliderSalary.value = savedSalary;
    if (sliderTurnover && savedTurnover) sliderTurnover.value = savedTurnover;
  } catch (e) {
    // Graceful fallback if localStorage is disabled
  }

  function handleCalculatorInput() {
    updateCalculator();
    try {
      localStorage.setItem('chadele_calc_currency', currentCurrency);
      if (sliderHeadcount) localStorage.setItem('chadele_calc_headcount', sliderHeadcount.value);
      if (sliderSalary) localStorage.setItem('chadele_calc_salary', sliderSalary.value);
      if (sliderTurnover) localStorage.setItem('chadele_calc_turnover', sliderTurnover.value);
    } catch (e) {}
  }

  if (sliderHeadcount && sliderSalary && sliderTurnover) {
    sliderHeadcount.addEventListener('input', handleCalculatorInput);
    sliderSalary.addEventListener('input', handleCalculatorInput);
    sliderTurnover.addEventListener('input', handleCalculatorInput);
    updateCalculator();
  }

  // =========================================================================
  // 4. PRACTICE AREA DETAILS
  // =========================================================================
  const practiceData = {
    policies: {
      category: 'Labour Act Compliance',
      title: 'Labour Act Compliance & Employee Handbooks',
      desc: 'Ensure 100% legal alignment with statutory Labour Act regulations, Trade Disputes Act, and National Industrial Court precedents. Prevent costly employee claims and industrial disputes.',
      deliverables: [
        'Statutory Labour Act (2004) Policy Review',
        'State-Specific PAYE Tax & LIRS/FIRS Exemption Audits',
        'National Industrial Court Tested Disciplinary Clauses',
        'Multi-Tier Severance, Redundancy & Gratuity Governance'
      ]
    },
    performance: {
      category: 'Productivity & Culture',
      title: 'Performance Management & KPI Engineering',
      desc: 'Design transparent appraisal systems, quarterly OKRs, and merit-driven bonuses that motivate distributed teams across Lagos, Abuja, Port Harcourt, and remote hubs.',
      deliverables: [
        'Objective OKR and Strategic Priority Cascading Matrices',
        'Seniority & Competency-Based Career Progression Frameworks',
        'Quarterly 360-Degree Peer Feedback Calibration Guides',
        'Manager Coaching for Objective Performance Scoring'
      ]
    },
    talent: {
      category: 'Talent Defense & Executive Search',
      title: 'Key Talent Retention & Executive Search',
      desc: 'Combat high turnover driven by talent migration. We build institutional succession pipelines, recruit experienced leadership, and offer an unconditional 12-month candidate replacement warranty.',
      deliverables: [
        'Turnover Risk Matrix & Key Personnel Retention Roadmaps',
        'Executive & Technical Leadership Recruitment',
        'Structured Scorecard Interview Questions & Scoring',
        'Unconditional 12-Month Replacement Guarantee'
      ]
    },
    compensation: {
      category: 'FX & Total Rewards Strategy',
      title: 'FX & Inflation-Indexed Compensation Design',
      desc: 'Protect your staff against macroeconomic volatility. We design dual-currency packages, local currency cost-of-living adjustments, and Radford-calibrated executive bonus structures.',
      deliverables: [
        'Macroeconomic & Inflation Salary Benchmarking',
        'Dual-Currency (USD/Local) Compensation & Bonus Modeling',
        'Executive Equity Vesting & Phantom Stock Plans',
        'Transparent Salary Tiering & CIPM Grade Leveling'
      ]
    },
    relations: {
      category: 'Industrial Relations & Mediation',
      title: 'Trade Union Relations & Conflict Mediation',
      desc: 'Manage union relationships smoothly with certified arbitration. We support collective bargaining agreements (CBA) and conduct independent internal grievance investigations.',
      deliverables: [
        'Trade Union Negotiation & CBA Support',
        'Independent Third-Party Workplace Investigations',
        'Statutory Dispute Mediation & Settlement Agreements',
        'Confidential Whistleblower & Workplace Ethics Policies'
      ]
    },
    hrtech: {
      category: 'HR Tech & Payroll Automation',
      title: 'HRIS & Automated Payroll Integration',
      desc: 'Eliminate payroll errors and automate statutory deductions. Turnkey deployment of SeamlessHR, Workpay, BambooHR, and automated PenCom schedules.',
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
      try {
        sessionStorage.setItem('chadele_service_filter', filter);
      } catch (e) {}

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

  // Restore saved filter tab across reloads
  try {
    const savedFilter = sessionStorage.getItem('chadele_service_filter');
    if (savedFilter && savedFilter !== 'all') {
      const activeFilterBtn = document.querySelector(`.filter-btn[data-filter="${savedFilter}"]`);
      if (activeFilterBtn) {
        filterBtns.forEach(b => b.classList.remove('active'));
        activeFilterBtn.classList.add('active');
        serviceCards.forEach(card => {
          const category = card.getAttribute('data-category');
          card.style.display = (category === savedFilter) ? 'flex' : 'none';
        });
      }
    }
  } catch (e) {}

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

  const draftInputs = {
    name: document.getElementById('input-name'),
    email: document.getElementById('input-email'),
    size: document.getElementById('select-size'),
    practice: document.getElementById('select-practice'),
    notes: document.getElementById('input-notes')
  };

  // Restore draft if saved across reloads
  try {
    const savedDraft = JSON.parse(sessionStorage.getItem('chadele_consultation_draft') || '{}');
    if (savedDraft.name && draftInputs.name) draftInputs.name.value = savedDraft.name;
    if (savedDraft.email && draftInputs.email) draftInputs.email.value = savedDraft.email;
    if (savedDraft.size && draftInputs.size) draftInputs.size.value = savedDraft.size;
    if (savedDraft.practice && draftInputs.practice) draftInputs.practice.value = savedDraft.practice;
    if (savedDraft.notes && draftInputs.notes) draftInputs.notes.value = savedDraft.notes;
  } catch (e) {}

  function saveFormDraft() {
    try {
      const draft = {
        name: draftInputs.name?.value || '',
        email: draftInputs.email?.value || '',
        size: draftInputs.size?.value || '',
        practice: draftInputs.practice?.value || '',
        notes: draftInputs.notes?.value || ''
      };
      sessionStorage.setItem('chadele_consultation_draft', JSON.stringify(draft));
    } catch (e) {}
  }

  consultationForm?.addEventListener('input', saveFormDraft);
  consultationForm?.addEventListener('change', saveFormDraft);

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
      try {
        sessionStorage.removeItem('chadele_consultation_draft');
      } catch (e) {}
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
  // 9. SCROLL PERSISTENCE & POSITION RESTORATION
  // =========================================================================
  const navbar = document.querySelector('.navbar-wrapper');
  const allSections = document.querySelectorAll('main section[id]');
  let scrollTicking = false;
  let currentActiveId = '';

  // Brand logo click clears scroll memory to return home
  document.querySelectorAll('.brand-logo').forEach(logo => {
    logo.addEventListener('click', () => {
      try {
        sessionStorage.setItem('chadele_scroll_pos', '0');
        sessionStorage.setItem('chadele_active_section', 'hero');
        history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch (e) {}
    });
  });

  function handleScrollPersistence() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Persist raw scroll offset
    try {
      sessionStorage.setItem('chadele_scroll_pos', Math.round(scrollY).toString());
    } catch (e) {}

    // Navbar scrolled state
    if (scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Detect currently visible section
    let detectedId = 'hero';
    allSections.forEach(sec => {
      const top = sec.offsetTop - 140;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        detectedId = sec.getAttribute('id');
      }
    });

    if (detectedId !== currentActiveId) {
      currentActiveId = detectedId;
      try {
        if (detectedId && detectedId !== 'hero') {
          sessionStorage.setItem('chadele_active_section', detectedId);
          history.replaceState(null, '', '#' + detectedId);
        } else if (scrollY < 120) {
          sessionStorage.setItem('chadele_active_section', 'hero');
          history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      } catch (e) {}

      // Update active state on nav links
      document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === '#' + detectedId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    scrollTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(handleScrollPersistence);
      scrollTicking = true;
    }
  }, { passive: true });

  // Guarantee persistence before page unloads
  window.addEventListener('beforeunload', () => {
    try {
      const currentScroll = Math.round(window.pageYOffset || document.documentElement.scrollTop);
      sessionStorage.setItem('chadele_scroll_pos', currentScroll.toString());
    } catch (e) {}
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      try {
        const currentScroll = Math.round(window.pageYOffset || document.documentElement.scrollTop);
        sessionStorage.setItem('chadele_scroll_pos', currentScroll.toString());
      } catch (e) {}
    }
  });

  // RESTORATION FUNCTION: Restores user to their exact place on page reload
  function restoreScrollPosition() {
    let savedSection = '';
    let savedPos = 0;

    try {
      const hash = window.location.hash.replace('#', '');
      savedSection = hash || sessionStorage.getItem('chadele_active_section') || '';
      savedPos = parseInt(sessionStorage.getItem('chadele_scroll_pos') || '0', 10);
    } catch (e) {}

    let targetY = 0;

    if (savedSection && savedSection !== 'hero') {
      const targetEl = document.getElementById(savedSection);
      if (targetEl) {
        targetY = Math.max(0, targetEl.getBoundingClientRect().top + window.pageYOffset - 80);
      } else if (savedPos > 0) {
        targetY = savedPos;
      }
    } else if (savedPos > 40) {
      targetY = savedPos;
    }

    if (targetY > 20) {
      // Temporarily disable smooth scroll so the jump is instant and accurate
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, targetY);

      if (targetY > 40 && navbar) {
        navbar.classList.add('scrolled');
      }

      // If user was far below hero, complete hero entrance animation to avoid layout shifts above
      if (targetY > 400 && heroTl) {
        heroTl.progress(1);
      }

      // Re-confirm scroll position after ScrollTrigger layout calculations
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        window.scrollTo(0, targetY);
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = '';
        }, 150);
      });
    }
  }

  // Execute scroll restoration immediately
  restoreScrollPosition();

  // Double check after all images and fonts load
  window.addEventListener('load', () => {
    try {
      const savedY = parseInt(sessionStorage.getItem('chadele_scroll_pos') || '0', 10);
      const hash = window.location.hash.replace('#', '');
      if ((savedY > 40 || hash) && Math.abs((window.pageYOffset || 0) - savedY) > 60) {
        restoreScrollPosition();
      }
    } catch (e) {}
  });
});
