const fecha = document.querySelector("#fecha");
const input = document.getElementById("input");
const lista = document.getElementById("lista");
const botonEnter = document.getElementById("boton-enter");
let check = "fa-check-circle";
let uncheck =  "fa-circle";
let lineThrough = "realizadas";
let id;
let listaTareas = [];

let newFecha = new Date()
fecha.innerHTML = newFecha.toLocaleDateString("es-MX", {weekday:"long", month:"short", day:"numeric"});

function agregarTarea(tarea, id, realizado, eliminado){
    
    if(eliminado) {return}
    const agregarCheck = realizado ?check :uncheck;
    const yaRealizado = realizado ?lineThrough :"";

    const elemento = `<li id="elemento">
                        <i class="far ${agregarCheck}" data="realizado" id=${id}></i>
                        <p class="text ${yaRealizado}">${tarea}</p> 
                        <i class="fas fa-trash de" data="eliminado" id=${id}></i>
                    </li>`
    lista.insertAdjacentHTML("beforeend", elemento)
    
}

function tareaRealizada(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(lineThrough);
    listaTareas[element.id].realizado = listaTareas[element.id].realizado ?false :true;
}

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    listaTareas[element.id].eliminado = true;
}

botonEnter.addEventListener("click", () => {
    const tarea = input.value;
    console.log(input.value)
    if(tarea){
        agregarTarea(tarea, id, false, false)
        listaTareas.push({
            nombre: tarea,
            id: id,
            realizado: false, 
            eliminado: false
        })
    }
    input.value = "";
    id++;
});

lista.addEventListener("click", function (event){
    let element = event.target;
    let nuevoElement = element.attributes.data.value;

    if(nuevoElement === "realizado"){
        tareaRealizada(element);
    }else if(nuevoElement === "eliminado"){
        tareaEliminada(element);
    }
})