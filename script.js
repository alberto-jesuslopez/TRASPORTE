// =======================================
// TARIFAS DE TRANSPORTE v2.0
// =======================================

let tarifas = [];

const txtDestino = document.getElementById("destino");
const cmbTipo = document.getElementById("tipo");
const resultado = document.getElementById("resultado");
const lista = document.getElementById("listaDestinos");


// Elimina acentos y pasa a mayúsculas
function normalizar(texto){

    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g,"")
        .trim()
        .toUpperCase();

}


// Cargar JSON
fetch("tarifas.json")

.then(response=>response.json())

.then(data=>{

    tarifas=data;

    data.forEach(item=>{

        const option=document.createElement("option");

        option.value=item.DESTINO;

        lista.appendChild(option);

    });

})

.catch(()=>{

    resultado.style.color="red";
    resultado.innerHTML="Error cargando tarifas";

});




// Buscar tarifa
function buscarPrecio(){

    const destino=normalizar(txtDestino.value);

    if(destino===""){

        resultado.innerHTML="Introduce un destino";
        resultado.style.color="#666";
        return;

    }

    let tipo=cmbTipo.value;

    if(tipo==="PESADO PARTICULAR"){

        tipo="PESADO PARTICULAR ";

    }

    const tarifa=tarifas.find(item=>

        normalizar(item.DESTINO)===destino

    );

    if(!tarifa){

        resultado.style.color="#dc3545";
        resultado.innerHTML="Destino no encontrado";
        return;

    }

    resultado.style.color="#198754";

    resultado.innerHTML=
        Number(tarifa[tipo]).toFixed(2)+" €";

}



// Buscar automáticamente al escribir
txtDestino.addEventListener("input",buscarPrecio);

// Buscar al cambiar el vehículo
cmbTipo.addEventListener("change",buscarPrecio);
