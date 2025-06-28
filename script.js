document.addEventListener('DOMContentLoaded', () => {
    // 1. Section Navigation Logic (for single-page sections)
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    const logoLink = document.querySelector('.logo[data-section]'); // Select the logo for home navigation
    const mainContent = document.getElementById('main-content');
    const sections = mainContent.querySelectorAll('.content-section');
    const enrollButtons = document.querySelectorAll('.enroll-btn'); // Select all enroll buttons

    // Function to hide all sections and show the active one
    const showSection = (sectionId) => {
        // Remove 'active' class from all nav links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Hide all content sections
        sections.forEach(section => section.classList.remove('active'));

        // Show the selected section and add 'active' class to its nav link
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Find and activate the corresponding nav link
            const activeNavLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
            if (activeNavLink) {
                activeNavLink.classList.add('active');
            }
            // Scroll to the top of the newly active section
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Add click listeners to Navbar links
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior (e.g., hash change in URL)
            const sectionId = link.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Add click listener to the Logo (to go to home section)
    if (logoLink) {
        logoLink.addEventListener('click', (event) => {
            event.preventDefault();
            showSection('home-section');
        });
    }

    // Add click listeners to "Enroll Now" buttons
    enrollButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            // Show the course details section
            showSection('course-details-section');
            // If you want to load specific course details based on data-course-id,
            // you would add that logic here (e.g., fetch data and update the content-section).
        });
    });
    
    // Set 'home-section' as active on initial load
    showSection('home-section');


    // 2. Profile Tab Functionality
    const profileTabs = document.querySelectorAll('.profile-tabs .profile-tab');
    if (profileTabs.length > 0) {
        profileTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTabId = tab.getAttribute('data-tab');
                
                // Deactivate all tabs and contents
                profileTabs.forEach(t => t.classList.remove('active'));
                const allTabContents = document.querySelectorAll('#profile-section .tab-content');
                allTabContents.forEach(content => content.classList.remove('active'));
                
                // Activate the clicked tab and its content
                tab.classList.add('active');
                const targetContent = document.getElementById(targetTabId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    // 3. Courses Category Filter Functionality
    const categoryTabs = document.querySelectorAll('.category-tab');
    const courseCards = document.querySelectorAll('.course-grid .course-card');

    if (categoryTabs.length > 0 && courseCards.length > 0) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const filter = tab.getAttribute('data-category');
                
                // Remove 'active' from all tabs and add to the clicked one
                categoryTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Filter the course cards
                courseCards.forEach(card => {
                    const cardTag = card.querySelector('.course-tag');
                    if (filter === 'all' || (cardTag && cardTag.classList.contains(filter))) {
                        card.style.display = 'block'; // Show the card
                    } else {
                        card.style.display = 'none'; // Hide the card
                    }
                });
            });
        });
    }
    // Automatically click the 'All' tab on page load to show all courses
    const allCategoryTab = document.querySelector('.category-tab[data-category="all"]');
    if (allCategoryTab) {
        allCategoryTab.click();
    }
    
    // 4. Course Details Curriculum Accordion
    const moduleHeaders = document.querySelectorAll('.module-header');
    moduleHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const module = header.closest('.module');
            if (module) {
                module.classList.toggle('open');
            }
        });
    });

    // 5. Course Details Tab Functionality
    const detailTabs = document.querySelectorAll('.course-details-tabs .detail-tab');
    if (detailTabs.length > 0) {
        detailTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTabId = tab.getAttribute('data-tab');
                
                // Deactivate all detail tabs and contents
                detailTabs.forEach(t => t.classList.remove('active'));
                const allDetailContents = document.querySelectorAll('#course-details-section .tab-content');
                allDetailContents.forEach(content => content.classList.remove('active'));
                
                // Activate the clicked tab and its content
                tab.classList.add('active');
                const targetContent = document.getElementById(targetTabId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
        // Set the first detail tab as active by default
        detailTabs[0].click();
    }
});