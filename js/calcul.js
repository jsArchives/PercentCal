const btn = document.getElementById("calcul-btn");

function calcul(){
    value = calValue();
    showValue(value);
}
function calValue(){
    // calculate Value
}
function showValue(value){
    // get value and show value to screen
    const area = document.getElementById("result-inner-area");
    const resultArea = document.createElement("div");
    resultArea.id = "result-box";
    const resultPercentBox  = document.createElement("div");
    resultPercentBox.id = "result-percent";
    const resultPercentText = document.createElement("span");
    const RESULT_PERCENT_TEXT = "확률";
    resultPercentText.innerText = RESULT_PERCENT_TEXT;
    const resultPercentValue = document.createElement("span");
    const percentValue = document.getElementById("percent-input");
    resultPercentValue.innerText=`${percentValue.value}%`;
}
function changePercent(){
    // evnet percent value change / calculate value and show additional value
}

btn.addEventListener("click", calcul);