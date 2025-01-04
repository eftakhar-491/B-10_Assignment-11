require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chrono-craft-art.web.app",
      "https://chrono-craft-art.firebaseapp.com",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s7kzw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
function authenticateToken(req, res, next) {
  const token = req?.cookies?.token;
  const userEmail = req?.query?.email;

  if (!token) return res.status(401).send({ message: "Unauthorized" });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Unauthorized" });

    if (decoded.email === userEmail) {
      next();
    } else {
      return res.status(403).send({ message: "Forbidden" });
    }
  });
}

async function run() {
  try {
    const db = client.db("artifactsDB");
    const artifacts = db.collection("artifacts");
    const artifactsLikes = db.collection("artifactsLikes");
    const feedback = db.collection("feedback");
    // jwt token
    app.post("/jwt", async (req, res) => {
      const data = req.body;
      const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "365d",
      });

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });
    // logout for unauthorized user
    app.post("/logout", (req, res) => {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });
    // artifacts likes post
    app.get("/artifacts/likes/:useremail", async (req, res) => {
      const email = req.params.useremail;
      const result = await artifactsLikes.find({ email: email }).toArray();
      res.send(result);
    });
    // my liked artifacts
    app.get("/artifacts/mylikes", authenticateToken, async (req, res) => {
      userEmail = req?.query?.email;
      const myLikes = await artifactsLikes
        .find({ email: userEmail })
        .project({ id: 1, _id: 0 })
        .toArray();

      const arrOfId = myLikes?.map((obj) => new ObjectId(obj?.id));

      const result = await artifacts.find({ _id: { $in: arrOfId } }).toArray();

      res.send(result);
    });
    // togole like
    app.post("/artifacts/likes", authenticateToken, async (req, res) => {
      const data = req.body;

      // togole like
      const check = await artifactsLikes.findOne({
        $and: [{ id: data.id }, { email: data.email }],
      });

      if (check?.email === data.email) {
        await artifacts.updateOne(
          { _id: new ObjectId(data.id) },
          { $inc: { like: -1 } }
        );
        const delLike = await artifactsLikes.deleteOne({
          $and: [{ id: data.id }, { email: data.email }],
        });
        res.send(delLike);
      } else {
        await artifacts.updateOne(
          { _id: new ObjectId(data.id) },
          { $inc: { like: 1 } }
        );
        const result = await artifactsLikes.insertOne(data);
        res.send(result);
      }
    });
    // artifacts post
    app.post("/artifacts", authenticateToken, async (req, res) => {
      const data = req.body;
      const result = await artifacts.insertOne(data);
      res.send(result);
    });
    // update artifacts
    app.patch("/artifacts/update/:id", authenticateToken, async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const result = await artifacts.updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
      );
      res.send(result);
    });
    // delete artifacts
    app.delete("/artifacts/delete/:id", authenticateToken, async (req, res) => {
      const id = req.params.id;
      const result = await artifacts.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });
    // artifacts details get
    app.get("/artifacts/details/:id", authenticateToken, async (req, res) => {
      const id = req.params.id;

      const result = await artifacts.findOne({ _id: new ObjectId(id) });

      res.send(result);
    });
    // my artifacts get
    app.get("/artifacts/myartifacts", authenticateToken, async (req, res) => {
      const email = req?.query?.email;

      const result = await artifacts.find({ creatorEmail: email }).toArray();

      res.send(result);
    });
    //all artifacts  get
    app.get("/artifacts", async (req, res) => {
      const result = await artifacts.find({}).toArray();

      res.send(result);
    });
    // search artifacts with name
    app.get("/artifacts/search/:val", async (req, res) => {
      const val = req.params.val;

      if (val) {
        const result = await artifacts
          .find({ artifactName: { $regex: val, $options: "i" } })
          .toArray();
        res.send(result);
      } else {
        req.send([]);
      }
    });
    // home page artifacts with sort functionality
    app.get("/artifacts/home", async (req, res) => {
      const result = await artifacts
        .find({})
        .sort({ like: -1 })
        .limit(6)
        .toArray();

      res.send(result);
    });

    // home route
    app.get("/", async (req, res) => {
      res.send({ connected: true });
    });
    // feedback for website
    app.post("/artifacts/feedback", authenticateToken, async (req, res) => {
      const data = req.body;
      const result = await feedback.insertOne(data);
      res.send(result);
    });
    // feedback get
    app.get("/artifacts/feedback", async (req, res) => {
      const result = await feedback
        .find({})
        .sort({ time: -1 })
        .limit(2)
        .toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch();

app.listen(port, () => {});
