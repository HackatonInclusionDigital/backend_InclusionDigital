const pool = require('./connection');
const debug = require('debug')('app:database-mysql');

const executeQuery = async (sql, params = []) => {
    try {
        const [rows] = await pool.execute(sql, params);
        return rows;
    } catch (error) {
        debug('Error en la consulta MySQL:', error);
        throw new Error('Error en la consulta a la base de datos');
    }
};

const findAll = async (sql) => {
    try {
        const [rows] = await pool.query(sql);
        return rows;
    } catch (error) {
        debug('Error al ejecutar la consulta MySQL:', error);
        throw new Error('Error al ejecutar la consulta MySQL');
    }
};

module.exports.queryMysql = {
    executeQuery,
    findAll
};
