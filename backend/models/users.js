const connection = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
    static async create(nombre_usuario, email, contraseña, dni_o_ruc, nombres, apellidos, telefono) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO usuarios 
                (nombre_usuario, email, contraseña, tipo_usuario, estado, fecha_registro, dni_o_ruc, nombres, apellidos, telefono) 
                VALUES (?, ?, ?, 'normal', 'activado', NOW(), ?, ?, ?, ?)
            `;
            const values = [nombre_usuario, email, contraseña, dni_o_ruc, nombres, apellidos, telefono];
            connection.query(query, values, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    static findByUsername(username) {
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT * FROM usuarios WHERE nombre_usuario = ?',
                [username],
                (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(results[0]);
                }
            );
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT * FROM usuarios WHERE id_usuario = ?',
                [id],
                (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(results[0]);
                }
            );
        });
    }
}

module.exports = User;
