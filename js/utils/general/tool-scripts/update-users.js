const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const validator = require("validator");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5502",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(bodyParser.json());

// Add a route to update users.json in the project's workspace
app.post("/update-users", (req, res) => {
  const updatedUsers = req.body.users; // Get updated users data from request

  // Path to the users.json file
  const filePath =
    "/Users/telecasteren/Desktop/DEV/School/schoolWork/gamehub-webshop/gamehub/js/utils/data/users/users.json";

  // Write the updated user data to the file
  fs.writeFile(
    filePath,
    JSON.stringify({ users: updatedUsers }, null, 2),
    (err) => {
      if (err) {
        console.error("Error writing to users.json:", err);
        return res.status(500).send("Failed to update users");
      }
      res.send("Users updated successfully");
    }
  );
});

// GET endpoint to retrieve data from the specific project folder and file
app.get("/getData", (req, res) => {
  const project = req.query.project || "default";
  const file = req.query.file || "data.json";

  // Define the folder path and file path inside the project folder
  const folderPath = path.join(__dirname, "projects", project);
  const filePath = path.join(folderPath, file);

  // Check if the file exists, then send the data or return an error
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    res.json(JSON.parse(data));
  } else {
    res
      .status(404)
      .json({ message: `File ${file} not found for project ${project}` });
  }
});

app.use((req, res) => {
  res.status(404).send({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
