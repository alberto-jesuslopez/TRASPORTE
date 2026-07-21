// =======================================
// TARIFAS DE TRANSPORTE
// =======================================

let tarifas = [];

const txtDestino = document.getElementById("destino");
const cmbTipo = document.getElementById("tipo");
const resultado = document.getElementById("resultado");
const lista = document.getElementById("listaDestinos");

function normalizar(texto){
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g,"")
        .trim()
        .toUpperCase();
}

fetch("tarifas.json")
.then(r => r.json())
.then(datos => {

    tarifas = datos;

    datos.forEach(item => {

        const option = document.createElement("option");
        option.value = item.DESTINO;
        lista.appendChild(option);

    });

})
.catch(err => {

    console.error(err);

    resultado.innerHTML = "Error cargando tarifas.json";

});

function buscarPrecio(){

    const destino = normalizar(txtDestino.value);

    if(destino===""){
        resultado.innerHTML="Introduce un destino";
        return;
    }

    const tarifa = tarifas.find(t =>
        normalizar(t.DESTINO) === destino
    );

    if(!tarifa){

        resultado.innerHTML="Destino no encontrado";
        resultado.style.color="red";
        return;

    }

    const precio = tarifa[cmbTipo.value];

    resultado.style.color="green";
    resultado.innerHTML = precio + " €";

}

txtDestino.addEventListener("input",buscarPrecio);
cmbTipo.addEventListener("change",buscarPrecio);
