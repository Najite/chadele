// Chadele HR Advisory - Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
  // 1. INTERACTIVE ROI CALCULATOR
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

  // 2. PRACTICE AREA DETAILS DATA & MODAL
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

  // 3. SERVICES FILTER TABS
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. CONSULTATION & QUOTE REQUEST MODAL
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

  // Close modals on click outside or Escape key
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
      }, 600);
    });
  }

  // 5. FAQ ACCORDION
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

  // 6. NEWSLETTER SUBSCRIPTION
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

  // 7. SMOOTH ACTIVE NAV LINK HIGHLIGHT
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
