/**
 * SECTIONS CONFIGURATION
 * -----------------------------------------------------------------------------
 * Defines all 9 sections of the portfolio in the exact required order.
 * Each section has:
 *  - id: A unique string used in the URL hash (e.g. #intro, #field-experiences)
 *  - title: The friendly display title shown in navigation and headers
 *  - render: A function that returns the HTML string for that section
 * -----------------------------------------------------------------------------
 */

const sections = [
  // 1. INTRODUCTION SECTION
  {
    id: "introduction",
    title: "Introduction",
    render: function() {
      return `
        <article class="section-card intro-card">
          <!-- Profile Header with Photo & Basic Info -->
          <div class="intro-header">
            <div class="profile-image-container">
              <!-- Profile Headshot with automatic fallback if the file is missing -->
              <img 
                src="${portfolioData.headshotUrl}" 
                alt="${portfolioData.fullName}'s Headshot" 
                class="profile-image"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
              >
              <!-- Fallback avatar shown if headshot.jpg hasn't been added yet -->
              <div class="profile-fallback-avatar" style="display: none;" title="Headshot placeholder: Add images/headshot.jpg to display your photo">
                <span class="fallback-icon">🎓</span>
                <span class="fallback-text">Photo Pending</span>
              </div>
            </div>

            <div class="intro-title-group">
              <span class="badge">STEM Senior Portfolio</span>
              <h1 class="student-name">${portfolioData.fullName}</h1>
              <p class="grad-year">Class of ${portfolioData.graduationYear} &bull; STEM Academy</p>
              <p class="bio-text">${portfolioData.bio}</p>
            </div>
          </div>

          <!-- Divider -->
          <hr class="section-divider">

          <!-- Core Reflections Grid -->
          <section class="reflections-area">
            <h2 class="reflections-heading">Foundational Reflections</h2>
            <div class="reflections-grid">
              
              <!-- Reflection Card 1 -->
              <div class="reflection-card">
                <div class="reflection-icon">🎯</div>
                <h3>Why I Joined the STEM Program</h3>
                <p>${portfolioData.reflections.whyJoinedStem}</p>
              </div>

              <!-- Reflection Card 2 -->
              <div class="reflection-card">
                <div class="reflection-icon">💡</div>
                <h3>Key Takeaways from My Experience</h3>
                <p>${portfolioData.reflections.keyTakeaways}</p>
              </div>

              <!-- Reflection Card 3 -->
              <div class="reflection-card">
                <div class="reflection-icon">🌱</div>
                <h3>Growth & Mindset Evolution</h3>
                <p>${portfolioData.reflections.goalsGrowth}</p>
              </div>

            </div>
          </section>
        </article>
      `;
    }
  },

  // 2. TABLE OF CONTENTS
  {
    id: "table-of-contents",
    title: "Table of Contents",
    render: function() {
      // Generate a list of clickable links to every other section dynamically
      const linksHtml = sections
        .filter(function(sec) {
          // Exclude the Table of Contents itself from the list
          return sec.id !== "table-of-contents";
        })
        .map(function(sec, index) {
          return `
            <li class="toc-item">
              <a href="#${sec.id}" class="toc-link">
                <span class="toc-number">0${index + 1}</span>
                <span class="toc-text">${sec.title}</span>
                <span class="toc-arrow">&rarr;</span>
              </a>
            </li>
          `;
        })
        .join("");

      return `
        <article class="section-card">
          <header class="section-header">
            <span class="badge">Portfolio Overview</span>
            <h2>Table of Contents</h2>
            <p class="section-subtitle">Navigate through each requirement of the high school STEM Senior Portfolio.</p>
          </header>
          <ul class="toc-list">
            ${linksHtml}
          </ul>
        </article>
      `;
    }
  },

  // 3. FIELD EXPERIENCES / ENRICHMENT TRIPS
  {
    id: "field-experiences",
    title: "Field Experiences/Enrichment Trips",
    render: function() {
      return `
        <article class="section-card">
          <header class="section-header">
            <span class="badge badge-pending">Work in Progress</span>
            <h2>Field Experiences & Enrichment Trips</h2>
            <p class="section-subtitle">Real-world site visits, research laboratory tours, and academic enrichment.</p>
          </header>

          <div class="placeholder-box">
            <div class="placeholder-icon">📍</div>
            <h3>Section Blueprint & Requirements</h3>
            <p>
              This section will document <strong>6 individual field experience entries</strong>. 
              Each entry will provide:
            </p>
            <ul class="placeholder-checklist">
              <li><strong>Overview Paragraph:</strong> Location, organization, STEM focus, and mission of the site visited.</li>
              <li><strong>Reflective Analysis:</strong> Key lessons learned, technical processes observed, and connections to classroom STEM concepts.</li>
              <li><strong>Visual Documentation:</strong> High-resolution photos from the experience showcasing equipment, tours, and collaborative activities.</li>
            </ul>
            <div class="callout-note">
              <strong>Status:</strong> Template prepared. Field logs and photo artifacts will be populated ahead of the final presentation.
            </div>
          </div>
        </article>
      `;
    }
  },

  // 4. PERSONAL GROWTH / EXTRACURRICULAR STEM ACTIVITIES
  {
    id: "extracurriculars",
    title: "Personal Growth/Extracurricular STEM Activities",
    render: function() {
      return `
        <article class="section-card">
          <header class="section-header">
            <span class="badge badge-pending">Work in Progress</span>
            <h2>Personal Growth & Extracurricular STEM Activities</h2>
            <p class="section-subtitle">Club leadership, engineering competitions, hackathons, and independent STEM pursuits.</p>
          </header>

          <div class="placeholder-box">
            <div class="placeholder-icon">🚀</div>
            <h3>Section Blueprint & Requirements</h3>
            <p>
              This section will highlight active involvement beyond the standard curriculum, emphasizing sustained commitment and leadership.
            </p>
            <ul class="placeholder-checklist">
              <li><strong>Organizations & Teams:</strong> Robotics Team (FRC/FTC), Science Olympiad, Coding Club, Math League, or Maker spaces.</li>
              <li><strong>Leadership & Contributions:</strong> Roles held, peer mentoring, competition challenges tackled, and team problem-solving.</li>
              <li><strong>Personal Reflection:</strong> How these collaborative experiences cultivated perseverance, teamwork, and engineering mindset.</li>
            </ul>
            <div class="callout-note">
              <strong>Status:</strong> Template prepared. Activity summaries and achievement logs will be inserted here.
            </div>
          </div>
        </article>
      `;
    }
  },

  // 5. VOLUNTEERING IN STEM CONTEXTS
  {
    id: "volunteering",
    title: "Volunteering in STEM Contexts",
    render: function() {
      return `
        <article class="section-card">
          <header class="section-header">
            <span class="badge badge-pending">Work in Progress</span>
            <h2>Volunteering in STEM Contexts</h2>
            <p class="section-subtitle">Giving back through STEM education, peer tutoring, and community outreach.</p>
          </header>

          <div class="placeholder-box">
            <div class="placeholder-icon">🤝</div>
            <h3>Section Blueprint & Requirements</h3>
            <p>
              This section will detail service hours dedicated to advancing STEM literacy and supporting local community partners.
            </p>
            <ul class="placeholder-checklist">
              <li><strong>Service Initiatives:</strong> Middle school STEM workshops, library coding events, math tutoring, or elementary science fairs.</li>
              <li><strong>Impact Metrics:</strong> Total verified hours logged, audiences engaged, and workshops led.</li>
              <li><strong>Community Reflection:</strong> How sharing STEM knowledge reinforced personal understanding and inspired younger learners.</li>
            </ul>
            <div class="callout-note">
              <strong>Status:</strong> Template prepared. Volunteer logs and supervisor verification artifacts will be added here.
            </div>
          </div>
        </article>
      `;
    }
  },

  // 6. OUTSTANDING PROJECTS
  {
    id: "projects",
    title: "Outstanding Projects",
    render: function() {
      return `
        <article class="section-card">
          <header class="section-header">
            <span class="badge badge-pending">Work in Progress</span>
            <h2>Outstanding Projects</h2>
            <p class="section-subtitle">Comprehensive capstone projects, engineering design challenges, and software applications.</p>
          </header>

          <div class="placeholder-box">
            <div class="placeholder-icon">⚙️</div>
            <h3>Section Blueprint & Requirements</h3>
            <p>
              This section will showcase premier engineering and scientific projects completed throughout high school.
            </p>
            <ul class="placeholder-checklist">
              <li><strong>Project Overviews:</strong> Problem statements, constraints, target end-users, and functional requirements.</li>
              <li><strong>Engineering Design Process:</strong> Research, CAD modeling, circuit schematics, prototypes, testing data, and iterations.</li>
              <li><strong>Deliverables:</strong> Demonstration videos, source code repositories, poster boards, and final prototype photographs.</li>
            </ul>
            <div class="callout-note">
              <strong>Status:</strong> Template prepared. Detailed project case studies and design documentation will be inserted here.
            </div>
          </div>
        </article>
      `;
    }
  },

  // 7. JOB SHADOWING / INTERNSHIP
  {
    id: "internship",
    title: "Job Shadowing/Internship",
    render: function() {
      return `
        <article class="section-card">
          <header class="section-header">
            <span class="badge badge-pending">Work in Progress</span>
            <h2>Job Shadowing & Internship</h2>
            <p class="section-subtitle">Professional workplace immersion and mentorship from practicing industry engineers and scientists.</p>
          </header>

          <div class="placeholder-box">
            <div class="placeholder-icon">🏢</div>
            <h3>Section Blueprint & Requirements</h3>
            <p>
              This section will chronicle on-site industry experience, professional mentorship, and technical observations.
            </p>
            <ul class="placeholder-checklist">
              <li><strong>Host Partner:</strong> Company overview, department focus, engineering discipline, and mentor credentials.</li>
              <li><strong>Observations & Tasks:</strong> Daily shadowing logs, professional workflow tools observed, and hands-on contributions.</li>
              <li><strong>Career Insight:</strong> Synthesis of educational pathways, industry workplace culture, and career trajectory goals.</li>
            </ul>
            <div class="callout-note">
              <strong>Status:</strong> Template prepared. Placement documentation and mentor evaluations will be featured here.
            </div>
          </div>
        </article>
      `;
    }
  },

  // 8. EMPLOYABILITY SKILLS EVIDENCE
  {
    id: "employability-skills",
    title: "Employability Skills Evidence",
    render: function() {
      return `
        <article class="section-card">
          <header class="section-header">
            <span class="badge badge-pending">Work in Progress</span>
            <h2>Employability Skills Evidence</h2>
            <p class="section-subtitle">Demonstrated competencies in professional workplace readiness and career standards.</p>
          </header>

          <div class="placeholder-box">
            <div class="placeholder-icon">📊</div>
            <h3>Section Blueprint & Requirements</h3>
            <p>
              This section will provide evidence aligned with high-priority 21st-century workforce competencies.
            </p>
            <ul class="placeholder-checklist">
              <li><strong>Communication:</strong> Technical presentations, formal lab writeups, and project documentation clarity.</li>
              <li><strong>Critical Thinking & Problem Solving:</strong> Diagnostic troubleshooting, mathematical modeling, and data-driven decisions.</li>
              <li><strong>Collaboration & Leadership:</strong> Multi-member team dynamics, conflict resolution, and accountability.</li>
              <li><strong>Professional Work Ethic:</strong> Project timeline management, punctuality, safety compliance, and adaptability.</li>
            </ul>
            <div class="callout-note">
              <strong>Status:</strong> Template prepared. Rubrics, performance evaluations, and artifact badges will be embedded here.
            </div>
          </div>
        </article>
      `;
    }
  },

  // 9. RESUME
  {
    id: "resume",
    title: "Resume",
    render: function() {
      return `
        <article class="section-card">
          <header class="section-header">
            <span class="badge badge-pending">Work in Progress</span>
            <h2>Curriculum Vitae / Resume</h2>
            <p class="section-subtitle">Formal summary of academic standing, STEM coursework, skills, and honors.</p>
          </header>

          <div class="placeholder-box">
            <div class="placeholder-icon">📄</div>
            <h3>Section Blueprint & Requirements</h3>
            <p>
              This section will host an embedded, viewable resume along with a one-click PDF download link for evaluators and partners.
            </p>
            <ul class="placeholder-checklist">
              <li><strong>Education & GPA:</strong> STEM concentration coursework, AP/Honors STEM courses, expected graduation date.</li>
              <li><strong>Technical Skills:</strong> Programming languages, CAD software (SolidWorks/Fusion 360), lab equipment, and manufacturing tools.</li>
              <li><strong>Certifications & Honors:</strong> Industry certifications, academic honor societies, science fair awards, and distinctions.</li>
            </ul>
            <div class="callout-note">
              <strong>Status:</strong> Template prepared. Formatted resume text and downloadable PDF attachment will be linked here.
            </div>
          </div>
        </article>
      `;
    }
  }
];

