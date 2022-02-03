const btn = document.getElementById("calcul-btn");

function calcul(){
    value = calValue();
    showValue(value);
}
function calValue(){
    // calculate Value
    const percent = document.getElementById("percent-input");
    const percentValue = percent.value/100;
    const average = document.getElementById("adjust-input");
    let averageValue = 0.6;
    if (average !== null){
        averageValue = average.value/100;
    }
    const result = Math.log(1-averageValue)/ Math.log(1-percentValue) ;
    
    return Math.round(result*100)/100;
}
function showValue(value){
    // get value and show value to screen
    const area = document.getElementById("result-inner-area");
    const adjustRemove = area.querySelector("#adjust");
    const resultRemove = area.querySelector("#adjust-result");
    adjustRemove.remove();
    resultRemove.remove();

    const adjustArea = document.createElement("div");
    adjustArea.id = "result-adjust-area";
    const adjustRangeArea = document.createElement("div");
    adjustRangeArea.id = "adjust";
    const adjustSpan = document.createElement("span");
    adjustSpan.innerText = "확률"
    const adjustForm = document.createElement("form");
    adjustForm.action = "#";
    const adjustInput = document.createElement("input");
    adjustInput.id = "adjust-input";
    adjustInput.type = "range";
    adjustInput.max = 99;
    adjustInput.min = 1;
    adjustInput.value = localStorage.getItem("range");
    adjustInput.addEventListener("change", changePercent);
    const adjustValue = document.createElement("span");
    adjustSpan.innerText = `${adjustInput.value}%`;
    adjustForm.appendChild(adjustInput);
    adjustForm.appendChild(adjustValue);
    adjustRangeArea.appendChild(adjustSpan);
    adjustRangeArea.appendChild(adjustForm);
    area.appendChild(adjustRangeArea);

    const adjustResultArea = document.createElement("div");
    adjustResultArea.id = "adjust-result";
    const costArea = document.createElement("div");
    costArea.id = "adjust-cost";
    const costSpan = document.createElement("span");
    costSpan.innerText = "비용";
    costArea.appendChild(costSpan);
    const items = JSON.parse(localStorage.getItem("saved"));
    items.forEach(element => {
        const costInnerArea = document.createElement("div");
        const costName = document.createElement("span");
        costName.innerText = `${element.name} : `;
        const costValue = document.createElement("span");
        costValue.innerText = Math.round(parseInt(element.value)*value*100)/100;
        costInnerArea.appendChild(costName);
        costInnerArea.appendChild(costValue);
        costArea.appendChild(costInnerArea);
    });

    const trialArea = document.createElement("div");
    const trialSpan = document.createElement("span");
    trialSpan.innerText = "기대횟수 : ";
    const trialValue = document.createElement("span");
    trialValue.innerText = `${value}회`;
    trialArea.appendChild(trialSpan);
    trialArea.appendChild(trialValue);

    const descriptionArea = document.createElement("div");
    const description = document.createElement("span");
    description.innerText = `100명중 ${adjustInput.value}명이 ${Math.ceil(value)}회 안에 아이템을 뽑습니다.`
    descriptionArea.appendChild(description);

    adjustResultArea.appendChild(costArea);
    adjustResultArea.appendChild(trialArea);
    adjustResultArea.appendChild(descriptionArea);

    area.appendChild(adjustResultArea);
}
function changePercent(event){
    // evnet percent value change / calculate value and show additional value
    localStorage.setItem("range", event.target.value);
    calcul();
}

localStorage.setItem("range", 60);

btn.addEventListener("click", calcul);