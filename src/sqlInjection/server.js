const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MySQL (XAMPP's MySQL runs on localhost:3306)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',       // default in XAMPP
  database: 'cyber_defense'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Route to simulate vulnerable query
app.post('/query', (req, res) => {
  const username = req.body.username;

  const query = `SELECT * FROM users WHERE username = '${username}'`;
  console.log('▶︎ Running SQL:', query);

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results.length ? results : { message: "No results found" });
  });
});


app.post('/terminal-query', (req, res) => {
    const sql = req.body.query;
  
    if (!sql || sql.trim() === '') {
      return res.status(400).json({ error: 'Empty SQL query received.' });
    }
  
    console.log('▶︎ Terminal SQL:', sql);  // Shows exactly what was sent
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('SQL ERROR:', err.message);  // Show backend-side error
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });
  
  

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
