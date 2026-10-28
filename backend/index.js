// ✅ Required dependencies
const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcryptjs"); // 🔒 for password hashing

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

    const lastProduct = await Product.findOne().sort({ id: -1 });
    let id = lastProduct ? lastProduct.id + 1 : 1;

    const product = new Product({
      id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    await product.save();

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

// ✅ API for getting all products
app.get("/allproducts", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, data: products });
  } catch (error) {
    console.error("❌ Error getting all products:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

/* ---------------------------------------------------------------------
   🧩 NEW PRODUCT DISPLAY ROUTES
--------------------------------------------------------------------- */

// ✅ API for getting new collection (latest 8 added products)
app.get("/newcollection", async (req, res) => {
  try {
    const newCollection = await Product.find({}).sort({ date: -1 }).limit(8);
    res.json({ success: true, data: newCollection });
  } catch (error) {
    console.error("❌ Error getting new collection:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ✅ API for getting popular items (fixed women category)
app.get("/popularinwomen", async (req, res) => {
  try {
    const popularItems = await Product.find({ category: "women" }).limit(8);
    res.json({ success: true, data: popularItems });
  } catch (error) {
    console.error("❌ Error getting popular items:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ✅ Optional: Make it dynamic (for future flexibility)
// Example: /popular?category=men  or /popular?category=kids
app.get("/popular", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const popularItems = await Product.find(filter).limit(8);
    res.json({ success: true, data: popularItems });
  } catch (error) {
    console.error("❌ Error getting popular items dynamically:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

/* ---------------------------------------------------------------------
   🧑‍💻 USER SCHEMA + AUTH + CART ROUTES
--------------------------------------------------------------------- */

// ✅ User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Object,
    default: {},
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

/* ---------------------------------------------------------------------
   🔹 API: User Registration
--------------------------------------------------------------------- */
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "secret_ecom",
      { expiresIn: "3d" }
    );

    res.json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.error("❌ Error in /signup:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

/* ---------------------------------------------------------------------
   🔹 API: User Login
--------------------------------------------------------------------- */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "secret_ecom",
      { expiresIn: "3d" }
    );

    res.json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.error("❌ Error in /login:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

/* ---------------------------------------------------------------------
   🔹 API: Save Cart Data for User
--------------------------------------------------------------------- */
app.post("/savecart", async (req, res) => {
  try {
    const { token, cartData } = req.body;
    const decoded = jwt.verify(token, "secret_ecom");
    await User.findByIdAndUpdate(decoded.id, { cartData });
    res.json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    console.error("❌ Error saving cart:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

/* ---------------------------------------------------------------------
   🔹 API: Get Cart Data
--------------------------------------------------------------------- */
/* ---------------------------------------------------------------------
   🔹 API: Save Cart Products in MongoDB
--------------------------------------------------------------------- */
app.post("/savecartproducts", async (req, res) => {
  try {
    const { token, cartItems } = req.body;

    // ✅ Check if token is provided
    if (!token) {
      return res.status(401).json({ success: false, message: "Token required" });
    }

    // ✅ Verify JWT token
    const decoded = jwt.verify(token, "secret_ecom");
    const userId = decoded.id;

    // ✅ Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ Save cart products in user document
    user.cartData = cartItems;
    await user.save();

    res.json({ success: true, message: "Cart products saved successfully" });
  } catch (error) {
    console.error("❌ Error saving cart products:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/getcart", async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, "secret_ecom");
    const user = await User.findById(decoded.id);
    res.json({ success: true, cartData: user.cartData });
  } catch (error) {
    console.error("❌ Error getting cart:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});
/* ---------------------------------------------------------------------
   🧩 Middleware: Fetch User from Token
--------------------------------------------------------------------- */
const fetchUser = (req, res, next) => {
  try {
    const token = req.body.token || req.headers.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    // Verify token and attach decoded data to request
    const decoded = jwt.verify(token, "secret_ecom");
    req.user = decoded; // ✅ Attach user info (id, email) to request
    next();
  } catch (error) {
    console.error("❌ Invalid token:", error);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
//create endpoint to remove  products from cartdata
/* ---------------------------------------------------------------------
   🔹 API: Remove a Product from Cart Data
--------------------------------------------------------------------- */
app.post("/removecartitem", fetchUser, async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Get current cart
    const currentCart = user.cartData || {};

    // Remove the specific product by its ID
    if (currentCart[productId]) {
      delete currentCart[productId];
    } else {
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    }

    // Update user document
    await User.findByIdAndUpdate(userId, { cartData: currentCart });

    res.json({
      success: true,
      message: "Product removed from cart successfully",
      cartData: currentCart,
    });
  } catch (error) {
    console.error("❌ Error removing product from cart:", error);
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
