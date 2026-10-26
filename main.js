// Chadele HR Advisory - Humanized & Mobile-Native Interactive Logic
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
    link.addEventListener('click', () => {
      closeMobileDrawer();
    });
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

    // Services Cards
    gsap.from('.service-card', {
      scrollTrigger: {
        trigger: '#services-grid',
        start: 'top 88%'
      },
      y: 35,
      opacity: 0,
      stagger: isMobile ? 0.06 : 0.08,
      duration: 0.6,
      ease: 'power3.out',
      clearProps: 'transform,opacity'
    });

    // Training Pillars
    gsap.from('.training-pillar-card', {
      scrollTrigger: {
        trigger: '.training-pillars-grid',
        start: 'top 88%'
      },
      y: 30,
      opacity: 0,
      stagger: 0.08,
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

    // Resource Cards
    gsap.from('.article-card, .tool-card, .download-card', {
      scrollTrigger: {
        trigger: '#resources',
        start: 'top 88%'
      },
      y: 25,
      opacity: 0,
      stagger: 0.06,
      duration: 0.5,
      ease: 'power2.out',
      clearProps: 'transform,opacity'
    });

    // Team Cards
    gsap.from('.team-card', {
      scrollTrigger: {
        trigger: '.team-grid',
        start: 'top 88%'
      },
      y: 30,
      opacity: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power3.out',
      clearProps: 'transform,opacity'
    });

    // Testimonials
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

  const calcState = {
    cost: 0,
    savings: 0,
    initialized: false
  };
  let calcTween = null;

  function updateCalculator(animate = true) {
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

    if (!calcState.initialized || !animate || prefersReducedMotion) {
      calcState.cost = turnoverLoss;
      calcState.savings = projectedSavings;
      calcState.initialized = true;
      if (statTurnoverCost) statTurnoverCost.textContent = formatMoney(turnoverLoss, currentCurrency);
      if (statSavings) statSavings.textContent = formatMoney(projectedSavings, currentCurrency);
      return;
    }

    if (calcTween) calcTween.kill();

    // Subtle tactile feedback pulse on savings
    if (statSavings) {
      statSavings.style.transform = 'scale(1.035)';
      setTimeout(() => {
        if (statSavings) statSavings.style.transform = 'scale(1)';
      }, 140);
    }

    calcTween = gsap.to(calcState, {
      cost: turnoverLoss,
      savings: projectedSavings,
      duration: 0.22,
      ease: 'power1.out',
      onUpdate: () => {
        if (statTurnoverCost) statTurnoverCost.textContent = formatMoney(calcState.cost, currentCurrency);
        if (statSavings) statSavings.textContent = formatMoney(calcState.savings, currentCurrency);
      }
    });
  }

  function setCurrency(currency, resetSalary = true) {
    currentCurrency = currency;
    try {
      localStorage.setItem('chadele_calc_currency', currency);
    } catch (e) {}

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
    updateCalculator(false);
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
  } catch (e) {}

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
  // 4. SERVICES RENDERED (6 CORE SERVICES) & DETAILS MODAL
  // =========================================================================
  const practiceData = {
    // 1. BUSINESS ADVISORY
    advisory: {
      category: 'Business Advisory',
      title: 'Business Advisory & Strategic Architecture',
      desc: 'Clear direction and calm guidance when your business is growing or changing. We help you streamline how your departments work together, eliminate bottlenecks between managers, design clean org charts, and set up board governance that investors love.',
      deliverables: [
        'Organizational structure blueprints & span-of-control redesign',
        'Departmental workflow mapping & bottleneck elimination',
        'Leadership role definitions & clear accountability matrices',
        'Board of directors governance charters & advisory committee protocols',
        'Strategic 1–3 year growth & commercial scaling roadmaps'
      ]
    },

    // 2. HR CONSULTING
    consulting: {
      category: 'HR Consulting',
      title: 'HR Consulting & Workplace Compliance',
      desc: 'Airtight employee policies, fair salaries, and complete peace of mind. We write easy-to-read employee handbooks, review staff contracts, ensure 100% compliance with Nigerian Labour Laws, and design transparent appraisal and salary systems that staff respect.',
      deliverables: [
        'Plain-English Employee Handbooks & enforceable codes of conduct',
        '100% Nigerian Labour Act, PenCom, PAYE, and ITF statutory compliance audits',
        'Inflation-hedged salary tiering & transparent CIPM grade leveling',
        'Objective quarterly OKR and performance appraisal frameworks',
        'National Industrial Court-tested disciplinary & termination procedures'
      ]
    },

    // 3. RECRUITMENT & TALENT SOLUTIONS
    recruitment: {
      category: 'Recruitment & Talent Solutions',
      title: 'Recruitment & Executive Talent Solutions',
      desc: 'Find the right people the first time — without the headache. We source, thoroughly interview, and deliver vetted professionals — from key department managers to senior executives — backed by our unconditional 12-month placement replacement guarantee.',
      deliverables: [
        'Confidential executive search for C-Suite, VP, and Director-level leaders',
        'Structured competency scorecard interviews & cultural fit assessments',
        'Comprehensive background checks, credential verification & referee audits',
        'Unconditional 12-month candidate placement & replacement warranty',
        'Accelerated time-to-hire pipelines for technical & commercial roles'
      ]
    },

    // 4. CORPORATE TRAINING
    training_corp: {
      category: 'Corporate Training',
      title: 'Corporate Training & In-House Learning Academies',
      desc: 'Practical, engaging workshops tailored around your team’s real daily challenges. In-house bootcamps, manager development, and leadership retreats designed specifically for your company. No boring slide decks — just interactive, memorable sessions your staff can use immediately.',
      deliverables: [
        'Customized curriculum designed around your company’s exact operational targets',
        'Interactive roleplaying, practical simulations & live problem-solving',
        'Pre-training baseline skill surveys & post-training behavioral milestone tracking',
        'Executive strategy retreats & emerging supervisory bootcamps',
        'Actionable manager playbooks & ongoing implementation support'
      ]
    },

    // 5. PROFESSIONAL TRAINING
    training_prof: {
      category: 'Professional Training',
      title: 'Professional Training & Certified Masterclasses',
      desc: 'Certified, career-accelerating masterclasses for ambitious individuals and team leads. Open-enrollment public cohorts where HR practitioners, founders, and supervisors master people analytics, labor dispute mediation, salary structuring, and modern management techniques.',
      deliverables: [
        'Cohort-based masterclasses with verified certificates upon completion',
        'Practical toolkits: Excel compensation models, policy templates & audit checklists',
        'Weekend & evening friendly hybrid schedules for working professionals',
        'Lifetime access to session recordings, learning portals & peer community',
        'Direct Q&A sessions with seasoned Nigerian HR directors & legal advisors'
      ]
    },

    // 6. HR OUTSOURCING
    outsourcing: {
      category: 'HR Outsourcing',
      title: 'Complete HR Outsourcing & Payroll Administration',
      desc: 'Hand over your day-to-day HR paperwork so you can focus on building your business. We act as your entire dedicated HR department. We handle monthly payroll calculations, statutory tax remittances (PAYE, PenCom, ITF), onboarding, leave tracking, and staff queries seamlessly.',
      deliverables: [
        'Monthly payroll processing & automated employee payslip distribution',
        'Timely statutory remittance filings (PAYE State Taxes, PenCom Pensions, ITF, NSITF)',
        'Digital employee records, leave administration & probation tracking',
        'Dedicated staff helpdesk for employee queries & contract management',
        'Disciplinary process facilitation in strict compliance with the Labour Act'
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
  // 5. SERVICES FILTER TABS & DROPDOWN JUMPS
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  function filterServices(filter) {
    filterBtns.forEach(b => {
      if (b.getAttribute('data-filter') === filter) {
        b.classList.add('active');
        b.setAttribute('aria-selected', 'true');
      } else {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      }
    });

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
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      filterServices(filter);
    });
  });

  // Handle Dropdown Filter Jumps (from navbar or mobile drawer)
  document.querySelectorAll('[data-filter-jump]').forEach(el => {
    el.addEventListener('click', (e) => {
      const targetFilter = el.getAttribute('data-filter-jump');
      if (targetFilter) {
        filterServices(targetFilter);
      }
    });
  });

  // =========================================================================
  // 6. TRAINING OFFERED: REGISTRATION & SYLLABUS MODALS
  // =========================================================================

  const trainingModal = document.getElementById('training-modal');
  const trainingModalClose = document.getElementById('training-modal-close');
  const trainingModalTitle = document.getElementById('training-modal-title');
  const trainingModalSubtitle = document.getElementById('training-modal-subtitle');
  const trainingInputCourse = document.getElementById('training-input-course');
  const trainingForm = document.getElementById('training-form');
  const trainingModalSuccess = document.getElementById('training-modal-success');
  const btnTrainSuccessDone = document.getElementById('btn-train-success-done');

  document.querySelectorAll('.open-training-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const courseTitle = btn.getAttribute('data-course-title') || btn.getAttribute('data-course-type') || 'Course Registration';
      const courseDate = btn.getAttribute('data-course-date') || '';
      if (trainingModal) {
        trainingModalTitle.textContent = courseTitle;
        trainingModalSubtitle.textContent = courseDate ? `Scheduled Date: ${courseDate} • Reserve your seat below` : 'Reserve your seat or request corporate group pricing';
        if (trainingInputCourse) trainingInputCourse.value = courseTitle;
        if (trainingForm) trainingForm.style.display = 'block';
        if (trainingModalSuccess) trainingModalSuccess.style.display = 'none';
        trainingModal.classList.add('open');
      }
    });
  });

  document.querySelectorAll('.open-syllabus-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const courseTitle = btn.getAttribute('data-course-title') || 'Course Syllabus';
      if (trainingModal) {
        trainingModalTitle.textContent = `Get Syllabus: ${courseTitle}`;
        trainingModalSubtitle.textContent = 'Enter your email to receive the complete learning objectives, schedule & pricing.';
        if (trainingInputCourse) trainingInputCourse.value = courseTitle;
        if (trainingForm) trainingForm.style.display = 'block';
        if (trainingModalSuccess) trainingModalSuccess.style.display = 'none';
        trainingModal.classList.add('open');
      }
    });
  });

  trainingModalClose?.addEventListener('click', () => trainingModal?.classList.remove('open'));
  btnTrainSuccessDone?.addEventListener('click', () => trainingModal?.classList.remove('open'));

  trainingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (trainingForm) trainingForm.style.display = 'none';
    if (trainingModalSuccess) trainingModalSuccess.style.display = 'block';
    trainingForm.reset();
  });

  // Handle Training Jump from navbar dropdown
  document.querySelectorAll('[data-training-jump]').forEach(el => {
    el.addEventListener('click', () => {
      const target = el.getAttribute('data-training-jump');
      const targetCard = document.getElementById(target === 'corporate' ? 'train-corporate' : 'train-professional');
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetCard.style.outline = '2px solid var(--accent)';
        setTimeout(() => {
          targetCard.style.outline = '';
        }, 2000);
      }
    });
  });

  // =========================================================================
  // 7. RESOURCES HUB: TABS, ARTICLES, TOOLS & DOWNLOADS
  // =========================================================================
  const resTabBtns = document.querySelectorAll('.res-tab-btn');
  const resPanels = document.querySelectorAll('.res-panel');

  function switchResourceTab(targetId) {
    resTabBtns.forEach(btn => {
      if (btn.getAttribute('data-res-target') === targetId) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    resPanels.forEach(panel => {
      if (panel.id === targetId) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });
  }

  resTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-res-target');
      switchResourceTab(targetId);
    });
  });

  // Handle Dropdown Resources Jump
  document.querySelectorAll('[data-res-tab]').forEach(el => {
    el.addEventListener('click', () => {
      const tabKey = el.getAttribute('data-res-tab');
      const targetId = tabKey === 'articles' ? 'res-articles' : (tabKey === 'tools' ? 'res-tools' : 'res-downloads');
      switchResourceTab(targetId);
    });
  });

  // Article Summaries Dictionary
  const articleSummaries = {
    labour_mistakes: {
      category: 'Labour Law • Nigerian Startups',
      title: '5 Costly Mistakes Growing Nigerian Companies Make With Labour Law',
      body: `
        <p><strong>1. Verbal Contracts Without Written Confirmation:</strong> Under Section 7 of the Nigerian Labour Act, employers must provide written employment terms within 3 months of hiring. Verbal promises leave you wide open to disputes at the National Industrial Court.</p><br>
        <p><strong>2. Informal Probation Traps:</strong> Failing to conduct a formal review at the end of probation or leaving staff in limbo can legally confirm them as permanent employees with full severance rights.</p><br>
        <p><strong>3. Vague Overtime & Weekend Policies:</strong> Without clear written working hours in an employee handbook, disputed overtime claims can accumulate massive liability.</p><br>
        <p><strong>4. Arbitrary Dismissal Without Fair Hearing:</strong> Even in employment "at-will" contracts, terminating someone for misconduct requires documented procedural fair hearing to withstand judicial scrutiny.</p><br>
        <p><strong>5. Neglecting Statutory Filings:</strong> Not remitting PAYE, PenCom pensions, ITF, or NSITF incurs heavy penalties during state revenue audits. <em>Action: Schedule a free Labour Act audit with Chadele to protect your business.</em></p>
      `
    },
    performance_reviews: {
      category: 'Performance • Workplace Culture',
      title: 'How to Run Performance Reviews People Actually Look Forward To',
      body: `
        <p><strong>Move from Annual Judgments to Quarterly Conversations:</strong> Once-a-year appraisals feel like a trial. When feedback happens every quarter, there are zero surprises and staff stay motivated.</p><br>
        <p><strong>The 3-Question Framework:</strong> Instead of confusing 50-point rating rubrics, structure your 1-on-1 around three simple questions:</p>
        <ul style="padding-left: 20px; margin: 10px 0;">
          <li><em>"What wins are you most proud of since our last chat?"</em></li>
          <li><em>"Where did you feel blocked or slowed down, and how can I help remove that roadblock?"</em></li>
          <li><em>"What is one skill or project you want to tackle next quarter?"</em></li>
        </ul>
        <p><strong>Focus on Growth, Not Blame:</strong> When managers coach instead of critique, employees take ownership of their numbers and productivity jumps naturally.</p>
      `
    },
    retention_2026: {
      category: 'Hiring & Retention • Economic Resilience',
      title: 'Retaining Your Best Talent in 2026: Why Fair Pay Isn’t The Only Key',
      body: `
        <p>While inflation makes competitive, benchmarked compensation mandatory, money alone does not prevent your top performers from leaving. Research across high-growth African companies shows five non-monetary reasons staff stay:</p><br>
        <p><strong>1. Clear Career Progression:</strong> High performers want to know where they can be in 18 months. Ambiguity breeds restlessness.</p><br>
        <p><strong>2. Empathetic Direct Managers:</strong> 70% of employee churn is driven by friction with frontline supervisors, not executive leadership.</p><br>
        <p><strong>3. Flexibility & Autonomy:</strong> Hybrid work options, trust, and output-focused KPIs mean more than rigid 9-to-5 desk presence.</p><br>
        <p><strong>4. Learning & Upskilling Stipends:</strong> Sponsoring your team leads to attend masterclasses makes them feel valued and invested in.</p>
      `
    }
  };

  const articleModal = document.getElementById('article-modal');
  const articleModalClose = document.getElementById('article-modal-close');
  const articleModalDone = document.getElementById('article-modal-done');
  const articleModalCategory = document.getElementById('article-modal-category');
  const articleModalTitle = document.getElementById('article-modal-title');
  const articleModalBody = document.getElementById('article-modal-body');

  document.querySelectorAll('.open-article-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const articleKey = btn.getAttribute('data-article');
      const article = articleSummaries[articleKey];
      if (article && articleModal) {
        articleModalCategory.textContent = article.category;
        articleModalTitle.textContent = article.title;
        articleModalBody.innerHTML = article.body;
        articleModal.classList.add('open');
      }
    });
  });

  articleModalClose?.addEventListener('click', () => articleModal?.classList.remove('open'));
  articleModalDone?.addEventListener('click', () => articleModal?.classList.remove('open'));

  // Download Modal
  const downloadModal = document.getElementById('download-modal');
  const downloadModalClose = document.getElementById('download-modal-close');
  const downloadModalTitle = document.getElementById('download-modal-title');
  const downloadResourceTitle = document.getElementById('download-resource-title');
  const downloadForm = document.getElementById('download-form');
  const downloadModalSuccess = document.getElementById('download-modal-success');
  const btnDownloadDone = document.getElementById('btn-download-done');

  document.querySelectorAll('.open-download-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const resName = btn.getAttribute('data-resource-name') || 'Resource Template';
      if (downloadModal) {
        downloadModalTitle.textContent = `Download: ${resName}`;
        if (downloadResourceTitle) downloadResourceTitle.value = resName;
        if (downloadForm) downloadForm.style.display = 'block';
        if (downloadModalSuccess) downloadModalSuccess.style.display = 'none';
        downloadModal.classList.add('open');
      }
    });
  });

  downloadModalClose?.addEventListener('click', () => downloadModal?.classList.remove('open'));
  btnDownloadDone?.addEventListener('click', () => downloadModal?.classList.remove('open'));

  downloadForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (downloadForm) downloadForm.style.display = 'none';
    if (downloadModalSuccess) downloadModalSuccess.style.display = 'block';
    downloadForm.reset();
  });

  // =========================================================================
  // 8. INTERACTIVE 2-MINUTE HR COMPLIANCE HEALTH CHECK QUIZ
  // =========================================================================
  const quizModal = document.getElementById('quiz-modal');
  const quizModalClose = document.getElementById('quiz-modal-close');
  const quizQuestionsView = document.getElementById('quiz-questions-view');
  const quizResultsView = document.getElementById('quiz-results-view');
  const quizProgress = document.getElementById('quiz-progress');
  const quizQuestionContainer = document.getElementById('quiz-question-container');
  const quizQuestionText = document.getElementById('quiz-question-text');
  const quizProgressRing = document.getElementById('quiz-progress-ring');
  const quizScoreCircle = document.getElementById('quiz-score-circle');
  const quizResultTitle = document.getElementById('quiz-result-title');
  const quizResultFeedback = document.getElementById('quiz-result-feedback');
  const quizQuestions = [
    "Do all your current employees have a signed employment contract that explicitly references their salary, working hours, and notice period?",
    "Are you currently registered and remitting statutory PenCom pensions and PAYE state taxes for all eligible staff?",
    "Does your company have a written Employee Handbook with clear disciplinary procedures, leave entitlements, and code of conduct?",
    "Do you have an objective, documented process for conducting performance appraisals and determining salary adjustments?",
    "Are job descriptions and reporting lines clearly defined so every staff member knows who they report to and what is expected of them?"
  ];

  let currentQuestionIndex = 0;
  let quizScore = 0;
  let isQuizTransitioning = false;

  function loadQuestion(index) {
    if (quizProgress) quizProgress.textContent = `Question ${index + 1} of ${quizQuestions.length}`;
    if (quizQuestionText) quizQuestionText.textContent = quizQuestions[index];
  }

  function startQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    isQuizTransitioning = false;
    if (quizQuestionsView) quizQuestionsView.style.display = 'block';
    if (quizResultsView) quizResultsView.style.display = 'none';
    if (quizProgressRing) quizProgressRing.style.strokeDashoffset = '232.48';
    if (quizScoreCircle) quizScoreCircle.textContent = '0/5';
    if (quizQuestionContainer) {
      quizQuestionContainer.style.opacity = '1';
      quizQuestionContainer.style.transform = 'none';
    }
    loadQuestion(0);
    quizModal?.classList.add('open');
  }

  document.querySelectorAll('.open-quiz-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      startQuiz();
    });
  });

  document.querySelectorAll('.quiz-answer-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isQuizTransitioning) return;
      isQuizTransitioning = true;

      const isYes = btn.getAttribute('data-answer') === 'yes';
      if (isYes) quizScore++;

      if (quizQuestionContainer && !prefersReducedMotion) {
        quizQuestionContainer.style.opacity = '0';
        quizQuestionContainer.style.transform = 'translateX(-12px)';
      }

      setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
          loadQuestion(currentQuestionIndex);
          if (quizQuestionContainer && !prefersReducedMotion) {
            quizQuestionContainer.style.transform = 'translateX(12px)';
            requestAnimationFrame(() => {
              quizQuestionContainer.style.opacity = '1';
              quizQuestionContainer.style.transform = 'translateX(0)';
            });
          }
          isQuizTransitioning = false;
        } else {
          // Show Results
          if (quizQuestionsView) quizQuestionsView.style.display = 'none';
          if (quizResultsView) quizResultsView.style.display = 'block';

          // Animate SVG Ring & Score Counter
          const circumference = 232.48;
          const targetOffset = circumference * (1 - (quizScore / 5));

          if (quizProgressRing) {
            quizProgressRing.style.strokeDashoffset = circumference;
            setTimeout(() => {
              if (quizProgressRing) quizProgressRing.style.strokeDashoffset = targetOffset;
            }, 60);
          }

          if (prefersReducedMotion) {
            if (quizScoreCircle) quizScoreCircle.textContent = `${quizScore}/5`;
          } else {
            const scoreCounter = { val: 0 };
            gsap.to(scoreCounter, {
              val: quizScore,
              duration: 0.65,
              ease: 'power2.out',
              onUpdate: () => {
                if (quizScoreCircle) quizScoreCircle.textContent = `${Math.round(scoreCounter.val)}/5`;
              }
            });
          }

          if (quizScore === 5) {
            quizResultTitle.textContent = 'Outstanding HR Health!';
            quizResultFeedback.textContent = 'Congratulations! Your business has clean documentation and sound employment structures in place. Regular quarterly reviews will keep you protected.';
          } else if (quizScore >= 3) {
            quizResultTitle.textContent = 'Solid Basics, Key Vulnerabilities';
            quizResultFeedback.textContent = 'You have good foundations, but the gaps in handbooks, statutory filings, or contracts could expose your company to costly fines or employee disputes.';
          } else {
            quizResultTitle.textContent = 'Urgent Legal & Operational Protection Needed';
            quizResultFeedback.textContent = 'Your business is currently operating with critical employment risks. Let us help you audit your policies and establish airtight contracts immediately.';
          }
          isQuizTransitioning = false;
        }
      }, prefersReducedMotion ? 0 : 130);
    });
  });

  quizModalClose?.addEventListener('click', () => quizModal?.classList.remove('open'));

  // =========================================================================
  // 9. CAREER APPLICATION MODAL
  // =========================================================================
  const careerModal = document.getElementById('career-modal');
  const careerModalClose = document.getElementById('career-modal-close');
  const careerModalTitle = document.getElementById('career-modal-title');
  const careerInputRole = document.getElementById('career-input-role');
  const careerForm = document.getElementById('career-form');
  const careerModalSuccess = document.getElementById('career-modal-success');
  const btnCareerDone = document.getElementById('btn-career-done');

  document.querySelectorAll('.open-career-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const role = btn.getAttribute('data-job-role') || 'Open Role';
      if (careerModal) {
        careerModalTitle.textContent = `Apply: ${role}`;
        if (careerInputRole) careerInputRole.value = role;
        if (careerForm) careerForm.style.display = 'block';
        if (careerModalSuccess) careerModalSuccess.style.display = 'none';
        careerModal.classList.add('open');
      }
    });
  });

  careerModalClose?.addEventListener('click', () => careerModal?.classList.remove('open'));
  btnCareerDone?.addEventListener('click', () => careerModal?.classList.remove('open'));

  careerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (careerForm) careerForm.style.display = 'none';
    if (careerModalSuccess) careerModalSuccess.style.display = 'block';
    careerForm.reset();
  });

  // =========================================================================
  // 10. CONSULTATION & QUOTE REQUEST MODAL
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
    quizModal?.classList.remove('open');
    trainingModal?.classList.remove('open');
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

  [consultationModal, practiceModal, trainingModal, downloadModal, articleModal, careerModal, quizModal].forEach(modal => {
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [consultationModal, practiceModal, trainingModal, downloadModal, articleModal, careerModal, quizModal].forEach(m => m?.classList.remove('open'));
      closeMobileDrawer();
    }
  });

  consultationForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('btn-submit-consultation');
    if (submitBtn) {
      submitBtn.textContent = 'Transmitting...';
      submitBtn.style.opacity = '0.7';
    }

    setTimeout(() => {
      if (modalFormContent) modalFormContent.style.display = 'none';
      if (modalSuccessContent) modalSuccessContent.style.display = 'block';
      consultationForm.reset();
      if (submitBtn) {
        submitBtn.textContent = 'Book 20-Minute Chat';
        submitBtn.style.opacity = '1';
      }
    }, 450);
  });

  // =========================================================================
  // 11. FAQ ACCORDION
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
  // 12. SCROLL PERSISTENCE & POSITION RESTORATION
  // =========================================================================
  const navbar = document.querySelector('.navbar-wrapper');
  const allSections = document.querySelectorAll('main section[id]');
  let scrollTicking = false;
  let currentActiveId = '';

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

    try {
      sessionStorage.setItem('chadele_scroll_pos', Math.round(scrollY).toString());
    } catch (e) {}

    if (scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

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
        } else if (scrollY < 120) {
          sessionStorage.setItem('chadele_active_section', 'hero');
        }
      } catch (e) {}
    }

    scrollTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(handleScrollPersistence);
      scrollTicking = true;
    }
  }, { passive: true });

  window.addEventListener('beforeunload', () => {
    try {
      const currentScroll = Math.round(window.pageYOffset || document.documentElement.scrollTop);
      sessionStorage.setItem('chadele_scroll_pos', currentScroll.toString());
    } catch (e) {}
  });

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
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, targetY);

      if (targetY > 40 && navbar) {
        navbar.classList.add('scrolled');
      }

      if (targetY > 400 && heroTl) {
        heroTl.progress(1);
      }

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        window.scrollTo(0, targetY);
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = '';
        }, 150);
      });
    }
  }

  restoreScrollPosition();

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
