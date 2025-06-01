require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const setupSwagger = require("./swagger");
const globalErrorHandler = require("./middleware/global-error-handler");

// Sequelize instance
const sequelize = require("./config/db");

// Routes
const userRoutes       = require("./routes/user.routes");
const categoryRoutes   = require("./routes/category.routes");
const brandRoutes      = require("./routes/brand.routes");
const productRoutes    = require("./routes/product.routes");
const orderRoutes      = require("./routes/order.routes");
const userOrderRoutes  = require("./routes/user.order.routes");
const couponRoutes     = require("./routes/coupon.routes");
const reviewRoutes     = require("./routes/review.routes");
const adminRoutes      = require("./routes/admin.routes");
const cloudinaryRoutes = require("./routes/cloudinary.routes");
const wishlistRoutes   = require("./routes/wishlist.routes");

const PORT = process.env.PORT || 7000;
const app  = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// --- Swagger docs ---
setupSwagger(app);

// --- Mount routes ---
app.use("/api/user",       userRoutes);
app.use("/api/category",   categoryRoutes);
app.use("/api/brand",      brandRoutes);
app.use("/api/product",    productRoutes);
app.use("/api/order",      orderRoutes);
app.use("/api/user-order", userOrderRoutes);
app.use("/api/coupon",     couponRoutes);
app.use("/api/review",     reviewRoutes);
app.use("/api/admin",      adminRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api/wishlist",   wishlistRoutes);

// --- Root & 404 handler ---
app.get("/", (req, res) => res.send("App working successfully"));

app.use(globalErrorHandler);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Not Found",
    errorMessages: [{ path: req.originalUrl, message: "Not Found" }],
  });
});

// --- Connect to MySQL & start server ---
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✔️  MySQL connected.");
    await sequelize.sync({ alter: true });
    console.log("✔️  Models synchronized.");
    
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error("Unable to connect to database:", err);
    process.exit(1);
  }
})();

module.exports = app;
