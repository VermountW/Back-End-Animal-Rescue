# Animal Rescue System - Backend

## Overview
# Animal Rescue System - Admin Dashboard

## Overview
The **Animal Rescue System** is a comprehensive platform designed to streamline the process of reporting and rescuing animals in distress. It consists of three main components:
- **Admin Dashboard** - The UI for administrators to review and update the status of reported animal cases.
- **Server** - The backend system that manages data and communication between users and administrators.
- **User Report App** - The frontend application for users to report animal anomalies and track their case status.

This repository contains the **Backend API**, which provides endpoints for submitting, retrieving, and updating animal rescue reports. **This project is designed to run locally and does not include a hosted deployment.**

## Features
- Retrieve a list of all reported cases.
- Fetch details of a specific report by ID.
- Submit new animal rescue reports.
- Update the status of existing reports.
- Stores data locally in a JSON file.

## Technologies Used
- **Backend**: Node.js & Express.js
- **Data Storage**: JSON file (local storage)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/backend-animal-rescue.git
   cd backend-animal-rescue
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server (local use only):
   ```sh
   node index.js
   ```

**Note:** This project is intended to run locally. Ensure that you have Node.js installed before running the application.

