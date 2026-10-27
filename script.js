/**
 * NEXUS Workspace — Interactive Frontend Logic (Vanilla JavaScript)
 * University Lab Work #9 (ICT6001) — IITU, Almaty, Kazakhstan
 *
 * Features:
 * 1. Light / Dark Theme Switching with localStorage & prefers-color-scheme
 * 2. Accessible Mobile Burger Menu with keyboard & ARIA support
 * 3. Tariff Card -> Booking Form automatic plan selection & smooth scroll
 * 4. Interactive Booking Form & Test Day Form validation (including time interval check)
 * 5. Accessible Modals for Test Day, Events ("Learn More"), and Footer Legal/Rules docs
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. THEME SWITCHER (LIGHT / DARK MODE)
     ========================================================================== */
  const THEME_STORAGE_KEY = 'nexus-theme';
  const rootEl = document.documentElement;
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  const themeToggleBtns = document.querySelectorAll('[data-theme-toggle]');
  const themeSegmentBtns = document.querySelectorAll('[data-set-theme]');
  const themeLabels = document.querySelectorAll('[data-theme-label]');
  const themeShortLabels = document.querySelectorAll('[data-theme-short-label]');

  /**
   * Determines the active theme from DOM or storage
   */
  function getCurrentTheme() {
    return rootEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  /**
   * Applies the specified theme ('light' or 'dark') and updates all UI controls
   * @param {'light' | 'dark'} theme
   * @param {boolean} persist - Whether to save to localStorage
   */
  function applyTheme(theme, persist = true) {
    const normalized = theme === 'light' ? 'light' : 'dark';
    rootEl.setAttribute('data-theme', normalized);

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', normalized === 'dark' ? '#09090F' : '#F8FAFC');
    }

    // Update header/mobile toggle buttons
    themeToggleBtns.forEach((btn) => {
      btn.setAttribute('aria-pressed', String(normalized === 'dark'));
      btn.setAttribute(
        'aria-label',
        normalized === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'
      );
    });

    // Update text labels
    themeLabels.forEach((el) => {
      el.textContent = normalized === 'dark' ? 'Light Mode' : 'Dark Mode';
    });

    themeShortLabels.forEach((el) => {
      el.textContent = normalized === 'dark' ? 'Dark' : 'Light';
    });

    // Update footer segmented control buttons
    themeSegmentBtns.forEach((btn) => {
      const btnTheme = btn.getAttribute('data-set-theme');
      btn.setAttribute('aria-pressed', String(btnTheme === normalized));
    });

    if (persist) {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, normalized);
      } catch (err) {
        // Ignore storage errors in restricted environments
      }
    }
  }

  // Initialize theme UI controls on page load
  applyTheme(getCurrentTheme(), false);

  // Header & mobile toggle buttons
  themeToggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme, true);
    });
  });

  // Footer segmented Light Mode / Dark Mode buttons
  themeSegmentBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTheme = btn.getAttribute('data-set-theme');
      if (targetTheme === 'light' || targetTheme === 'dark') {
        applyTheme(targetTheme, true);
      }
    });
  });

  // Listen for OS theme changes if user hasn't manually overridden
  if (window.matchMedia) {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: light)');
    colorSchemeQuery.addEventListener('change', (e) => {
      try {
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
          applyTheme(e.matches ? 'light' : 'dark', false);
        }
      } catch (err) {
        applyTheme(e.matches ? 'light' : 'dark', false);
      }
    });
  }

  /* ==========================================================================
     2. MOBILE BURGER MENU NAVIGATION
     ========================================================================== */
  const burgerBtn = document.getElementById('burger-btn');
  const mainNav = document.getElementById('main-nav');

  function setMobileMenuState(isOpen) {
    if (!burgerBtn || !mainNav) return;
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
    burgerBtn.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation menu' : 'Open navigation menu'
    );
    mainNav.classList.toggle('is-open', isOpen);
  }

  if (burgerBtn && mainNav) {
    burgerBtn.addEventListener('click', () => {
      const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
      setMobileMenuState(!isExpanded);
    });

    // Close menu when clicking any navigation link inside it
    const navLinks = mainNav.querySelectorAll('a.nav-link, [data-open-modal]');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        setMobileMenuState(false);
      });
    });

    // Close menu when clicking outside header
    document.addEventListener('click', (event) => {
      const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
      if (
        isExpanded &&
        !mainNav.contains(event.target) &&
        !burgerBtn.contains(event.target)
      ) {
        setMobileMenuState(false);
      }
    });
  }

  /* ==========================================================================
     3. TARIFF PLAN SELECTION -> AUTO-FILL BOOKING FORM
     ========================================================================== */
  const choosePlanBtns = document.querySelectorAll('[data-choose-plan]');
  const bookingSection = document.getElementById('booking');
  const workspacePlanSelect = document.getElementById('workspace-plan');
  const zoneSelect = document.getElementById('zone-selection');

  choosePlanBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedPlan = btn.getAttribute('data-choose-plan');
      const defaultZone = btn.getAttribute('data-default-zone');

      if (workspacePlanSelect && selectedPlan) {
        workspacePlanSelect.value = selectedPlan;
        workspacePlanSelect.classList.add('is-touched');
        workspacePlanSelect.classList.remove('plan-highlighted');
        // Trigger reflow to restart highlight animation
        void workspacePlanSelect.offsetWidth;
        workspacePlanSelect.classList.add('plan-highlighted');
      }

      if (zoneSelect && defaultZone && !zoneSelect.value) {
        zoneSelect.value = defaultZone;
        zoneSelect.classList.add('is-touched');
      }

      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ==========================================================================
     4. FORM VALIDATION (BOOKING FORM & TEST DAY FORM)
     ========================================================================== */
  const DEMO_SUCCESS_MESSAGE =
    'Demo request submitted successfully. No real reservation has been created.';
  const PHONE_REGEX = /^\+?[0-9\s\-\(\)]{10,18}$/;

  // Set default date inputs to today's date in YYYY-MM-DD
  function initializeDefaultDates() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;

    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach((input) => {
      input.setAttribute('min', formattedDate);
      if (!input.value) {
        input.value = formattedDate;
      }
    });
  }

  initializeDefaultDates();

  /**
   * Attaches interaction listeners (.is-touched) so untouched inputs don't show red errors on load
   * @param {HTMLFormElement} form
   */
  function attachFieldInteractionHandlers(form) {
    const controls = form.querySelectorAll('.form-control');
    controls.forEach((control) => {
      control.addEventListener('blur', () => {
        if (control.value.trim() !== '') {
          control.classList.add('is-touched');
        }
        validateSingleControl(control, form);
      });

      control.addEventListener('input', () => {
        if (control.classList.contains('is-touched') || form.classList.contains('was-validated')) {
          validateSingleControl(control, form);
        }
      });

      control.addEventListener('change', () => {
        control.classList.add('is-touched');
        validateSingleControl(control, form);
      });
    });
  }

  /**
   * Validates custom constraints (phone pattern & time interval) on a control
   * @param {HTMLElement} control
   * @param {HTMLFormElement} form
   */
  function validateSingleControl(control, form) {
    if (control.type === 'tel') {
      const val = control.value.trim();
      const digitsCount = val.replace(/\D/g, '').length;
      if (!PHONE_REGEX.test(val) || digitsCount < 10 || digitsCount > 15) {
        control.setCustomValidity('Please enter a valid phone number (10 to 15 digits).');
        control.classList.add('is-invalid-custom');
      } else {
        control.setCustomValidity('');
        control.classList.remove('is-invalid-custom');
      }
    }

    // Check time interval if inside booking form
    if (form.id === 'booking-form' && (control.id === 'start-time' || control.id === 'end-time')) {
      validateTimeInterval(form);
    }
  }

  /**
   * Ensures End Time is strictly later than Start Time
   * @param {HTMLFormElement} form
   * @returns {boolean}
   */
  function validateTimeInterval(form) {
    const startInput = form.querySelector('#start-time');
    const endInput = form.querySelector('#end-time');
    if (!startInput || !endInput) return true;

    const startVal = startInput.value;
    const endVal = endInput.value;

    if (startVal && endVal && endVal <= startVal) {
      endInput.setCustomValidity('End time must be later than start time.');
      endInput.classList.add('is-invalid-custom');
      return false;
    } else {
      endInput.setCustomValidity('');
      endInput.classList.remove('is-invalid-custom');
      return true;
    }
  }

  // Booking Form Submission
  const bookingForm = document.getElementById('booking-form');
  const bookingStatus = document.getElementById('booking-status');

  if (bookingForm) {
    attachFieldInteractionHandlers(bookingForm);

    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      bookingForm.classList.add('was-validated');

      // Validate all controls including custom phone and time interval checks
      const controls = bookingForm.querySelectorAll('.form-control');
      controls.forEach((ctrl) => {
        ctrl.classList.add('is-touched');
        validateSingleControl(ctrl, bookingForm);
      });

      const isTimeValid = validateTimeInterval(bookingForm);
      const isFormValid = bookingForm.checkValidity() && isTimeValid;

      if (!isFormValid) {
        if (bookingStatus) {
          bookingStatus.hidden = false;
          bookingStatus.className = 'form-status-banner is-error';
          bookingStatus.textContent =
            'Please check the highlighted fields and ensure End Time is later than Start Time.';
        }
        const firstInvalid = bookingForm.querySelector(':invalid, .is-invalid-custom');
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      // Show Demo Success Message without page reload
      if (bookingStatus) {
        bookingStatus.hidden = false;
        bookingStatus.className = 'form-status-banner is-success';
        bookingStatus.textContent = DEMO_SUCCESS_MESSAGE;
      }

      // Reset form interaction states after successful demo submission
      bookingForm.reset();
      bookingForm.classList.remove('was-validated');
      controls.forEach((ctrl) => {
        ctrl.classList.remove('is-touched', 'is-invalid-custom');
        ctrl.setCustomValidity('');
      });
      initializeDefaultDates();
      const startInput = bookingForm.querySelector('#start-time');
      const endInput = bookingForm.querySelector('#end-time');
      if (startInput) startInput.value = '09:00';
      if (endInput) endInput.value = '18:00';
    });
  }

  // Test Day Modal Form Submission
  const testDayForm = document.getElementById('test-day-form');
  const testDayStatus = document.getElementById('test-day-status');

  if (testDayForm) {
    attachFieldInteractionHandlers(testDayForm);

    testDayForm.addEventListener('submit', (event) => {
      event.preventDefault();
      testDayForm.classList.add('was-validated');

      const controls = testDayForm.querySelectorAll('.form-control');
      controls.forEach((ctrl) => {
        ctrl.classList.add('is-touched');
        validateSingleControl(ctrl, testDayForm);
      });

      if (!testDayForm.checkValidity()) {
        if (testDayStatus) {
          testDayStatus.hidden = false;
          testDayStatus.className = 'form-status-banner is-error';
          testDayStatus.textContent = 'Please fill in all required fields with valid information.';
        }
        const firstInvalid = testDayForm.querySelector(':invalid, .is-invalid-custom');
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      if (testDayStatus) {
        testDayStatus.hidden = false;
        testDayStatus.className = 'form-status-banner is-success';
        testDayStatus.textContent = DEMO_SUCCESS_MESSAGE;
      }

      testDayForm.reset();
      testDayForm.classList.remove('was-validated');
      controls.forEach((ctrl) => {
        ctrl.classList.remove('is-touched', 'is-invalid-custom');
        ctrl.setCustomValidity('');
      });
      initializeDefaultDates();
    });
  }

  /* ==========================================================================
     5. ACCESSIBLE MODAL SYSTEM (TEST DAY, EVENTS & FOOTER LEGAL DOCS)
     ========================================================================== */
  let activeModal = null;
  let lastFocusedElement = null;

  const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  /**
   * Opens a modal dialog by element reference and traps focus
   * @param {HTMLElement} modalEl
   */
  function openModal(modalEl) {
    if (!modalEl) return;
    lastFocusedElement = document.activeElement;
    activeModal = modalEl;
    modalEl.hidden = false;
    document.body.style.overflow = 'hidden';

    // Focus the first focusable element inside the modal
    const focusables = modalEl.querySelectorAll(FOCUSABLE_SELECTOR);
    if (focusables.length > 0) {
      focusables[0].focus();
    }
  }

  /**
   * Closes the currently active modal and restores focus
   */
  function closeModal() {
    if (!activeModal) return;
    activeModal.hidden = true;
    document.body.style.overflow = '';

    // Hide status banner when closing Test Day modal
    if (activeModal.id === 'test-day-modal' && testDayStatus) {
      testDayStatus.hidden = true;
    }

    const elementToRestore = lastFocusedElement;
    activeModal = null;
    lastFocusedElement = null;

    if (elementToRestore && typeof elementToRestore.focus === 'function') {
      elementToRestore.focus();
    }
  }

  // Trigger buttons for Test Day Modal
  const openModalBtns = document.querySelectorAll('[data-open-modal]');
  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-open-modal');
      const modalEl = document.getElementById(targetId);
      if (modalEl) {
        openModal(modalEl);
      }
    });
  });

  // Close buttons inside modals
  const closeModalBtns = document.querySelectorAll('[data-close-modal]');
  closeModalBtns.forEach((btn) => {
    btn.addEventListener('click', closeModal);
  });

  // Close on backdrop click
  const modalBackdrops = document.querySelectorAll('.modal-backdrop');
  modalBackdrops.forEach((backdrop) => {
    backdrop.addEventListener('click', (event) => {
      if (event.target === backdrop) {
        closeModal();
      }
    });
  });

  // Keyboard navigation: Escape to close modal/menu, Tab to trap focus inside active modal
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (activeModal) {
        event.preventDefault();
        closeModal();
        return;
      }
      if (burgerBtn && burgerBtn.getAttribute('aria-expanded') === 'true') {
        event.preventDefault();
        setMobileMenuState(false);
        burgerBtn.focus();
      }
    }

    if (event.key === 'Tab' && activeModal) {
      const focusables = Array.from(activeModal.querySelectorAll(FOCUSABLE_SELECTOR));
      if (focusables.length === 0) return;

      const firstFocusable = focusables[0];
      const lastFocusable = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  });

  /* ==========================================================================
     6. DYNAMIC CONTENT FOR EVENTS ("LEARN MORE") & FOOTER INFO DOCS
     ========================================================================== */
  const infoModal = document.getElementById('info-modal');
  const infoModalTag = document.getElementById('info-modal-tag');
  const infoModalTitle = document.getElementById('info-modal-title');
  const infoModalBody = document.getElementById('info-modal-body');
  const infoModalActionBtn = document.getElementById('info-modal-action-btn');

  const EVENT_DATA = {
    networking: {
      tag: 'SAMPLE COMMUNITY EVENT',
      title: 'Tech Networking Night',
      html: `
        <p><strong>Demonstration Schedule:</strong> Thursday, November 14 &bull; 19:00 – 21:30 (Sample Event)</p>
        <p><strong>Location:</strong> NEXUS Workspace Main Lounge (Almaty Hub)</p>
        <p>Connect with software engineers, full-stack web developers, UI/UX designers, and startup founders in an informal evening setting.</p>
        <h3>Sample Agenda</h3>
        <ul>
          <li><strong>19:00:</strong> Welcome specialty coffee &amp; community introductions</li>
          <li><strong>19:30:</strong> Lightning talks (5-minute product &amp; open-source demos)</li>
          <li><strong>20:15:</strong> Open networking &amp; founder matchmaking</li>
        </ul>
        <p><em>Note: This event description is demonstration content for the ICT6001 academic project.</em></p>
      `
    },
    'ai-workshop': {
      tag: 'SAMPLE TECHNICAL WORKSHOP',
      title: 'AI & Machine Learning Workshop',
      html: `
        <p><strong>Demonstration Schedule:</strong> Saturday, November 21 &bull; 15:00 – 18:00 (Sample Event)</p>
        <p><strong>Location:</strong> NEXUS Lecture Hall &amp; Meeting Room A</p>
        <p>A practical hands-on session exploring modern Large Language Models, RAG architectures, and production deployment workflows.</p>
        <h3>What You Will Explore</h3>
        <ul>
          <li>Building reliable AI-assisted web applications and agentic workflows</li>
          <li>Optimizing vector search and inference latency for production apps</li>
          <li>Live Q&amp;A with senior ML engineers and product builders</li>
        </ul>
        <p><em>Note: This event description is demonstration content for the ICT6001 academic project.</em></p>
      `
    },
    'pitch-evening': {
      tag: 'SAMPLE FOUNDER SHOWCASE',
      title: 'Startup Pitch Evening',
      html: `
        <p><strong>Demonstration Schedule:</strong> Saturday, November 28 &bull; 18:30 – 21:00 (Sample Event)</p>
        <p><strong>Location:</strong> NEXUS Auditorium Zone</p>
        <p>Early-stage startup teams present 5-minute pitch decks followed by constructive feedback from experienced product leaders and angel investors.</p>
        <h3>Session Highlights</h3>
        <ul>
          <li>6 sample startup pitches across FinTech, EdTech, and SaaS</li>
          <li>Structured Q&amp;A on unit economics, UI/UX, and go-to-market strategy</li>
          <li>Co-founder &amp; developer networking session</li>
        </ul>
        <p><em>Note: This event description is demonstration content for the ICT6001 academic project.</em></p>
      `
    }
  };

  const LEGAL_DOCS = {
    rules: {
      tag: 'COMMUNITY GUIDELINES',
      title: 'Resident Rules',
      html: `
        <p>To keep NEXUS Workspace productive, welcoming, and comfortable 24/7 for every member, all residents and guests follow our core community principles:</p>
        <h3>1. Workspace Zones &amp; Acoustics</h3>
        <ul>
          <li><strong>Quiet Zone:</strong> Dedicated to deep focus and coding. Please keep phone calls and meetings in soundproof booths or Meeting Rooms.</li>
          <li><strong>Open Workspace:</strong> Collaborative conversation at moderate volume is welcome; always use headphones for audio/video calls.</li>
        </ul>
        <h3>2. Security &amp; 24/7 Access</h3>
        <ul>
          <li>Personal smart cards and biometric passes are non-transferable.</li>
          <li>Guests must be registered at the reception desk during staffed hours (08:00 – 21:00).</li>
        </ul>
        <h3>3. Shared Amenities &amp; Respect</h3>
        <ul>
          <li>Leave meeting rooms and hot desks clean and ready for the next specialist.</li>
          <li>Respect network fair-use policies and keep shared kitchen areas tidy.</li>
        </ul>
      `
    },
    privacy: {
      tag: 'LEGAL INFORMATION (DEMO)',
      title: 'Privacy Policy',
      html: `
        <p><strong>Academic Project Notice:</strong> NEXUS Workspace is a static frontend website created for University Lab Work #9 (ICT6001) at IITU, Almaty.</p>
        <h3>1. No Personal Data Collection</h3>
        <ul>
          <li>This website runs entirely in your browser using HTML5, CSS3, and Vanilla JavaScript.</li>
          <li>Form submissions (Booking Form and Test Day Form) are processed locally for demonstration purposes only and are <strong>never</strong> transmitted to any external backend server or database.</li>
        </ul>
        <h3>2. Local Storage Usage</h3>
        <ul>
          <li>We store only your visual theme preference (<code>nexus-theme</code>: Light Mode or Dark Mode) in your browser's <code>localStorage</code> so your selected theme persists across reloads.</li>
        </ul>
      `
    },
    terms: {
      tag: 'LEGAL INFORMATION (DEMO)',
      title: 'Terms of Service',
      html: `
        <p><strong>Academic Demonstration Terms:</strong> All tariffs, workspace plans, addresses, and community events displayed on this website are illustrative examples designed for educational evaluation.</p>
        <h3>1. Demonstration Nature</h3>
        <ul>
          <li>Prices listed in Kazakhstani Tenge (₸) for Hot Desk, Fixed Desk, and Team Office represent sample pricing tiers.</li>
          <li>Submitting a reservation or Test Day request demonstrates client-side HTML5/JS validation and does not create a commercial contract or real booking.</li>
        </ul>
        <h3>2. Intellectual Property</h3>
        <ul>
          <li>Designed and developed as part of the Information and Communication Technologies (ICT6001) course curriculum at International Information Technology University (IITU), Almaty.</li>
        </ul>
      `
    }
  };

  // Event "Learn More" buttons
  const eventBtns = document.querySelectorAll('[data-event-id]');
  eventBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const eventId = btn.getAttribute('data-event-id');
      const data = EVENT_DATA[eventId];
      if (!data || !infoModal) return;

      infoModalTag.textContent = data.tag;
      infoModalTitle.textContent = data.title;
      infoModalBody.innerHTML = data.html;

      if (infoModalActionBtn) {
        infoModalActionBtn.hidden = false;
        infoModalActionBtn.textContent = 'Book Workspace for Event Day';
        infoModalActionBtn.onclick = () => {
          closeModal();
          if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        };
      }

      openModal(infoModal);
    });
  });

  // Footer Information buttons (Resident Rules, Privacy Policy, Terms of Service)
  const infoDocBtns = document.querySelectorAll('[data-info-doc]');
  infoDocBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const docKey = btn.getAttribute('data-info-doc');
      const data = LEGAL_DOCS[docKey];
      if (!data || !infoModal) return;

      infoModalTag.textContent = data.tag;
      infoModalTitle.textContent = data.title;
      infoModalBody.innerHTML = data.html;

      if (infoModalActionBtn) {
        infoModalActionBtn.hidden = true;
        infoModalActionBtn.onclick = null;
      }

      openModal(infoModal);
    });
  });
})();
