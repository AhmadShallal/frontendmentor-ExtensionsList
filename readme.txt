
# Browser Extensions Manager UI


## Overview

This project is a browser extensions manager UI built as a solution for the [Frontend Mentor](https://www.frontendmentor.io) challenge. It allows users to:

- Toggle extensions between active and inactive states.
- Filter extensions by their status (All, Active, Inactive).
- Remove extensions from the list.
- Select a color theme (light/dark).

The UI is designed to be responsive, providing an optimal viewing experience across different devices.

### Built With

-   **HTML5:** For structuring the web page content.
-   **CSS3:** For styling the UI, including custom CSS variables for theming and transitions for animations.
-   **Bootstrap 5:** A CSS framework used for layout, grid system, and pre-built components.
-   **JavaScript:** For handling user interactions, fetching data dynamically, implementing filtering, toggle functionality, and managing the theme.

## Features

-   **Toggle Extensions:** Users can easily toggle the active state of extensions using a switch.
-   **Filter Extensions:** The UI allows users to filter extensions based on their status: "All", "Active", and "Inactive".
-   **Remove Extensions:** Users can remove extensions from the list with a confirmation modal.
-   **Theme Selection:** A theme toggle allows users to switch between light and dark themes.
-   **Responsive Design:** The layout adapts to different screen sizes, providing a consistent experience across devices.
-   **Animations and Transitions:** CSS transitions and animations are used to provide a polished user experience.
-   **Data Loading:** Extensions data is loaded dynamically from a `data.json` file.

## Setup

To run this project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd browser-extensions-manager-ui
    ```

3.  **Open `index.html` in your web browser.**

    No additional setup or installation is required as the project uses static HTML, CSS, and JavaScript.

## How to Use

1.  **View Extensions:** The main page displays a list of browser extensions with their names, descriptions, and active status.
2.  **Toggle Status:** Use the toggle switch to activate or deactivate an extension.
3.  **Filter Extensions:** Click on the "All", "Active", or "Inactive" buttons to filter the list.
4.  **Remove Extension:** Click the "Remove" button to open a confirmation modal. Confirm to remove the extension.
5.  **Switch Theme:** Use the theme toggle button in the header to switch between light and dark themes.

## Project Structure

```
browser-extensions-manager-ui/
├── index.html          # Main HTML file
├── style.css           # Custom CSS styles
├── script.js           # JavaScript file for interactivity
├── data.json           # JSON file containing extension data
├── assets/             # Assets (images, icons, etc.)
│   └── images/
│       └── ...
├── README.md           # This README file
└── preview.jpg         # Preview image of the project
```

## Acknowledgments

-   This project was built as a solution for a challenge on [Frontend Mentor](https://www.frontendmentor.io).
-   Uses [Bootstrap](https://getbootstrap.com/) for the grid system and components.

## Further improvements

-   **Accessibility:** Improve accessibility by adding ARIA attributes and ensuring proper keyboard navigation.
-   **Local Storage:** Persist theme preference using local storage.
-   **Data Persistency:** Implement a backend or local storage solution to persist changes to extension data (active state, removal).
-   **Refactor:** Use a modern JS framework like React or Vue.js to handle rendering and state management

## Author

-  (https://github.com/AhmadShallal)

```
