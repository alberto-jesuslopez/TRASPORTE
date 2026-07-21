// =======================================
// TARIFAS DE TRANSPORTE v3.0
// =======================================

let tarifas = [];

const txtDestino = document.getElementById("destino");
const cmbTipo = document.getElementById("tipo");
const resultado = document.getElementById("resultado");
const sugerencias = document.getElementById("sugerencias");

function normalizar(texto){

    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g,"")
        .trim()
        .toUpperCase();

}

fetch("tarifas.json")

.then(r=>r.json())

.then(datos=>{

    tarifas=datos;

})

.catch(error=>{

    console.error(error);

    resultado.innerHTML="Error cargando tarifas";

});

function mostrarSugerencias(){

    const texto=normalizar(txtDestino.value);

    sugerencias.innerHTML="";

    if(texto.length===0){

        sugerencias.style.display="none";
        return;

    }

    const encontrados=tarifas.filter(item=>

        normalizar(item.DESTINO).includes(texto)

    );

    encontrados.slice(0,10).forEach(item=>{

        const div=document.createElement("div");

        div.className="item";

        div.innerHTML=item.DESTINO;

        div.onclick=function(){

            txtDestino.value=item.DESTINO;

            sugerencias.style.display="none";

            buscarPrecio();

        };

        sugerencias.appendChild(div);

    });

    sugerencias.style.display=
        encontrados.length ? "block":"none";

}

function buscarPrecio(){

    const destino=normalizar(txtDestino.value);

    if(destino===""){

        resultado.style.color="#555";
        resultado.innerHTML="Introduce un destino";
        return;

    }

    const tarifa=tarifas.find(item=>

        normalizar(item.DESTINO)===destino

    );

    if(!tarifa){

        resultado.style.color="red";
        resultado.innerHTML="Destino no encontrado";
        return;

    }

    const precio=Number(tarifa[cmbTipo.value]);

    resultado.style.color="#198754";
    resultado.innerHTML=precio.toFixed(2)+" €";

}

txtDestino.addEventListener("keyup",mostrarSugerencias);

cmbTipo.addEventListener("change",buscarPrecio);

document.addEventListener("click",function(e){

    if(e.target!==txtDestino){

        sugerencias.style.display="none";

    }

});
