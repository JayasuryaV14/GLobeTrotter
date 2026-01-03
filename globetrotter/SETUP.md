# Quick Setup Guide

## ⚠️ Error: "Unexpected token '<', "<!DOCTYPE "... is not valid JSON"

This error means the backend server is not running. Follow these steps:

### Step 1: Start the Backend Server

Open a terminal and run:

```bash
cd "D:\travel app\globetrotter\backend"
node server.js
```

You should see:
```
Database Connected Successfully
Server started on port 5000
API available at http://localhost:5000/api
```

### Step 2: If Database Connection Fails

If you see database connection errors, set up the database first:

1. Open MySQL command line or MySQL Workbench
2. Run the schema file:
   ```sql
   source D:/travel app/globetrotter/backend/database/schema.sql
   ```
   
   Or using command line:
   ```bash
   mysql -u root -p < "D:\travel app\globetrotter\backend\database\schema.sql"
   ```

3. Update database credentials in `backend/config/db.js` if needed

### Step 3: Open the Frontend

1. Make sure the backend server is running (Step 1)
2. Open `frontend/pages/index.html` in your browser
3. Try to login or signup

### Troubleshooting

- **Backend not running**: The error "Unexpected token '<'" means the server isn't running
- **Database errors**: Make sure MySQL is running and the database exists
- **Port 5000 in use**: Change the port in `backend/server.js` and update `frontend/js/api.js`

