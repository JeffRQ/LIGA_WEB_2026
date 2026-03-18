const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensaje: "API LDCCPE funcionando correctamente" });
});

const dashboardRoutes = require("./routes/dashboard.routes");
const authRoutes = require("./routes/auth.routes");
const reservationRoutes = require("./routes/reservation.routes");
const fieldRoutes = require("./routes/field.routes");
const userRoutes = require("./routes/user.routes");
const sportsRoutes = require("./routes/sports.routes");
const newsRoutes = require("./routes/news.routes");

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/fields", fieldRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sports", sportsRoutes);
app.use("/api/news", newsRoutes);

module.exports = app;