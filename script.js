// STEM Portfolio Tab Switching & Hash Navigation

document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const sections = document.querySelectorAll('.tab-section');

  function switchTab(tabId) {
    // If target section doesn't exist, fallback to 'intro'
    const targetSection = document.getElementById(tabId);
    const validTabId = targetSection ? tabId : 'intro';

    // Update tab sections
    sections.forEach(section => {
      if (section.id === validTabId) {
        section.classList.add('active');
        section.removeAttribute('hidden');
      } else {
        section.classList.remove('active');
        section.setAttribute('hidden', '');
      }
    });

    // Update tab navigation buttons
    tabButtons.forEach(btn => {
      const isTarget = btn.getAttribute('data-tab') === validTabId;
      if (isTarget) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });
  }

  // Handle Tab Button Clicks
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');
      if (targetTab) {
        window.location.hash = targetTab;
      }
    });
  });

  // Handle Hash Navigation (direct links, Table of Contents, and Back/Forward buttons)
  function handleHashChange() {
    const hash = window.location.hash.replace('#', '').trim();
    if (hash) {
      switchTab(hash);
    } else {
      switchTab('intro');
    }
  }

  window.addEventListener('hashchange', handleHashChange);

  // Initialize on page load
  handleHashChange();
});
