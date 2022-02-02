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
    if (saved !== "" && saved !== null){
        const parseSave = JSON.parse(saved);
        parseSave.forEach((item) => {
            if(item.mainId !== "100000001")
                creatCost(item);
        });
        parseSave.forEach((item) => save.push(item));
        const updateDefault = document.getElementById("100000001");
        const div = updateDefault.querySelector(".cost-name");
        const span = div.querySelector("span");
        span.innerText = save[0].name;
    }else{
        const pushList = {
            mainId: "100000001",
            subId: "100000000",
            name: "이름",
            value: 0
        };
        save.push(pushList);
    }

    const defaultCostForm = document.getElementById("100000000");
    const defaultCostInput = defaultCostForm.querySelector("input");
    defaultCostInput.value = save[0].value;
    defaultCostInput.addEventListener("change", costValueChange);
    defaultCostInput.setAttribute("onclick", "this.select()");
    localStorage.setItem("saved", JSON.stringify(save));
    SaveBtnReflesh();
}
function addCost(event){
    event.preventDefault();
    clickNumber++;
    
    let costName = prompt("Please enter cost name");
    if(costName === "" || costName === null){
        costName = clickNumber;
    }
    const MAINID = `${Date.now()}`;
    const SUBID = `${MAINID}${clickNumber}`;
    const pushList = {
        mainId: MAINID,
        subId: SUBID,
        name: costName,
        value: 0
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
    listValue = list.value;
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
    valueForm.setAttribute("action", "#");
    const valueInput = document.createElement("input");
    valueInput.className = "cost-input";
    valueInput.type = "number";
    valueInput.value = listValue;
    valueInput.setAttribute("onclick", "this.select()");
    valueInput.addEventListener("change", costValueChange);

    nameDiv.appendChild(nameSpan);
    nameDiv.appendChild(nameUpdateBtn);
    nameDiv.appendChild(nameDeleteBtn);
    fullArea.appendChild(nameDiv);
    valueForm.appendChild(valueInput);
    valueDiv.appendChild(valueForm);
    fullArea.appendChild(valueDiv);
    parentArea.appendChild(fullArea);
}
function costValueChange(event){
    const parent = event.target.parentElement;
    const target = parent.querySelector("input");
    const value = event.target.value;

    if(value < 0){
        target.value = 0;
        alert("don't write negative number");
    }
    const indexNum = save.findIndex((item) =>item.subId === parent.id);

    if(indexNum !== -1){
        save[indexNum].value = target.value;
    }
    localStorage.setItem("saved", JSON.stringify(save));
}
function nameUpdate(event){
    const parent = event.target.parentElement;
    const span = parent.querySelector("span");
    const area = event.target.parentElement.parentElement;

    let changeName = "";
    const indexNum = save.findIndex((item) => item.mainId === area.id);
    while(changeName === "" || changeName === null){
        changeName = prompt("Write name", span.innerText);
    }
    span.innerText = changeName;
    if(indexNum !== -1){
        save[indexNum].name = changeName;
    }
    localStorage.setItem("saved", JSON.stringify(save));
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
    newBtn.id="calcul-btn";
    newBtn.className="cost-save-btn";
    newBtnArea.appendChild(newBtn);
    area.appendChild(newBtnArea);
    newBtn.addEventListener("click", calcul);
}
function percentValueChange(event){
    const value = event.target.value;
    if(value <= 0 || value >= 100){
        event.target.value = 0;
        alert("0초과 100미만 수 입력");
    }
}

const percentInput = document.getElementById("percent-input");

percentInput.addEventListener("change", percentValueChange);
loadLocal()
setNameBtn.addEventListener("click", nameUpdate);
setBtn.addEventListener("click", addCost);