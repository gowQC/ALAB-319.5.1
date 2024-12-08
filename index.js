// standard stuff
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// routes
const fruitRoutes = require("./routes/fruits");
const vegetableRoutes = require("./routes/vegetables");

// other necessary stuff
const db = require("./db/conn");
const bodyParser = require("body-parser");
const jsxViewEngine = require("jsx-view-engine");
const methodOverride = require("method-override");
const PORT = process.env.PORT || 5050;

// models
const Fruit = require("./models/fruit");
const Vegetable = require("./models/vegetable");

// views stuff
app.set("view engine", "jsx");
app.set("views", "./views");
app.engine("jsx", jsxViewEngine());

// other middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

app.use((req, res, next) => {
  console.log("Middleware: I run for all routes");
  next();
});

app.use((req, res, next) => {
  const time = new Date();
  console.log(
    `-----
        ${time.toLocaleDateString()}: Received a ${req.method} request to ${
      req.url
    }.`
  );

  if (req.body && Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

// routes middleware
app.use("/api/fruits", fruitRoutes);
app.use("/api/vegetables", vegetableRoutes);

// non-routes middleware
app.get("/", (req, res) => {
  res.send("<div>this is my home</div>");
});

app.get("/index", (req, res) => {
  res.send("<h1>This is an index</h1>");
});

// "/fruits" render routes
app.get("/fruits", async (req, res) => {
  try {
    const foundFruits = await Fruit.find({});
    res.status(200).render("fruits/Index", { fruits: foundFruits });
  } catch (err) {
    res.send(err).status(400);
  }
});

app.get("/fruits/new", (req, res) => {
  res.render("fruits/New");
});

app.get("/fruits/:id/edit", async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);
    res.render("fruits/Edit", { fruit: foundFruit, id: req.params.id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// "/vegetables" render routes
app.get("/vegetables", async (req, res) => {
  try {
    const foundVegetables = await Vegetable.find({});
    res.status(200).render("vegetables/Index", { vegetables: foundVegetables });
  } catch (err) {
    res.send(err).status(400);
  }
});

app.get("/vegetables/new", (req, res) => {
  res.render("vegetables/New");
});

app.get("/vegetables/:id/edit", async (req, res) => {
  try {
    const foundVegetable = await Vegetable.findById(req.params.id);
    res.render("vegetables/Edit", {
      vegetable: foundVegetable,
      id: req.params.id,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// error middleware
app.use((req, res) => {
  console.log(
    "I am only in this middleware if no other routes have sent a response."
  );
  res.status(404);
  res.json({ error: "Resource not found" });
});

// standard listen
app.listen(PORT, () => {
  console.log("listening");
});
