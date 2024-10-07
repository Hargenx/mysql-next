const util = require('util');
const mysql = require('mysql2');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'aula2024'
});

// Verifica a base de dados para checar por exceções e erros comuns.
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Base de dados perdeu a conexão. ');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Base de dados tem muitas conexões.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Base de dados teve a conexão recusada.');
        }
    }

    if (connection) connection.release();

    return;
});

// Promisify para o método query.
pool.query = util.promisify(pool.query);

const executeQuery = (query, arraParms) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(query, arraParms, (err, data) => {
                if (err) {
                    console.log("Erro ao executar a query");
                    reject(err);
                }
                resolve(data);
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = { executeQuery };