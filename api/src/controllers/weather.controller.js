const axios = require("axios");

const getWeather = async (req, res) => {
  try {

    const response = await axios.get(
      "https://api.open-meteo.com/v1/forecast?latitude=-3.76&longitude=-79.62&current_weather=true"
    );

    res.json({
      ok: true,
      clima: response.data.current_weather
    });

  } catch (error) {

    res.status(500).json({
      ok: false,
      mensaje: "Error obteniendo clima"
    });

  }
};

module.exports = {
  getWeather
};
