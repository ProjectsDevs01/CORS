const express = require("express");
const Pdfcrowd = require("pdfcrowd");

const app = express();
const port = 3000;

const pdfcrowdUsername = "yefixi";
const pdfcrowdApiKey = "8429093c5f12727a986790e138129302";

const pdfcrowdClient = new Pdfcrowd.HtmlToPdfClient(pdfcrowdUsername, pdfcrowdApiKey);

// Endpoint to generate PDF
app.get("/generate-pdf", (req, res) => {
  const htmlContent = "<html><body><h1>Hello World!</h1></body></html>";

  // Run the conversion and send the PDF file as a response
  pdfcrowdClient.convertString(htmlContent, (err, pdfData) => {
    if (err) {
      console.error("Pdfcrowd Error:", err);
      return res.status(500).send("Error generating PDF");
    }
    
    res.contentType("application/pdf");
    res.send(pdfData);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
