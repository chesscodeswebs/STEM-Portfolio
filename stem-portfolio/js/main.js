const navContainer = document.getElementById("nav");
const contentContainer = document.getElementById("content");

function buildNavigation() {
  navContainer.innerHTML = "";

  const navList = document.createElement("ul");
  navList.className = "nav-list";

  sections.forEach(function(section) {
    const navItem = document.createElement("li");
    navItem.className = "nav-item";

    const link = document.createElement("a");
    link.href = "#" + section.id;
    link.className = "nav-button";
    link.textContent = section.title;
    link.setAttribute("data-section-id", section.id);

    navItem.appendChild(link);
    navList.appendChild(navItem);
  });

  navContainer.appendChild(navList);
}

/**
 * Step 2: Render the Active Section Based on the URL Hash
 * Reads the current URL hash, finds the matching section, and renders it into #content.
 */
function renderActiveSection() {
  // Extract the hash from the URL and remove the leading '#' symbol
  let currentHash = window.location.hash.replace("#", "").trim();

  // If no hash is set in the URL (or it doesn't match any section), default to the first section (Introduction)
  let activeSection = sections.find(function(sec) {
    return sec.id === currentHash;
  });

  if (!activeSection) {
    activeSection = sections[0]; // Introduction is sections[0]
  }

  // Render the section's HTML into our <main id="content"> container
  contentContainer.innerHTML = activeSection.render();

  // Update the page title in the browser tab to reflect current section
  document.title = activeSection.title + " | " + portfolioData.fullName + " - STEM Portfolio";

  // Highlight the active button in the top navigation bar
  highlightNavButton(activeSection.id);

  // Scroll smoothly to the top of the content so the user sees the new section from the beginning
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Step 3: Highlight the Active Nav Button
 * Adds the 'active' CSS class to the matching button and removes it from all others.
 */
function highlightNavButton(activeId) {
  const allNavButtons = navContainer.querySelectorAll(".nav-button");

  allNavButtons.forEach(function(btn) {
    if (btn.getAttribute("data-section-id") === activeId) {
      btn.classList.add("active");
      btn.setAttribute("aria-current", "page");
    } else {
      btn.classList.remove("active");
      btn.removeAttribute("aria-current");
    }
  });
}

/**
 * Step 4: Event Listeners
 *
 * - 'hashchange': Fires whenever the URL hash changes (like when clicking a nav button,
 *   clicking a link in the Table of Contents, or using the browser's Back/Forward buttons).
 * - Initial call: Builds the nav and loads the initial section as soon as the scripts run.
 */

// Listen for hash changes to switch sections without reloading the page
window.addEventListener("hashchange", renderActiveSection);

// Initialize the site
buildNavigation();
renderActiveSection();

