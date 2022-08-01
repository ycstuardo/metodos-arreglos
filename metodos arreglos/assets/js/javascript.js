"use strict";

const FixedTasks = [
  { id: 1, descripcion: "trabajar", estado: false },
  {
    id: 2,
    descripcion: "hacer el desafio",
    estado: false,
  },
  { id: 3, descripcion: "ver memes", estado: false },
  { id: 4, descripcion: "estudiar", estado: false },
];

const boxInput = document.querySelector("#input-new-task");
const boxButton = document.querySelector("#button-add");
const injectionHtml = document.querySelector("#tasks");
const injectionButtons = document.querySelector("#actions2");
const boxTotalTasks = document.querySelector("#total-task");
const boxTotalTaskDone = document.querySelector("#total-task-done");

let idInicial = FixedTasks.length + 1;
let TasksComponent = "";
let componentDeleteSelect = "";

window.onload = function () {
  ChargeData();
  AddEventClickCheckbox();
  AddEventClickButton();
  CountTasks();
};

const CountTasks = () => {
  const totalTasks = FixedTasks.length;
  const totalTasksDone = FixedTasks.filter((array) => array.estado);

  boxTotalTasks.innerHTML = totalTasks;
  boxTotalTaskDone.innerHTML = totalTasksDone.length;
};

const ChargeData = () => {
  FixedTasks.forEach((tarea) => {
    getHtml(tarea.id, tarea.descripcion, tarea.estado);
  });

  injectionHtml.innerHTML = TasksComponent;
  injectionButtons.innerHTML = componentDeleteSelect;
  CountTasks();

  TasksComponent = "";
  componentDeleteSelect = "";
};

const getHtml = (id, descripcion, estado) => {
  if (estado) {
    TasksComponent = `        
    <div class="job" id="job-${id}"> 
        <p>${id}</p> 
        <p style="text-decoration: line-through; color: red;" id="descripcion-${id}">
            ${descripcion}
        </p>
    </div>`;

    componentDeleteSelect = `
    <div class="action" id="action-${id}">
        <input type="checkbox" class="checkbox" id="check-${id}" checked="true">
        <button class="btn-delete" id="btn-delete-${id}" type="button"> X </button>
    </div>`;
  }

  TasksComponent += `
    <div class="job" id="job-${id}"> 
        <p>${id}</p> 
        <p id="descripcion-${id}">
            ${descripcion}
        </p>
    </div>`;

  componentDeleteSelect += `
    <div class="action" id="action-${id}">
        <input type="checkbox" class="checkbox" id="check-${id}">
        <button class="btn-delete" id="btn-delete-${id}" type="button"> X </button>
    </div>`;
};

const Add = (detalleTarea) => {
  if (!detalleTarea) {
    alert("Debe ingresar el nombre de la tarea");
    return;
  }

  FixedTasks.push({
    id: idInicial,
    descripcion: detalleTarea,
    estado: false,
  });
  idInicial++;

  ChargeData();
};

boxButton.addEventListener("click", () => {
  Add(boxInput.value);
  AddEventClickCheckbox();
  AddEventClickButton();
  document.querySelector("#input-tarea").value = "";
});

const changeCheck = (idCapturado) => {
  const index = FixedTasks.findIndex(
    (elemento) => Number(elemento.id) === Number(idCapturado)
  );

  let stepId = FixedTasks[index].id;
  let stepDescription = FixedTasks[index].descripcion;
  if (FixedTasks[index].estado === false) {
    FixedTasks.splice(index, 1, {
      id: stepId,
      descripcion: stepDescription,
      estado: true,
    });

    document.getElementById(`descripcion-${stepId}`).style.textDecoration =
      "line-through";
  } else {
    FixedTasks.splice(index, 1, {
      id: stepId,
      descripcion: stepDescription,
      estado: false,
    });

    document.getElementById(`descripcion-${stepId}`).style.textDecoration =
      "none";
    document.getElementById(`descripcion-${stepId}`).style.color = "white";
  }

  CountTasks();
};

const AddEventClickCheckbox = () => {
  const getChecks = document.querySelectorAll(".checkbox");

  getChecks.forEach((check) => {
    const checkClass = `#${check.id}`;
    const idsearch = checkClass.match(/\d+/g).join("");
    const boxCheck = document.querySelector(checkClass);

    boxCheck.addEventListener("click", () => {
      changeCheck(idsearch);
    });
  });
};

const deleteTasks = (idCapturado) => {
  const index = FixedTasks.findIndex(
    (elemento) => Number(elemento.id) === Number(idCapturado)
  );
  FixedTasks.splice(index, 1);
  ChargeData();
  AddEventClickButton();
  AddEventClickCheckbox();
};

const AddEventClickButton = () => {
  const getButtonsDelete = document.querySelectorAll(".btn-delete");

  getButtonsDelete.forEach((botonEliminar) => {
    const bntDeleteClass = `#${botonEliminar.id}`;
    const idsearch = bntDeleteClass.match(/\d+/g).join("");
    const boxBtn = document.querySelector(bntDeleteClass);
    boxBtn.addEventListener("click", () => {
      deleteTasks(idsearch);
    });
  });
};
