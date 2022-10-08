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
    // id:Texto
    // -->
    // buscarMedidaPorID() <--
    // <--
    // {id:Texto, medida:Float: fecha:String, nombreSensor:String, latitud:Float, longitud:Float}
    // .................................................................
    buscarMedidaPorID(id) {
        var textoSQL = "SELECT * FROM Medidas where id=$id";
        var valoresParaSQL = { $id: id }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL, //laConexion.all -> Devuelve todas las filas
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()

    

    // .................................................................
    // datos:{dni:Texto, nombre:Texto: apellidos:Texto}
    // -->.
    // insertarPersona() -->
    // .................................................................
    insertarMedida(datos) {
        var textoSQL = "INSERT INTO Medidas VALUES( $id, $medida, $fecha, $nombreSensor, $longitud, $latitud);"

        var valoresParaSQL = {
            $id: datos.id, 
            $medida: datos.medida,
            $fecha: datos.fecha,
            $nombreSensor: datos.nombreSensor,
            $longitud: datos.longitud,
            $latitud: datos.latitud
        }

        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
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
