const modBtn = document.querySelector("#darkmode");

function transMod(event){
    const type = document.querySelector("#setting");
    event.preventDefault();
    if(type.className !== "white"){
        whiteMods();
        type.className = "white";
    }else{
        darkMods();
        type.className = "dark";
    }
}
function whiteMods(){
    const main = document.querySelector("#main-mods");
    const perArea = document.querySelector("#percent-area");
    const cosArea = document.querySelector("#cost-area");
    const resArea = document.querySelector("#result-area");

    main.classList.add("white-main");
    main.classList.remove("dark-main");
    perArea.classList.add("white");
    perArea.classList.remove("dark");
    cosArea.classList.add("white");
    cosArea.classList.remove("dark");
    resArea.classList.add("white");
    resArea.classList.remove("dark");
}
function darkMods(){
    const main = document.querySelector("#main-mods");
    const perArea = document.querySelector("#percent-area");
    const cosArea = document.querySelector("#cost-area");
    const resArea = document.querySelector("#result-area");

    main.classList.remove("white-main");
    main.classList.add("dark-main");
    perArea.classList.remove("white");
    perArea.classList.add("dark");
    cosArea.classList.remove("white");
    cosArea.classList.add("dark");
    resArea.classList.remove("white");
    resArea.classList.add("dark");
}

modBtn.addEventListener("click", transMod);