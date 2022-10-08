
// ........................................................
// mainTestLogica.js
// ........................................................
const Logica = require("../Logica.js");
var assert = require("assert");
// ........................................................
// main ()
// ........................................................
describe("Test 1: Insertar Medida", function () {
  // ....................................................
  // ....................................................
  var laLogica = null;

  it("conectar a la base de datos", function (hecho) {
    laLogica = new Logica("../bd/medidas.bd", function (err) {
      if (err) {
        throw new Error("No he podido conectar con medidas.db");
      }
      hecho();
    });
  }); // it

  // ....................................................
  // ....................................................
  it("Buscar medida por ID", async function () {
        var res = await laLogica.buscarMedidaPorID("5");
        assert.equal(res.length, 1, "No existe medida con esa ID");
  }); // it

  it("Insertar Medida", async function () {
    await laLogica.insertarMedida(
        {
            id: null,
            medida: "medidaTest",
            fecha: "fechaTest",
            nombreSensor: "nombreTest",
            latitud: "latitudTest",
            longitud: "longitudTest"
        })

    var res = await laLogica.buscarMedidaPorID("12");
    assert.equal(res.length, 1, "¿no hay un resulado?");
    assert.equal(res[0].id, "12", "¿La ID no es 12?");
    assert.equal(res[0].medida, "medidaTest", "¿no es medidaTest?");
    assert.equal(res[0].latitud, "latitudTest", "¿no es latitudTest?");
    assert.equal(res[0].longitud, "longitudTest", "¿no es longitudTest?");
  }); // it



  it("cerrar conexión a la base de datos", async function () {
    try {
      await laLogica.cerrar();
    } catch (err) {
      // assert.equal( 0, 1, "cerrar conexión a BD fallada: " + err)
      throw new Error("cerrar conexión a BD fallada: " + err);
    }
  }); // it
})
