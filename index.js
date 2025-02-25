const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const reportsFilePath = './reports.json';

app.use(cors());
app.use(bodyParser.json());

app.get('/api/reports', (req, res) => {
  fs.readFile(reportsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading reports file:', err);
      return res.status(500).json({ error: 'Failed to load reports' });
    }
    res.json(JSON.parse(data));
  });
});

app.get('/api/reports/:id', (req, res) => {
  const reportId = parseInt(req.params.id, 10);
  fs.readFile(reportsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading reports file:', err);
      return res.status(500).json({ error: 'Failed to load reports' });
    }

    const reports = JSON.parse(data);
    const report = reports.find((r) => r.id === reportId);

    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.json(report);
  });
});

// API endpoint to submit a report (POST request)
app.post('/api/reports', (req, res) => {
  const newReport = req.body;

  // Assign a default status of 'Unresolved' to the new report
  newReport.status = 'Unresolved';  // Set default status

  // Read the existing reports from the JSON file
  fs.readFile(reportsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading reports file:', err);
      return res.status(500).json({ error: 'Failed to load reports' });
    }

    const reports = JSON.parse(data);

    // Assign a new ID to the report and add it to the reports array
    newReport.id = reports.length + 1;
    reports.push(newReport);

    // Write the updated reports back to the JSON file
    fs.writeFile(reportsFilePath, JSON.stringify(reports, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing to reports file:', err);
        return res.status(500).json({ error: 'Failed to save report' });
      }
      res.status(201).json(newReport);  // Return the new report as JSON, now with the default status
    });
  });
});

// Update status for a specific report by ID (PUT request)
app.put('/api/reports/:id', (req, res) => {
  const reportId = parseInt(req.params.id, 10);
  const updatedReport = req.body;

  fs.readFile(reportsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading reports file:', err);
      return res.status(500).json({ error: 'Failed to load reports' });
    }

    let reports = JSON.parse(data);

    // Find the report with the matching ID
    const reportIndex = reports.findIndex((r) => r.id === reportId);

    if (reportIndex === -1) {
      return res.status(404).json({ error: 'Report not found' });
    }

    // Update the status of the report
    reports[reportIndex] = { ...reports[reportIndex], status: updatedReport.status };

    // Write the updated reports back to the JSON file
    fs.writeFile(reportsFilePath, JSON.stringify(reports, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing to reports file:', err);
        return res.status(500).json({ error: 'Failed to save report' });
      }
      res.json(reports[reportIndex]);  // Return the updated report as JSON
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
