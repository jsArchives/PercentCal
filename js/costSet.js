const setBtn = document.querySelector("#cost-set-btn");
const setNameBtn = document.querySelector("#name-update-btn");
let clickNumber = 0;
let save = [];

function loadLocal(){
    const clicked = localStorage.getItem("clickNumber")
    if (clicked){
        clickNumber = localStorage.getItem("clickNumber");
    }
    const saved = localStorage.getItem("saved")
    if (saved){
        const parseSave = JSON.parse(saved);
        parseSave.forEach(creatCost);
        parseSave.forEach((item) => save.push(item));
    }
    SaveBtnReflesh();
}
function addCost(event){
    event.preventDefault();
    clickNumber++;
    
    let costName = prompt("Please enter cost name");
    if(costName === "" || costName === null){
        costName = clickNumber;
    }
    const MAINID = Date.now();
    const SUBID = `${MAINID}${clickNumber}`;
    const pushList = {
        mainId: MAINID,
        subId: SUBID,
        name: costName
    };
    save.push(pushList);
    creatCost(pushList);
    localStorage.setItem("clickNumber", clickNumber);
    localStorage.setItem("saved", JSON.stringify(save));
    SaveBtnReflesh();
}
function creatCost(list) {
    listMainID = list.mainId;
    listSubID = list.subId;
    listCostName = list.name;
    const parentArea = document.querySelector("#cost-input-area");
    const fullArea = document.createElement("div");
    fullArea.id = listMainID;
    fullArea.className = "cost-box";
    const nameDiv = document.createElement("div");
    nameDiv.className = "cost-name";
    const nameSpan = document.createElement("span");
    nameSpan.innerText = listCostName;
    const nameUpdateBtn = document.createElement("button");
    nameUpdateBtn.className = "name-update"
    nameUpdateBtn.addEventListener("click", nameUpdate);
    const nameDeleteBtn = document.createElement("button");
    nameDeleteBtn.className = "cost-delete"
    nameDeleteBtn.addEventListener("click", nameDelete);
    const valueDiv = document.createElement("div");
    valueDiv.className = "cost-value";
    const valueForm = document.createElement("form");
    valueForm.className = "cost-form";
    valueForm.id = listSubID;
    const valueInput = document.createElement("input");
    valueInput.className = "cost-input";
    valueInput.type = "number";

    nameDiv.appendChild(nameSpan);
    nameDiv.appendChild(nameUpdateBtn);
    nameDiv.appendChild(nameDeleteBtn);
    fullArea.appendChild(nameDiv);
    valueForm.appendChild(valueInput);
    valueDiv.appendChild(valueForm);
    fullArea.appendChild(valueDiv);
    parentArea.appendChild(fullArea);
}

function nameUpdate(event){
    const parent = event.target.parentElement;
    const span = parent.querySelector("span");
    let name = "";
    while(name === "" || name === null){
        name = prompt("Write name", span.innerText);
    }
    span.innerText = name;
}
function nameDelete(event){
    targetDiv = event.target.parentElement.parentElement;
    save = save.filter((item) => item.mainId !== parseInt(targetDiv.id));
    localStorage.setItem("saved", JSON.stringify(save));
    targetDiv.remove();
}
function SaveBtnReflesh(){
    const area = document.querySelector("#cost-input-area");
    const originBtn = document.querySelector("#cost-btn-area");
    originBtn.remove();
    const newBtnArea = document.createElement("div");
    newBtnArea.id = "cost-btn-area";
    const newBtn = document.createElement("button");
    newBtn.id="cost-save-btn";
    newBtnArea.appendChild(newBtn);
    area.appendChild(newBtnArea);
}

loadLocal()
setNameBtn.addEventListener("click", nameUpdate);
setBtn.addEventListener("click", addCost);