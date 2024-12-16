const { pool } = require("../server/server");

const filtrarJoyas = async ({ precio_max, precio_min, categoria, metal }) => {
  let filtros = [];

  precio_max && filtros.push(`precio <= ${precio_max}`);
  precio_min && filtros.push(`precio >= ${precio_min}`);
  categoria && filtros.push(`categoria = '${categoria}'`);
  metal && filtros.push(`metal = '${metal}'`);

  let consulta = "SELECT * FROM inventario";
  if (filtros.length > 0) {
    filtros = filtros.join(" AND ");
    consulta += ` WHERE ${filtros}`;
  }

  const { rows, rowCount } = await pool.query(consulta);
  return { rows, rowCount, filtros };
};

function validFiltros(req, res, next, filtros) {
  if (page > 0) {
    next();
  } else {
    res.send("La pagina es invalida");
  }
}

const prepararHATEOASfiltros = (rows) => {
  const results = rows.map((m) => {
      return {
        id: m.id,
        nombre: m.nombre,
        categoria: m.categoria,
        metal: m.metal,
        precio: m.precio,
        stock: m.stock,
        href: `/joyas/filtros/${m.id}`,
      };
    }).slice(0, 4);
  const total = rows.length;
  const HATEOAS = {
    total,
    results,
  };
  return HATEOAS;
};


module.exports = { filtrarJoyas, validFiltros, prepararHATEOASfiltros };
