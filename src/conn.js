import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'andre',
    database: 'soccer_db',
    password: 'root',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default pool