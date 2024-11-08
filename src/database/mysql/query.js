const pool = require('./connection');
const debug = require('debug')('app:database-mysql');

const exesql = async (sql, params = []) => {
    try {
        const [rows] = await pool.execute(sql, params);
        return rows;
    } catch (error) {
        debug('Error en la consulta MySQL:', error);
        throw new Error('Error en la consulta a la base de datos');
    }
};

module.exports = {
    exesql
};
