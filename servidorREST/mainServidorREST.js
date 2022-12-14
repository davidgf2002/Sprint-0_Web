// --------------------------------------------------------------------------------
// mainServidorREST.js
// --------------------------------------------------------------------------------

const express = require("express");
const bodyParser = require("body-parser");

const fs = require("fs");

const Logica = require("../logica/logica.js");

// --------------------------------------------------------------------------------
// En vez de tener que instalar una regla para cada función de la lógica
// adopto el convenio (usando solamente GET) que la llamadas son
//
//  ---------------------------
//  GET /nombreFuncionLogica
//
//  datos en JSON en el cuerpo
//  ---------------------------
//
//  de forma que con una regla sobra. Aunque esto "rompe" la filosofía REST.
//
// --------------------------------------------------------------------------------
function cargarReglasUniversales(servidorExpress, laLogica) {
  // .......................................................
  // Reglas del API REST
  // .......................................................



// --------------------------------------------------------------------------------
// main()
// --------------------------------------------------------------------------------
function main() {
  //
  //  cargo logica abriendo conexión
  //
  //var laLogica = await logica( "../bd/datos.bd" )
  var laLogica = null;
  laLogica = new Logica("../bd/medidas.bd", function (err) {
    if (err) {
      throw new Error("No he podido conectar con medidas.bd");
    }
  });

  //
  // creo el servidor 
  //
  var servidorExpress = express();

  //
  // para poder acceder a la carga de la petición http
  // (asumiendo que es JSON) hay que hacer esto:
  //
  // OK: original:
  servidorExpress.use(bodyParser.text({ type: "application/json" }));

  // Me ha dado problemas: servidorExpress.use( express.json() )

  // no creo que necesite esto: servidorExpress.use(express.urlencoded({ extended: true }));

  //
  // cargo las reglas REST
  //
  cargarReglasUniversales(servidorExpress, laLogica);

  //
  // configuración automática para que sirva ficheros de ../ux
  //
  servidorExpress.use(express.static("../ux"));

  //
  // arranco el servidor
  //
  var servicio = servidorExpress.listen(8080, function () {
    console.log(
      "servidor REST escuchando en el puerto 8080: http://localhost:8080/Aplicacion.html "
    );
  });

  //
  // capturo control-c para cerrar el servicio ordenadamente
  //
  process.on("SIGINT", function () {
    console.log(" terminando ");
    servicio.close();
  });
} // ()
}
// --------------------------------------------------------------------------------
// main()
// --------------------------------------------------------------------------------
main();

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
