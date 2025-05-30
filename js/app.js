/**
 * Assembly SOP Generator - Main Application JavaScript
 * Updated for new navigation structure with separate Database section
 */

// Application state
const app = {
    currentSection: 0,
    totalSections: 5, // Updated to 5 sections: Basic Info, BOM, Safety, Assembly, Preview
    sections: ['basic-info', 'bom', 'safety', 'assembly', 'preview-section'], // Updated section IDs
    databaseSection: 'database', // Separate database section
    initialized: false
};

// DOM elements
const elements = {
    prevButton: null,
    nextButton: null,
    generateButton: null,
    progressFill: null,
    currentStepSpan: null,
    previewToggle: null,
    previewPanel: null,
    navToggle: null,
    navList: null,
    currentDateSpan: null
};

/**
 * Initialize the application
 */
function initializeApp() {
    if (app.initialized) return;
    
    // Cache DOM elements
    cacheElements();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize UI state
    initializeUI();
    
    app.initialized = true;
    console.log('Assembly SOP Generator initialized');
}

/**
 * Cache frequently used DOM elements
 */
function cacheElements() {
    elements.prevButton = document.getElementById('prev-section');
    elements.nextButton = document.getElementById('next-section');
    elements.generateButton = document.getElementById('generate-sop');
    elements.progressFill = document.querySelector('.progress-fill');
    elements.currentStepSpan = document.getElementById('current-step');
    elements.previewToggle = document.getElementById('preview-toggle');
    elements.previewPanel = document.getElementById('preview-panel');
    elements.navToggle = document.querySelector('.nav-toggle');
    elements.navList = document.getElementById('main-nav');
    elements.currentDateSpan = document.querySelector('.current-date');
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
    // Section navigation
    if (elements.prevButton) {
        elements.prevButton.addEventListener('click', () => navigateSection(-1));
    }
    
    if (elements.nextButton) {
        elements.nextButton.addEventListener('click', () => navigateSection(1));
    }
    
    // Preview panel toggle
    if (elements.previewToggle) {
        elements.previewToggle.addEventListener('click', togglePreviewPanel);
    }
    
    // Mobile navigation toggle
    if (elements.navToggle && elements.navList) {
        elements.navToggle.addEventListener('click', () => {
            const isOpen = elements.navList.classList.contains('open');
            
            if (isOpen) {
                elements.navList.classList.remove('open');
                elements.navToggle.setAttribute('aria-expanded', 'false');
            } else {
                elements.navList.classList.add('open');
                elements.navToggle.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!elements.navToggle.contains(e.target) && !elements.navList.contains(e.target)) {
                elements.navList.classList.remove('open');
                elements.navToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close mobile nav when pressing Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && elements.navList.classList.contains('open')) {
                elements.navList.classList.remove('open');
                elements.navToggle.setAttribute('aria-expanded', 'false');
                elements.navToggle.focus();
            }
        });
    }
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            console.log(`Navigation clicked: ${link.textContent.trim()} (index: ${index})`);
            
            // Check if this is the Database link (first link)
            if (link.classList.contains('nav-link-database')) {
                console.log('Showing Database section');
                // Show database section (separate from main flow)
                showDatabaseSection();
            } else if (index === navLinks.length - 1) {
                console.log('Toggling Preview panel');
                // This is the Preview link (last link in the nav)
                togglePreviewPanel();
            } else {
                // Regular section navigation
                // Navigation structure: Database(0), Basic Info(1), BOM(2), Safety(3), Assembly(4), Preview(5)
                // Main flow sections: Basic Info(0), BOM(1), Safety(2), Assembly(3), Preview(4)
                const sectionIndex = index - 1; // Subtract 1 because Database is first but not in main flow
                console.log(`Navigating to section index: ${sectionIndex} (${app.sections[sectionIndex]})`);
                if (sectionIndex >= 0 && sectionIndex < app.totalSections) {
                    navigateToSection(sectionIndex);
                }
            }
        });
    });
    
    // Generate SOP button
    if (elements.generateButton) {
        elements.generateButton.addEventListener('click', generateSOP);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Close preview panel when clicking outside
    document.addEventListener('click', (e) => {
        if (elements.previewPanel && 
            elements.previewPanel.classList.contains('open') && 
            !elements.previewPanel.contains(e.target) && 
            !elements.previewToggle.contains(e.target)) {
            closePreviewPanel();
        }
    });
}

/**
 * Initialize UI state
 */
function initializeUI() {
    // Set current date
    if (elements.currentDateSpan) {
        elements.currentDateSpan.textContent = new Date().toLocaleDateString();
    }
    
    // Update progress and navigation
    updateProgress();
    updateNavigation();
    
    // Show first section (Basic Info)
    showSection(0);
}

/**
 * Show database section (separate from main flow)
 */
function showDatabaseSection() {
    // Hide all main flow sections
    app.sections.forEach((sectionId, index) => {
        hideSection(index);
    });
    
    // Show database section
    const databaseSection = document.getElementById(app.databaseSection);
    if (databaseSection) {
        databaseSection.classList.add('active');
    }
    
    // Hide navigation controls for database section
    const navigationControls = document.querySelector('.navigation-controls');
    if (navigationControls) {
        navigationControls.style.display = 'none';
    }
    
    // Hide progress bar for database section
    const progressSection = document.querySelector('.progress-section');
    if (progressSection) {
        progressSection.style.display = 'none';
    }
    
    // Update nav link states
    updateNavLinkStatesForDatabase();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Navigate between sections in main flow
 * @param {number} direction - Direction to navigate (-1 for previous, 1 for next)
 */
function navigateSection(direction) {
    const newSection = app.currentSection + direction;
    
    if (newSection >= 0 && newSection < app.totalSections) {
        navigateToSection(newSection);
    }
}

/**
 * Navigate to a specific section in main flow
 * @param {number} sectionIndex - Index of the section to navigate to
 */
function navigateToSection(sectionIndex) {
    if (sectionIndex < 0 || sectionIndex >= app.totalSections) return;
    
    // Hide database section if it's showing
    const databaseSection = document.getElementById(app.databaseSection);
    if (databaseSection) {
        databaseSection.classList.remove('active');
    }
    
    // Show navigation controls and progress bar
    const navigationControls = document.querySelector('.navigation-controls');
    if (navigationControls) {
        navigationControls.style.display = 'flex';
    }
    
    const progressSection = document.querySelector('.progress-section');
    if (progressSection) {
        progressSection.style.display = 'block';
    }
    
    // Hide current section
    hideSection(app.currentSection);
    
    // Update current section
    app.currentSection = sectionIndex;
    
    // Show new section
    showSection(app.currentSection);
    
    // Update UI
    updateProgress();
    updateNavigation();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Show a specific section
 * @param {number} sectionIndex - Index of the section to show
 */
function showSection(sectionIndex) {
    const sectionId = app.sections[sectionIndex];
    const section = document.getElementById(sectionId);
    
    if (section) {
        section.classList.add('active');
        
        // Update navigation link active state
        updateNavLinkStates(sectionIndex);
    }
}

/**
 * Hide a specific section
 * @param {number} sectionIndex - Index of the section to hide
 */
function hideSection(sectionIndex) {
    const sectionId = app.sections[sectionIndex];
    const section = document.getElementById(sectionId);
    
    if (section) {
        section.classList.remove('active');
    }
}

/**
 * Update progress indicator
 */
function updateProgress() {
    const progressPercentage = ((app.currentSection + 1) / app.totalSections) * 100;
    
    if (elements.progressFill) {
        elements.progressFill.style.width = `${progressPercentage}%`;
        elements.progressFill.setAttribute('aria-valuenow', progressPercentage);
    }
    
    if (elements.currentStepSpan) {
        elements.currentStepSpan.textContent = app.currentSection + 1;
    }
}

/**
 * Update navigation button states
 */
function updateNavigation() {
    // Previous button
    if (elements.prevButton) {
        elements.prevButton.disabled = app.currentSection === 0;
    }
    
    // Next button and Generate button
    if (app.currentSection === app.totalSections - 1) {
        // Last section - show generate button
        if (elements.nextButton) {
            elements.nextButton.style.display = 'none';
        }
        if (elements.generateButton) {
            elements.generateButton.style.display = 'block';
        }
    } else {
        // Not last section - show next button
        if (elements.nextButton) {
            elements.nextButton.style.display = 'block';
            elements.nextButton.disabled = false;
        }
        if (elements.generateButton) {
            elements.generateButton.style.display = 'none';
        }
    }
}

/**
 * Update navigation link active states for main flow
 * @param {number} activeIndex - Index of the active section
 */
function updateNavLinkStates(activeIndex) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
        // Database link (index 0) - remove active
        if (link.classList.contains('nav-link-database')) {
            link.classList.remove('active');
        }
        // Preview link (last link) - remove active
        else if (index === navLinks.length - 1) {
            link.classList.remove('active');
        }
        // Main flow navigation links (Basic Info, BOM, Safety, Assembly)
        else {
            // Navigation structure: Database(0), Basic Info(1), BOM(2), Safety(3), Assembly(4), Preview(5)
            // Main flow sections: Basic Info(0), BOM(1), Safety(2), Assembly(3), Preview(4)
            const sectionIndex = index - 1; // Subtract 1 for database offset
            if (sectionIndex === activeIndex) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

/**
 * Update navigation link active states for database section
 */
function updateNavLinkStatesForDatabase() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
        if (link.classList.contains('nav-link-database')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Toggle preview panel
 */
function togglePreviewPanel() {
    if (elements.previewPanel) {
        const isOpen = elements.previewPanel.classList.contains('open');
        
        if (isOpen) {
            closePreviewPanel();
        } else {
            openPreviewPanel();
        }
    }
}

/**
 * Open preview panel
 */
function openPreviewPanel() {
    if (elements.previewPanel) {
        elements.previewPanel.classList.add('open');
        
        if (elements.previewToggle) {
            elements.previewToggle.setAttribute('aria-expanded', 'true');
        }
    }
}

/**
 * Close preview panel
 */
function closePreviewPanel() {
    if (elements.previewPanel) {
        elements.previewPanel.classList.remove('open');
        elements.previewToggle.setAttribute('aria-expanded', 'false');
    }
}

/**
 * Handle keyboard navigation
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleKeyboardNavigation(e) {
    // Only handle if no input is focused
    if (document.activeElement.tagName === 'INPUT' || 
        document.activeElement.tagName === 'TEXTAREA' || 
        document.activeElement.tagName === 'SELECT') {
        return;
    }
    
    switch (e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            navigateSection(-1);
            break;
        case 'ArrowRight':
            e.preventDefault();
            navigateSection(1);
            break;
        case 'Escape':
            e.preventDefault();
            closePreviewPanel();
            break;
    }
}

/**
 * Generate SOP (placeholder function)
 */
function generateSOP() {
    console.log('Generate SOP clicked - functionality will be implemented in later tasks');
    
    // Show loading state
    showLoading();
    
    // Simulate processing
    setTimeout(() => {
        hideLoading();
        openPreviewPanel();
        
        // Update preview content (basic placeholder)
        updatePreviewContent();
    }, 1000);
}

/**
 * Show loading overlay
 */
function showLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.setAttribute('aria-hidden', 'false');
    }
}

/**
 * Hide loading overlay
 */
function hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.setAttribute('aria-hidden', 'true');
    }
}

/**
 * Update preview content (placeholder)
 */
function updatePreviewContent() {
    const previewContent = document.getElementById('preview-sop-content');
    if (previewContent) {
        previewContent.innerHTML = `
            <h3>SCOPE</h3>
            <p>This procedure describes the assembly process for the selected components.</p>
            
            <h3>SAFETY REQUIREMENTS</h3>
            <p>⚠️ <strong>WARNING:</strong> Follow all safety guidelines during assembly.</p>
            
            <h3>BILL OF MATERIALS</h3>
            <ul>
                <li>Parts will be listed here based on BOM section</li>
            </ul>
            
            <h3>ASSEMBLY STEPS</h3>
            <p>Assembly steps will be generated based on the documented sequence.</p>
            
            <p><em>Complete all form sections to generate a full SOP preview.</em></p>
        `;
    }
}

/**
 * Utility function to show modal (for future use)
 * @param {string} title - Modal title
 * @param {string} content - Modal content
 */
function showModal(title, content) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    if (modalOverlay && modalTitle && modalContent) {
        modalTitle.textContent = title;
        modalContent.innerHTML = content;
        modalOverlay.setAttribute('aria-hidden', 'false');
    }
}

/**
 * Utility function to hide modal
 */
function hideModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        modalOverlay.setAttribute('aria-hidden', 'true');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
    // Close mobile nav on resize to desktop
    if (window.innerWidth > 768 && elements.navList) {
        elements.navList.classList.remove('open');
        elements.navToggle.setAttribute('aria-expanded', 'false');
    }
});

// Export functions for potential external use
window.SOPGenerator = {
    navigateToSection,
    showDatabaseSection,
    togglePreviewPanel,
    showModal,
    hideModal,
    generateSOP
}; 