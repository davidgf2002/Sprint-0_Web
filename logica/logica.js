// .....................................................................
// Logica.js
// .....................................................................
const sqlite3 = require("sqlite3")
// .....................................................................
// .....................................................................
module.exports = class Logica {
    // .................................................................
    // nombreBD: Texto
    // -->
    // constructor () -->
    // .................................................................
    constructor(nombreBD, cb) {
        this.laConexion = new sqlite3.Database(
            nombreBD,
            (err) => {
                if (!err) {
                    this.laConexion.run("PRAGMA foreign_keys = ON")
                }
                cb(err)
            })
    } // ()


    // .................................................................
    // mostrarMedidas() -->
    // .................................................................
    mostrarMedidas() {
        var textoSQL = "SELECT * FROM Medidas";
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, //laConexion.all -> Devuelve todas las filas
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()




    // .................................................................
    // nombreTabla:Texto
    // -->
    // borrarFilasDe() -->
    // .................................................................
    borrarFilasDe(tabla) {
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(
                "delete from " + tabla + ";",
                (err) => (err ? rechazar(err) : resolver())
            )
        })
    } // ()



    // .................................................................
    // borrarFilasDeTodasLasTablas() -->
    // .................................................................
    async borrarFilasDeTodasLasTablas() {
        await this.borrarFilasDe("Medidas")
    } // ()



    // .................................................................
    // cerrar() -->
    // .................................................................
    cerrar() {
        return new Promise((resolver, rechazar) => {
            this.laConexion.close((err) => {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()


} // class
// .....................................................................
// .....................................................................
