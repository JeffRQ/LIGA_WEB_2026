const express = require("express");
const router = express.Router();
const { obtenerNoticiasHome } = require("../controllers/news.controller");

router.get("/home", obtenerNoticiasHome);

module.exports = router;