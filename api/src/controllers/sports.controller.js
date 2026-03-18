const axios = require("axios");

const sportsApi = axios.create({
  timeout: 5000,
});

const obtenerPartidosHome = async (req, res) => {
  try {
    // Si luego quieres usar API real, reemplaza esta parte.
    return res.json({
      ok: true,
      data: [
        {
          id: 1,
          home: "LDCCPE",
          away: "Barcelona SC",
          date: "2026-03-16",
          status: "Programado",
        },
        {
          id: 2,
          home: "Emelec",
          away: "Liga de Quito",
          date: "2026-03-17",
          status: "Programado",
        },
      ],
    });
  } catch (error) {
    console.error("ERROR SPORTS HOME:", error.message);

    return res.json({
      ok: false,
      data: [],
      mensaje: "No se pudieron cargar los partidos",
    });
  }
};

const obtenerPartidosEnVivo = async (req, res) => {
  try {
    return res.json({
      ok: true,
      data: [
        {
          id: 1,
          home: "LDCCPE",
          away: "Orense",
          score: "1 - 0",
          minute: "67'",
          status: "En vivo",
        },
      ],
    });
  } catch (error) {
    console.error("ERROR SPORTS LIVE:", error.message);

    return res.json({
      ok: false,
      data: [],
      mensaje: "No se pudieron cargar los partidos en vivo",
    });
  }
};

const obtenerTablaPosiciones = async (req, res) => {
  try {
    return res.json({
      ok: true,
      data: [
        { position: 1, team: "LDCCPE", points: 12 },
        { position: 2, team: "Barcelona SC", points: 10 },
        { position: 3, team: "Liga de Quito", points: 9 },
        { position: 4, team: "Orense", points: 7 },
      ],
    });
  } catch (error) {
    console.error("ERROR SPORTS STANDINGS:", error.message);

    return res.json({
      ok: false,
      data: [],
      mensaje: "No se pudo cargar la tabla de posiciones",
    });
  }
};

module.exports = {
  obtenerPartidosHome,
  obtenerPartidosEnVivo,
  obtenerTablaPosiciones,
};