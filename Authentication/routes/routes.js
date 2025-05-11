const express=require("express");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const User=require("../Models/User");
const puppeteer = require('puppeteer');
const router=express.Router();
const mysql = require('mysql');
const JWT_SECRET="supersecretkey";
const XSS=require("../Models/XSSModel");
const {scanEndpoint}=require("../lib/scanner")

// const db = mysql.createConnection({
//   host: 'localhost',       // Database host
//   user: 'root',            // Database user
//   password: 'password',    // Database password
//   database: 'your_database_name' // Database name
// });

// // Connect to the database
// db.connect((err) => {
//   if (err) {
//     console.error('Database connection failed: ' + err.stack);
//     return;
//   }
//   console.log('Connected to the database');
// });
// // Vulnerable query endpoint
router.post("/register",async(req,res)=>{
    const {email,password}=req.body;

    try{
        const exist=await User.findOne({email});
        if(exist){
            return res.status(400).json({message:"Email Aready Registered"})
        }
        const hash=await bcrypt.hash(password,10)
        const user=await User.create({email,password:hash});
        
        const token=jwt.sign({id:user._id},JWT_SECRET);
        res.json({token});
    }
    catch(err){
        res.status(500).json({error:err})
    }
});

router.post("/login",async(req,res)=>{
    console.log(JWT_SECRET)
    const {email,password}=req.body
    try{
        const exist=await User.findOne({email});
        if(!exist)
            return res.status(400).json({message:"User with Specified Email doesn't exist!"})
        const isMatch =await bcrypt.compare(password,exist.password);
        if(!isMatch)
            return res.status(400).json({message:"Password is Wrong, Forget Password?"});
        const token =jwt.sign({id:exist._id},JWT_SECRET, { expiresIn: '1h' });
          res.json({ token, user: {  name: exist.name } });

    }
    catch(err){
       res.status(500).json({ error: err.message || "Internal Server Error" });

    }
})
router.post("/test-xss", async (req, res) => {
  const { url, payload } = req.body;

  if (!url || !payload) {
    return res.status(400).json({ message: "Missing parameters!" });
  }

  const paramsToTest = ["test", "query", "q", "search"];
  const vulnerabilities = [];

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let isVulnerable = false;

    page.on('dialog', async dialog => {
      console.log('Alert detected:', dialog.message());
      isVulnerable = true;
      await dialog.dismiss();
    });

    for (const param of paramsToTest) {
      const testUrl = `${url}?${param}=${payload}`;
      console.log("Testing:", testUrl);

      await page.goto(testUrl);


      if (isVulnerable) {
        vulnerabilities.push({
          injectionPoint: `URL query parameter: ${param}`,
          url: testUrl,
        });
        break; 
      } 
    }

    await browser.close();

    if (isVulnerable) {
      res.json({
        message: "XSS Vulnerability Detected!",
        isVulnerable: true,
        vulnerabilities
      });
    } else {
      res.json({
        message: "No XSS vulnerability detected.",
        isVulnerable: false
      });
    }
  } catch (error) {
    console.error("Error testing URL:", error);
    res.status(500).json({ message: "Test failed: " + error.message, isVulnerable: false });
  }
});


// Terminal-style injection tester
router.post('/terminal-query', (req, res) => {
//   const sql = req.body.query;
//   if (!sql || sql.trim() === '') {
//     return res.status(400).json({ error: 'Empty SQL query received.' });
//   }

//   console.log('▶︎ Terminal SQL:', sql);
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error('SQL ERROR:', err.message);
//       return res.status(500).json({ error: err.message });
//     }
//     res.json(results);
//   });
 res.status(200).json({ message: "No vulnerabilites" });
});


router.post("/status", (req, res) => {
    res.status(200).json({ message: "Server is running" });
  })

router.post('/scan', async (req, res) => {
  console.log('🔍 POST /check/scan hit');           // <-- log route hit
  console.log('   Request body:', req.body);        // <-- log incoming JSON

  const { targetUrl, paramName } = req.body;
  if (!targetUrl || !paramName) {
    console.warn('⚠️ Missing params:', { targetUrl, paramName });
    return res.status(400).json({ error: 'Missing params' });
  }

  try {
    const results = await scanEndpoint(targetUrl, paramName);
    console.log('   scanEndpoint results:', results);  // <-- log scan results
    res.json(results);
  } catch (err) {
    console.error('❌ scanEndpoint error:', err);       // <-- log internal error
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post("/save-xss", async (req, res) => {
  const { useremail, date, type, result } = req.body;

  try {
    const savedEntry = await XSS.create({ useremail, date, type, result });
    res.status(200).json({ message: "Data Saved Successfully", data: savedEntry });
  } catch (err) {
    console.error("Error saving XSS data:", err);
    res.status(500).json({ message: "Failed to save data", error: err.message });
  }
});

module.exports= router