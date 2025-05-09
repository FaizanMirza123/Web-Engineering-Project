const express = require('express');
const cors = require('cors');
const app = express();
const puppeteer = require('puppeteer');
app.use(cors());
app.use(express.json());




app.post("/api/test-xss", async (req, res) => {
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



app.listen(4000, () => console.log('Server running on port 4000'));