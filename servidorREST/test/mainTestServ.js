// ........................................................
// mainTestServ.js
// ........................................................
var request = require("request");
var assert = require("assert");
const Logica = require("../../logica/logica");
// ........................................................
// ........................................................
const IP_PUERTO = "http://localhost:8080";
// ........................................................
// main ()
// ........................................................
describe("Test 1 : Recuerda arrancar el servidor", function () {
  // ....................................................
  // ....................................................
  it("probar que GET /prueba responde ¡Funciona!", function (hecho) {
    request.get(
      { url: IP_PUERTO + "/buscarMedidaID/13", headers: { "User-Agent": "David" } },
      function (err, respuesta, carga) {

        var datosMedida = {
          id: 13,
          medida: "MedidaTestServ",
          fecha: "FechaTest",
          nombreSensor: "nombreTest",
          longitud: "LongitudTest",
          latitud: "LatitudTest"
        };
        var JSONpost = JSON.stringify(datosMedida)
        
        assert.equal(err, null, "¿ha habido un error?");
        assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)");
        assert.equal(carga, JSONpost, "¿La carga no es ¡Funciona!?");
        hecho();
      } // callback()
    ); // .get
  }); // it
  // ....................................................
  // ....................................................

  // ....................................................
  // ....................................................
  it("probar POST /insertarMedida", function (hecho) {
        var datosMedida = {
          id: 17,
          medida: "MedidaTestServ",
          fecha: "FechaTest",
          nombreSensor: "nombreTest",
          longitud: "LongitudTest",
          latitud: "LatitudTest"
        };
        //var JSONpost = JSON.stringify(datosMedida)
        request.post(
      {
        url: IP_PUERTO + "/insertarMedida",
        headers: { "User-Agent": "David", "Content-Type": "application/json" },
        body: JSON.stringify(datosMedida),
      },
      function (err, respuesta, carga) {
        assert.equal(err, null, "¿ha habido un error?" + err);
        assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)");
        hecho();
      } // callback
    ); // .post
  }); // it

  
}); // describe
