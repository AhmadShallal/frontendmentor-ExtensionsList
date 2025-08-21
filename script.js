// script.js
document.addEventListener('DOMContentLoaded', function() {
    const themeButton = document.getElementById('themeToggleButton');
    const body = document.body;
    const extensionsContainer = document.getElementById('extensions-container');
    const filterButtons = document.querySelectorAll('.btn-outline-primary, .btn-primary');
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    const extensionNameToRemoveSpan = document.getElementById('extensionNameToRemove');
    const confirmRemoveButton = document.getElementById('confirmRemoveButton');
    const themeIcon = document.getElementById('themeIcon'); // Get theme icon

    let extensionsData = [];
    let currentFilter = 'all';
    let extensionToRemoveName = null;

    function updateThemeIcon() {
        if (body.classList.contains('dark-theme')) {
            themeIcon.src = "./assets/images/icon-sun.svg"; // Path to your moon icon
        } else {
            themeIcon.src = "./assets/images/icon-moon.svg"; // Path to your sun icon
        }
    }

    themeButton.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        updateThemeIcon(); // Update the theme icon
    });

    function fetchAndDisplayExtensions() {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                extensionsData = data;
                displayExtensions(data);
                updateThemeIcon(); // Set the correct icon on initial load
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function displayExtensions(extensions) {
        extensionsContainer.innerHTML = '';
        extensions.forEach(extension => {
            const card = document.createElement('div');
            card.classList.add('col', 'card-enter');

            card.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <div class="card-title-container">
                            <div class="extension-logo-container">
                                <img src="${extension.logo}" alt="${extension.name} Logo" class="extension-logo">
                            </div>
                            <h5 class="card-title">${extension.name}</h5>
                        </div>
                        <p class="card-text">${extension.description}</p>
                        <div class="d-flex align-items-center" style="width: 100%;">
                            <div style="flex: 0 0 auto;">
                                <button class="btn btn-danger remove-button">Remove</button>
                            </div>
                            <div style="flex: 1 1 auto;"></div> <!-- Spacer div to push the toggle to the right -->
                            <div class="form-check form-switch" style="flex: 0 0 auto;">
                                <input class="form-check-input toggle-switch" type="checkbox" role="switch"
                                    id="toggle-${extension.name.replace(/\s+/g, '-').toLowerCase()}"
                                    ${extension.isActive ? 'checked' : ''}>
                                <label class="form-check-label"
                                    for="toggle-${extension.name.replace(/\s+/g, '-').toLowerCase()}"></label>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            extensionsContainer.appendChild(card);
            void card.offsetWidth;
            card.classList.add('card-enter-active');

            const toggleSwitch = card.querySelector('.toggle-switch');
            toggleSwitch.addEventListener('change', function() {
                const extensionName = this.id.replace('toggle-', '').replace(/-/g, ' ');
                const extensionToUpdate = extensionsData.find(ext => ext.name.toLowerCase() === extensionName);
                if (extensionToUpdate) {
                    extensionToUpdate.isActive = this.checked;
                    console.log(`${extensionToUpdate.name} is now ${extensionToUpdate.isActive ? 'active' : 'inactive'}`);
                    applyFilter(currentFilter);
                }
            });

            const removeButton = card.querySelector('.remove-button');
            removeButton.addEventListener('click', function(event) {
                event.preventDefault();
                const extensionName = card.querySelector('.card-title').textContent;
                extensionToRemoveName = extensionName;
                extensionNameToRemoveSpan.textContent = extensionName;
                confirmationModal.show();
                card.classList.add('card-exit');
            });

            card.addEventListener('transitionend', function(event) {
                if (event.propertyName === 'opacity' && card.classList.contains('card-exit')) {
                    //This event listener will only fire if the transition is on opacity and the card has the class card-exit
                    extensionsData = extensionsData.filter(ext => ext.name !== extensionToRemoveName);
                    console.log(`Removed ${extensionToRemoveName}`);
                    applyFilter(currentFilter);
                }
            });
        });
    }

    function applyFilter(filter) {
        let filteredExtensions = [];
        if (filter === 'active') {
            filteredExtensions = extensionsData.filter(ext => ext.isActive);
        } else if (filter === 'inactive') {
            filteredExtensions = extensionsData.filter(ext => !ext.isActive);
        } else {
            filteredExtensions = extensionsData; // All
        }
        displayExtensions(filteredExtensions);
    }

    // Filter button click listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.textContent.toLowerCase(); // Get filter text
            applyFilter(filter);
            setActiveFilterButton(this); // Set active button style
            currentFilter = filter; // Update current filter
        });
    });

    function setActiveFilterButton(activeButton) {
        // Remove active class from other buttons
        filterButtons.forEach(button => {
            button.classList.remove('btn-primary');
            button.classList.add('btn-outline-primary');
        });
        // Add active class to clicked button
        activeButton.classList.remove('btn-outline-primary');
        activeButton.classList.add('btn-primary');
    }

    confirmRemoveButton.addEventListener('click', function() {
        if (extensionToRemoveName) {
            const cardToRemove = Array.from(extensionsContainer.children).find(
                card => card.querySelector('.card-title').textContent === extensionToRemoveName); // Get reference to card

            cardToRemove.classList.add('card-exit'); // Add exit class for animation

            // After this code runs, the above-added event listener will fire

            extensionToRemoveName = null;
        }
        confirmationModal.hide();
    });

    fetchAndDisplayExtensions(); // Initial display
});