const { pool } = require('../server/server');
const format = require('pg-format')

const obtenerJoyas = async( { limits, order_by, page } )=>{
    const [ campo, direccion ] = order_by.split("_");
    const offset = (page - 1) * limits;

    let consulta = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s', campo, direccion, limits, offset);

    const { rows, rowCount } = await pool.query(consulta);
    return {rows, rowCount, page}
};

function validPage(req, res, next, page){
    if(page > 0){
      next();
    } else{
      res.send('La pagina es invalida')
    };
};


const prepararHATEOASjoyas = (rows) => {
  const results = rows.map((m) => {
      return {
        id: m.id,
        nombre: m.nombre,
        categoria: m.categoria,
        metal: m.metal,
        precio: m.precio,
        stock: m.stock,
        href: `/joyas/${m.id}`,
      };
    }).slice(0, 4);
  const total = rows.length;
  const HATEOAS = {
    total,
    results,
  };
  return HATEOAS;
};

module.exports = { obtenerJoyas, validPage, prepararHATEOASjoyas }