let tasks = [];
let counterId = 1;
let filtroActual = "todas"

class Task {
    constructor(name) {
        this.id = counterId++;
        this.name = name;
        this.completed = false;
    }

    changeState() {
        this.completed = !this.completed;
    }
}

// Funcion para agregar tareas
function agregarTarea(nombre) {
    if (!nombre.trim()) return;
    const newTask = new Task(nombre);
    tasks.push(newTask)
    mostrarTareas();
}

// Funcion para eliminar tareas
function eliminarTarea(id) {
    tasks = tasks.filter((t) => {
    return t.id !== id;
})
mostrarTareas();
}

// Funcion para filtrar tareas
function filtrarTareas(estado) {
    return tasks.filter((t) => {
    return t.completed === estado;
})
}

// Funcion para mostrar las tareas
function mostrarTareas() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    let tareasAMostrar = [];

    if (filtroActual === "completadas") {
        tareasAMostrar = filtrarTareas(true);
    } else if (filtroActual === "pendientes") {
        tareasAMostrar = filtrarTareas(false);
    } else {
        tareasAMostrar = tasks;
    }

    tareasAMostrar.forEach((t) => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = t.completed;
        checkbox.addEventListener("change", () => {
            t.changeState();
            mostrarTareas();
        });

        const span = document.createElement("span");
        span.textContent = t.name;
        if (t.completed) {
            span.classList.add("tarea-completada");
        }

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add("btn-eliminar")
        btnEliminar.addEventListener("click", () => {
            eliminarTarea(t.id);
        })
        
        // Añade al li y al ul
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(btnEliminar);

        lista.appendChild(li);
    });
}

// Eventos para ejecutar agregarTarea

const boton = document.querySelector(".btn")
const input = document.querySelector(".input")

boton.addEventListener("click", (e) => {
    e.preventDefault(); 
    agregarTarea(input.value);
    input.value = ""; // Borra el input para que el usuario no tenga que borrarlo
})

// Eventos para los botones de los filtros
const filters = document.querySelectorAll(".btn-filter")

filters.forEach((filtro) => {
    filtro.addEventListener("click", () => {
        filtroActual = filtro.dataset.filtro;
        mostrarTareas();
    });
});






