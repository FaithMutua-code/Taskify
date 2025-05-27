# Taskify - Task Management Web Application

## Overview

Taskify is a task management web application designed to help users organize, track, and manage their tasks and schedules efficiently. It features a modern, responsive dashboard with task tracking, progress visualization, and calendar integration, along with a user-friendly login and signup system. The application is built with HTML, JavaScript, React, Tailwind CSS, and Recharts for data visualization, with a focus on clean design and intuitive user experience.

> **Note**: This project is currently in development and not yet complete. Some features may be partially implemented or planned for future updates.

## Features

### Dashboard
- **Responsive Layout**: A grid-based layout with a sidebar, main content area, and right sidebar, optimized for both desktop and mobile devices.
- **Mobile Menu**: A hamburger menu for mobile users, with smooth transitions and an overlay effect.
- **Task Overview**: Displays today's tasks with a call-to-action button and a visual representation.
- **Progress Tracking**: Task cards showing progress bars for ongoing projects (e.g., Web Dashboard, Mobile App, Animation).
- **Chart Visualization**: A bar chart using Recharts to display task progress over the week.
- **Assignments List**: A scrollable list of assignments with due dates and scores.
- **Calendar Integration**: A React Calendar component for scheduling tasks, with a modal for adding/editing tasks.
- **Schedule Management**: Users can add, edit, and delete tasks in the schedule list with a modal interface.
- **Profile and Batchmates**: Displays user profile information and a list of batchmates.

### Login/Signup Page
- **Dual Forms**: Toggle between signup and login forms with a clean, animated interface.
- **Avatar Upload**: Users can upload a profile picture during signup, with a live preview.
- **Form Validation**: Basic client-side validation for password matching in the signup form.
- **Custom Styling**: Uses Tailwind CSS and Google Fonts (Pacifico) for a modern, visually appealing design.
- **SVG Icon**: A custom SVG icon for branding in the signup/login forms.

## Technologies Used
- **HTML5**: Structure of the application.
- **JavaScript**: Core functionality, including DOM manipulation and event handling.
- **React**: For rendering the calendar and chart components.
- **Tailwind CSS**: For responsive and utility-first styling.
- **Recharts**: For creating the task progress bar chart.
- **Framer Motion**: For animations in the login/signup page.
- **Google Fonts**: Pacifico font for headings in the login/signup page.

## Setup Instructions

### Prerequisites
- A modern web browser (e.g., Chrome, Firefox, Edge).
- A local development server (e.g., Live Server in VS Code) to serve the HTML files.
- Internet connection for loading CDN-hosted libraries (React, Recharts, Tailwind CSS, Framer Motion).

### Installation
1. **Clone or Download the Repository**:
   ```bash
   git clone <repository-url>
   ```
   Alternatively, download the project files and extract them to a local directory.

2. **Navigate to the Project Directory**:
   ```bash
   cd taskify
   ```

3. **Serve the Application**:
   - Use a local server like Live Server in VS Code or any other static file server.
   - Open your browser and navigate to `http://localhost:8000`.

4. **File Structure**:
   - `index.html`: The main dashboard page.
   - `login.html`: The login/signup page.
   - `assets/`: Directory containing images (e.g., `cute image for taski.png`, `avator.jpg`, etc.).

> **Note**: The project relies on external assets (images) referenced in the HTML files. Ensure the `assets` folder is present and contains the required images, or update the image paths accordingly.

### Running the Application
- Open `index.html` to view the dashboard.
- Open `login.html` to view the login/signup page.
- No backend is currently implemented, so form submissions log data to the console.

## Usage
- **Dashboard**:
  - Navigate through the sidebar (desktop) or mobile menu to access different sections (Dashboard, Track, Projects, Reports, Support, Settings).
  - View task progress, assignments, and schedules.
  - Use the calendar to select dates and manage tasks via the "Add Task" button.
  - Edit or delete tasks from the schedule list using the modal interface.
- **Login/Signup**:
  - Toggle between signup and login forms using the respective buttons.
  - Upload a profile picture during signup and fill in the required fields.
  - Submit forms to see the data logged in the console (backend integration pending).

## Future Development
- **Backend Integration**: Add a backend (e.g., Node.js, Express, or Firebase) for user authentication and data persistence.
- **Database**: Store tasks, schedules, and user data in a database.
- **API Integration**: Fetch dynamic data for tasks, assignments, and progress charts.
- **Enhanced Interactivity**: Add drag-and-drop for tasks, real-time updates, and notifications.
- **Improved Validation**: Implement robust form validation and error handling.
- **Additional Features**: Task categories, priority levels, and collaboration tools for batchmates.
