const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint to create a text file with the current timestamp
app.post("/create-file", (req, res) => {
  const timestamp = new Date().toISOString().replace(/[:.-]/g, "");
  const content = `Timestamp: ${new Date().toISOString()}`;
  const filePath = path.join(__dirname, "files", `${timestamp}.txt`);

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to create file" });
    }
    res.status(200).json({ message: "File created", filePath });
  });
});

// Endpoint to retrieve all text files in the folder
app.get("/files", (req, res) => {
  const folderPath = path.join(__dirname, "files");

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read directory" });
    }
    const textFiles = files.filter((file) => file.endsWith(".txt"));
    res.status(200).json({ files: textFiles });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
