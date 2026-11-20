// STEM Portfolio Tab Switching, Smooth Motion, and Sliding Indicator

document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const sections = document.querySelectorAll('.tab-section');
  const tabsNav = document.querySelector('.tabs-nav');
  const tabsContainer = document.querySelector('.tabs-container');
  const indicator = document.querySelector('.tab-indicator');
  const activeFill = document.querySelector('.tab-active-fill');
  const activeShadow = document.querySelector('.tab-active-shadow');

  let currentActiveId = null;
  let transitionTimer = null;

  // ── Update Smooth Sliding Indicator ──
  function updateIndicator(btn, immediate = false) {
    if (!btn) return;
    const left = btn.offsetLeft;
    const width = btn.offsetWidth;
    const transform = `translateX(${left}px) scaleX(${width})`;
    const shadowOffset = activeShadow
      ? Number.parseFloat(window.getComputedStyle(activeShadow).getPropertyValue('--tab-shadow-offset')) || 3
      : 0;
    const movingHighlights = [
      [activeShadow, `translateX(${left + shadowOffset}px) scaleX(${width})`],
      [activeFill, transform],
      [indicator, transform]
    ].filter(([highlight]) => highlight);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (immediate || prefersReducedMotion) {
      movingHighlights.forEach(([highlight, targetTransform]) => {
        highlight.style.transition = 'none';
        highlight.style.transform = targetTransform;
      });
      requestAnimationFrame(() => {
        movingHighlights.forEach(([highlight]) => {
          highlight.style.transition = '';
        });
      });
    } else {
      movingHighlights.forEach(([highlight, targetTransform]) => {
        highlight.style.transform = targetTransform;
      });
    }
  }

  // ── Nav Bar Edge Fade Hints ──
  function updateNavFades() {
    if (!tabsNav || !tabsContainer) return;
    const scrollLeft = tabsContainer.scrollLeft;
    const maxScroll = tabsContainer.scrollWidth - tabsContainer.clientWidth;

    if (scrollLeft > 4) {
      tabsNav.classList.add('can-scroll-left');
    } else {
      tabsNav.classList.remove('can-scroll-left');
    }

    if (maxScroll <= 0 || scrollLeft >= maxScroll - 4) {
      tabsNav.classList.add('at-end');
    } else {
      tabsNav.classList.remove('at-end');
    }
  }

  if (tabsContainer) {
    tabsContainer.addEventListener('scroll', updateNavFades, { passive: true });
    window.addEventListener('resize', updateNavFades);
  }

  // ── Tab Switching with Section Slide & Fade ──
  function switchTab(tabId, immediate = false) {
    const targetSection = document.getElementById(tabId);
    const validTabId = targetSection ? tabId : 'intro';
    const targetSectionElem = document.getElementById(validTabId);

    // Update active tab buttons
    let activeBtn = null;
    tabButtons.forEach(btn => {
      const isTarget = btn.getAttribute('data-tab') === validTabId;
      if (isTarget) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        activeBtn = btn;
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    if (activeBtn) {
      updateIndicator(activeBtn, immediate);
      // Smoothly scroll active tab into view in the nav
      activeBtn.scrollIntoView({
        behavior: immediate ? 'auto' : 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }

    if (validTabId === currentActiveId) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Immediate display (initial load, or reduced-motion preference)
    if (immediate || prefersReducedMotion || !currentActiveId) {
      if (transitionTimer) clearTimeout(transitionTimer);
      sections.forEach(sec => {
        sec.classList.remove('leaving', 'entering');
        if (sec.id === validTabId) {
          sec.classList.add('active');
          sec.removeAttribute('hidden');
        } else {
          sec.classList.remove('active');
          sec.setAttribute('hidden', '');
        }
      });
      currentActiveId = validTabId;
      return;
    }

    // Smooth section transition (fade/slide out old section, fade/slide in new section)
    const oldSectionElem = document.getElementById(currentActiveId);
    if (transitionTimer) {
      clearTimeout(transitionTimer);
      sections.forEach(s => s.classList.remove('leaving', 'entering'));
    }

    if (oldSectionElem && oldSectionElem !== targetSectionElem) {
      oldSectionElem.classList.add('leaving');

      transitionTimer = setTimeout(() => {
        oldSectionElem.classList.remove('active', 'leaving');
        oldSectionElem.setAttribute('hidden', '');

        targetSectionElem.classList.add('entering');
        targetSectionElem.removeAttribute('hidden');
        targetSectionElem.classList.add('active');

        // Force browser reflow to trigger transition
        void targetSectionElem.offsetWidth;

        targetSectionElem.classList.remove('entering');
        currentActiveId = validTabId;
        transitionTimer = null;
      }, 140);
    } else {
      targetSectionElem.removeAttribute('hidden');
      targetSectionElem.classList.add('active');
      currentActiveId = validTabId;
    }
  }

  // ── Handle Tab Button Clicks ──
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');
      if (targetTab) {
        window.location.hash = targetTab;
      }
    });
  });

  // ── Handle URL Hash Navigation ──
  function handleHashChange(immediate = false) {
    const hash = window.location.hash.replace('#', '').trim();
    if (hash) {
      switchTab(hash, immediate);
    } else {
      switchTab('intro', immediate);
    }
  }

  window.addEventListener('hashchange', () => handleHashChange(false));

  // Initialize on page load (immediate, no initial animation delay)
  handleHashChange(true);
  updateNavFades();

  // Re-align indicator on window resize and after custom fonts load
  window.addEventListener('resize', () => {
    const activeBtn = document.querySelector('.tab-btn.active');
    if (activeBtn) updateIndicator(activeBtn, true);
  });

  if (document.fonts) {
    document.fonts.ready.then(() => {
      const activeBtn = document.querySelector('.tab-btn.active');
      if (activeBtn) updateIndicator(activeBtn, true);
      updateNavFades();
    });
  }

  // Replace the desktop overlay scrollbar with a small, draggable folio marker.
  const pageScrollbar = document.querySelector('.page-scrollbar');
  const pageScrollbarThumb = pageScrollbar?.querySelector('.page-scrollbar__thumb');
  const desktopScrollbar = window.matchMedia('(min-width: 761px)');

  if (pageScrollbar && pageScrollbarThumb) {
    let scrollMetrics = null;
    let dragState = null;
    let updateQueued = false;

    function updatePageScrollbar() {
      updateQueued = false;
      const isDesktop = desktopScrollbar.matches;
      document.documentElement.classList.toggle('has-custom-scrollbar', isDesktop);
      document.body.classList.toggle('has-custom-scrollbar', isDesktop);

      const doc = document.documentElement;
      const maxScroll = Math.max(0, Math.max(doc.scrollHeight, document.body.scrollHeight) - window.innerHeight);
      if (!isDesktop || maxScroll <= 1) {
        pageScrollbar.hidden = true;
        scrollMetrics = null;
        return;
      }

      pageScrollbar.hidden = false;
      const trackHeight = pageScrollbar.clientHeight;
      const thumbHeight = Math.min(trackHeight, Math.max(58, trackHeight * window.innerHeight / (maxScroll + window.innerHeight)));
      const maxThumbTop = Math.max(0, trackHeight - thumbHeight);
      const thumbTop = maxScroll ? window.scrollY / maxScroll * maxThumbTop : 0;

      scrollMetrics = { maxScroll, maxThumbTop, thumbHeight, thumbTop };
      pageScrollbarThumb.style.height = `${thumbHeight}px`;
      pageScrollbarThumb.style.transform = `translate3d(0, ${thumbTop}px, 0)`;
    }

    function queueScrollbarUpdate() {
      if (updateQueued) return;
      updateQueued = true;
      requestAnimationFrame(updatePageScrollbar);
    }

    function scrollFromThumbPosition(top) {
      if (!scrollMetrics || scrollMetrics.maxThumbTop <= 0) return;
      const progress = Math.min(1, Math.max(0, top / scrollMetrics.maxThumbTop));
      window.scrollTo(0, progress * scrollMetrics.maxScroll);
    }

    pageScrollbar.addEventListener('pointerdown', event => {
      if (!scrollMetrics) return;
      event.preventDefault();
      pageScrollbar.setPointerCapture(event.pointerId);

      if (event.target === pageScrollbarThumb) {
        dragState = { pointerY: event.clientY, thumbTop: scrollMetrics.thumbTop };
        pageScrollbar.classList.add('is-dragging');
      } else {
        const trackTop = pageScrollbar.getBoundingClientRect().top;
        const desiredTop = event.clientY - trackTop - scrollMetrics.thumbHeight / 2;
        scrollFromThumbPosition(desiredTop);
        dragState = {
          pointerY: event.clientY,
          thumbTop: Math.min(scrollMetrics.maxThumbTop, Math.max(0, desiredTop))
        };
        pageScrollbar.classList.add('is-dragging');
      }
    });

    pageScrollbar.addEventListener('pointermove', event => {
      if (!dragState || !scrollMetrics) return;
      const nextTop = dragState.thumbTop + event.clientY - dragState.pointerY;
      scrollFromThumbPosition(nextTop);
    });

    function endScrollbarDrag() {
      dragState = null;
      pageScrollbar.classList.remove('is-dragging');
    }

    pageScrollbar.addEventListener('pointerup', endScrollbarDrag);
    pageScrollbar.addEventListener('pointercancel', endScrollbarDrag);
    window.addEventListener('scroll', queueScrollbarUpdate, { passive: true });
    window.addEventListener('resize', queueScrollbarUpdate);
    desktopScrollbar.addEventListener('change', queueScrollbarUpdate);

    if ('ResizeObserver' in window) {
      const pageResizeObserver = new ResizeObserver(queueScrollbarUpdate);
      pageResizeObserver.observe(document.body);
      pageResizeObserver.observe(document.querySelector('.main-container'));
    }

    const pageMutationObserver = new MutationObserver(queueScrollbarUpdate);
    pageMutationObserver.observe(document.querySelector('.main-container'), {
      attributes: true,
      childList: true,
      subtree: true
    });

    updatePageScrollbar();
  }
});
