# Blood Request Portal

A basic-level cloud computing project designed to connect blood donors with those in need quickly and efficiently. This project features a full-stack architecture with a Node.js backend and a Vanilla HTML/CSS/JavaScript frontend.

## Features

- **Submit Blood Requests:** Users can easily fill out a form with details such as patient name, required blood group, urgency level, location, and contact information.
- **View Current Requests:** A real-time updating list of all submitted blood requests, styled as easy-to-read cards.
- **Responsive Design:** The frontend is fully responsive and works well on both desktop and mobile devices.

## Technology Stack

- **Frontend:** HTML5, CSS3 (Vanilla), JavaScript (Vanilla)
- **Backend:** Node.js, Express.js
- **Database:** In-memory array (chosen for basic-level deployment simplicity without needing native C++ build tools)

## Getting Started

Follow these simple steps to run the project locally on your machine.

### Prerequisites

You need to have **Node.js** installed on your computer. If you don't have it, download and install it from [nodejs.org](https://nodejs.org/).

### Running the Backend Server

1. Open your terminal or command prompt.
2. Navigate to the `backend` directory of this project:
   ```bash
   cd "Blood Request Portal/backend"
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   node server.js
   ```
   *The server will start running on `http://localhost:3000`.*

### Running the Frontend

1. Ensure the backend server is running.
2. Open the `frontend` folder.
3. Double-click the `index.html` file to open it in your default web browser.
4. You can now interact with the application! Submit a request and watch it appear in the list instantly.

## Project Structure

```text
Blood Request Portal/
│
├── backend/
│   ├── package.json      # Node.js dependencies
│   └── server.js         # Express server and API endpoints
│
├── frontend/
│   ├── index.html        # Main HTML layout
│   ├── style.css         # Styling and responsive design
│   └── app.js            # Frontend logic and API integration
│
└── README.md             # Project documentation (this file)
```

## Future Enhancements
- Integration with a persistent cloud database (e.g., MongoDB, PostgreSQL).
- User authentication (Sign up / Login for hospitals and donors).
- Search and filtering capabilities for blood groups and locations.
