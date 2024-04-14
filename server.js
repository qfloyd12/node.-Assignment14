const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb+srv://qfloyd:myR7edfSSZug7AZe@atlascluster.gag1v4a.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));


const craftSchema = new mongoose.Schema({
  name: String,
  description: String,
  supplies: [String],
  img: String
});

const Craft = mongoose.model("Craft", craftSchema);


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/crafts", async (req, res) => {
  const crafts = await Craft.find();
  res.send(crafts);
});

app.post("/api/crafts", upload.single("img"), async (req, res) => {
  const { error } = validateCraft(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const craft = new Craft({
    name: req.body.name,
    description: req.body.description,
    supplies: req.body.supplies.split(","),
    img: req.file ? "uploads/" + req.file.filename : ""
  });

  await craft.save();
  res.send(craft);
});

app.put("/api/crafts/:id", upload.single("img"), async (req, res) => {
  const { error } = validateCraft(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const craft = await Craft.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    supplies: req.body.supplies.split(","),
    img: req.file ? "uploads/" + req.file.filename : ""
  }, { new: true });

  if (!craft) return res.status(404).send("The craft with the given ID was not found.");
  res.send(craft);
});

app.delete("/api/crafts/:id", async (req, res) => {
  const craft = await Craft.findByIdAndRemove(req.params.id);
  if (!craft) return res.status(404).send("The craft with the given ID was not found.");
  res.send(craft);
});


function validateCraft(craft) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    supplies: Joi.string().required(),
  });

  return schema.validate(craft);
}

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
