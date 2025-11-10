# Campaign Tracker

A simple web application to manage marketing campaigns. Users can add, edit, delete, and search campaigns, and see a status summary of active, paused, and completed campaigns.

## Features

- Add new campaigns with name, client, start date, and status.
- Edit campaigns inline in the table.
- Delete campaigns.
- Search campaigns by name or client.
- Refresh campaign list.
- Status summary cards for Active, Paused, and Completed campaigns.

## Tech Stack

- **Frontend:** React.js  
- **Backend:** Flask  
- **Database:** MongoDB  
- **Styling:** CSS  

## Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- MongoDB
- npm or yarn

## Local Setup

### Backend

1. Navigate to the backend folder:

```bash
cd backend
```
2. Create a virtual environment and activate it:

```bash 
python -m venv venv
venv\Scripts\activate
```
3. Install dependencies:

```bash
pip install -r requirements.txt
```
4. Start the Flask server:

```bash
python app.py
```
The backend will run on http://127.0.0.1:5000

5. Navigate to the frontend folder:

```bash
cd frontend
```
6. Install dependencies:

```bash
npm install
```
7. Start the React app:

```bash
npm start
```
The frontend will run on http://localhost:3000

8. Username and Passward:
```
Username: admin
Passward: 1234
```



