// creating api for getting all products   
const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

app.use(express.json());
app.use(cors());

// ✅ MongoDB connection
mongoose
  .connect("mongodb+srv://alirazachakrani090_db_user:AliRaza123@cluster0.9gjuwab.mongodb.net/e-commerce?retryWrites=true&w=majority")
.then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Express is working 🚀");
});

// ✅ Create upload folder if not exist
const uploadPath = path.join(__dirname, "upload/images");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// ✅ Multer storage setup for image upload
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

// ✅ Serve images statically
app.use("/images", express.static("upload/images"));

// ✅ Image upload endpoint
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// ✅ Mongoose schema for products
const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

// ✅ Define Product model
const Product = mongoose.model("Product", productSchema);

// ✅ Add product route (optimized + safe auto ID)
app.post("/addproduct", async (req, res) => {
  try {
    console.log("🟢 Request received to /addproduct");

    // ✅ Only find the last product by ID (fast)
    const lastProduct = await Product.findOne().sort({ id: -1 });

    // ✅ Auto-generate next ID
    let id = 1;
    if (lastProduct) {
      id = lastProduct.id + 1;
    }

    // ✅ Create new product
    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    console.log("📦 Product received:", product);

    // ✅ Save product to database
    await product.save();

    console.log("✅ Product saved successfully:", product.id);

    // ✅ Send response
    res.json({
      success: true,
      message: "Product added successfully",
      id: product.id,
      name: product.name,
    });
  } catch (error) {
    console.error("❌ Error adding product:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ✅ API for deleting products
app.delete("/removeproduct/:id", async (req, res) => {
  try {
    const result = await Product.findOneAndDelete({ id: req.params.id });

    if (result) {
      res.json({ success: true, message: "Product removed successfully" });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.error("❌ Error removing product:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ✅ API for getting all products (new endpoint)
app.get("/allproducts", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, data: products });
  } catch (error) {
    console.error("❌ Error getting all products:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ✅ Start the server
app.listen(port, (error) => {
  if (!error) {
    console.log(`🚀 Server running on port ${port}`);
  } else {
    console.log("Error:", error);
  }
});
