const axios = require("axios");

const obtenerNoticiasHome = async (req, res) => {
  try {
    const response = await axios.get(
      "https://newsapi.org/v2/top-headlines",
      {
        params: {
          category: "sports",
          language: "es",
          pageSize: 8,
          apiKey: process.env.NEWS_API_KEY,
        },
        timeout: 5000,
      }
    );

    const articulos = response.data?.articles || [];

    return res.json({
      ok: true,
      data: articulos,
      noticias: articulos,
    });
  } catch (error) {
    console.error("ERROR NEWS HOME:", error.message);

    return res.json({
      ok: false,
      data: [],
      noticias: [],
      mensaje: "No se pudieron cargar noticias",
    });
  }
};

module.exports = {
  obtenerNoticiasHome,
};