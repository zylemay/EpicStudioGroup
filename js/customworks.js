document.addEventListener('DOMContentLoaded', function () {
    function adjustNav() {
        const servicesItem = document.getElementById('servicesItem');
        const packageItem = document.getElementById('packageItem');
        const windowWidth = window.innerWidth;

        if (windowWidth <= 990) {
            // Mobile adjustments
            servicesItem.classList.remove('dropdown');
            packageItem.classList.remove('dropdown');

            
            // Remove hover behavior on mobile
            servicesItem.removeEventListener('mouseenter', toggleDropdownHover);
            packageItem.removeEventListener('mouseenter', toggleDropdownHover);

            // Prevent navbar collapse when dropdown is clicked
            preventCollapseOnDropdownClick('servicesDropdown');
            preventCollapseOnDropdownClick('packageDropdown');

        } else {
            // Desktop adjustments with dropdowns
            servicesItem.classList.add('dropdown');
            packageItem.classList.add('dropdown');

            servicesItem.innerHTML = 
                `<a class="nav-link dropdown-toggle" id="navbarDropdownServices" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Services
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownServices">
                    <li><a class="dropdown-item" href="../services.html">Overview</a></li>
                    <li><a class="dropdown-item" href="../virtual.html">Virtual Assistants</a></li>
                    <li><a class="dropdown-item" href="../multimedia.html">Multimedia Advertising</a></li>
                </ul>`
            ;

            packageItem.innerHTML = 
                `<a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Package
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="../vaPackage.html">VA Package</a></li>
                    <li><a class="dropdown-item" href="../maPackage.html">MA Package</a></li>
                </ul>`
            ;

            // Enable hover for dropdowns on desktop
            servicesItem.addEventListener('mouseenter', toggleDropdownHover);
            servicesItem.addEventListener('mouseleave', toggleDropdownHover);
            packageItem.addEventListener('mouseenter', toggleDropdownHover);
            packageItem.addEventListener('mouseleave', toggleDropdownHover);
        }

        highlightActiveMenuItem();
    }

    // Prevent navbar collapse on dropdown click (for mobile)
    function preventCollapseOnDropdownClick(dropdownId) {
        const dropdownElement = document.getElementById(dropdownId);
        dropdownElement.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent collapse
        });
    }

    // Toggle dropdown visibility on hover for desktop
    function toggleDropdownHover(event) {
        const dropdownMenu = event.currentTarget.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            dropdownMenu.classList.toggle('show', event.type === 'mouseenter');
        }
    }

    // Highlight active menu item based on the current page
    function highlightActiveMenuItem() {
        const currentPath = window.location.pathname;

        if (currentPath.includes('virtual.html') || currentPath.includes('multimedia.html') || currentPath.includes('services.html')) {
            document.getElementById('servicesItem').classList.add('active');
            highlightDropdownItem(currentPath);
        }

        if (currentPath.includes('vaPackage.html') || currentPath.includes('maPackage.html')) {
            document.getElementById('packageItem').classList.add('active');
            highlightDropdownItem(currentPath);
        }
    }

    function highlightDropdownItem(currentPath) {
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(function (dropdownItem) {
            if (currentPath.includes(dropdownItem.getAttribute('href'))) {
                dropdownItem.classList.add('active');
            }
        });
    }


    const videos = document.querySelectorAll('video');

    videos.forEach(video => {
        // Play video and set slow motion on mouse enter
        video.addEventListener('mouseenter', () => {
            video.play();
            video.style.opacity = "1";
            video.playbackRate = 0.9;
        });

        video.addEventListener('mouseleave', () => {
            setTimeout(() => {
                video.pause();
                video.currentTime = 0; 
                video.playbackRate = 1; 
            }, 200);
        });
    });

    adjustNav();
    window.addEventListener('resize', adjustNav);
});