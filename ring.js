function proccessForm(){
    const menge = document.getElementById("menge").value;
    let set = document.getElementById("set").value.split(",").map(Number);
    
    if (menge === "Z") {
        set = [-3, -2, -1, 0, 1, 2, 3];  // Ausschnitt der ganzen Zahlen
    } else if (menge === "R") {
        set = [-1, -0.5, 0, 0.5, 1];  // Ausschnitt der reellen Zahlen
    } else if (menge === "user") {
        set = document.getElementById("set").value.split(",").map(Number);
    }

    const resultElement = document.getElementById("result");

    let assoziativ = false;
    let abelsch = false;
    let neutralesElement = false;
    let distributiv = false;
    let abelsch2 = false;

    if (set.some(isNaN)) {
        resultElement.textContent = "Die Menge G enthält ungültige Werte.";
        return;
    }
    assoziativ = assoziativitätsPrüfung(set);
    abelsch = abelschPruefung(set);
    neutralesElement = set.includes(1);
    distributiv = distributivePruefung(set);
    abelsch2 = abelschPruefung2(set);

    if(assoziativ && abelsch && neutralesElement && distributiv){
        if (abelsch2){
            resultElement.textContent = "Die Menge bildet einen abelschen Ring.";
            resultElement.style.color = "green";
        }
        else {
            resultElement.textContent = "Die Menge bildet einen Ring.";
            resultElement.style.color = "green";
        }
    }else {
        resultElement.textContent = "Die Menge bildet keinen Ring.";
        resultElement.style.color = "red";
    }
}

function setMenge(){
    const menge = document.getElementById("menge").value;
    const inputDiv = document.getElementById("input");

    if (menge === "custom") {
        inputDiv.classList.remove('hidden');
    } 
    else if (menge === "Z") {
        inputDiv.classList.add('hidden');
    } else if (menge === "R") {
        inputDiv.classList.add('hidden');
    }
}

function assoziativitätsPrüfung(set){
    const length = set.length;
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                for (let k = 0; k < length; k++) {
                    let a = set[i];
                    let b = set[j];
                    let c = set[k];
                    let left, right;
                    left = a * b * c;
                    right = a * (b * c);
                    if (left !== right) {
                        console.log("Nicht assoziativ");
                        return false; 
                    }
                }
            }
        }
    return true;
}

function abelschPruefung(set){
    const length = set.length;
    let neutralesElement = set.includes(0);
    let inversesElement = set.every(a => set.includes(-a));

    //Neutrales und Inverses Element überprüfen
    if (!neutralesElement) {
        console.log("Keine Gruppe (neutral)")
        return false;
    }  
    if(!inversesElement){
        console.log("Keine Gruppe (invers)")
        return false;
    }
    //Assoziativität der Gruppe prüfen
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            for (let k = 0; k < length; k++) {
                let a = set[i];
                let b = set[j];
                let c = set[k];
                let left, right;
                left = a + b + c;
                right = a + (b + c);
                if (left !== right) {
                    console.log("Keine Gruppe (assoziativ)")
                    return false; 
                }
            }
        }
    }
    //Prüfen ob Gruppe abelsch ist
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
                let a = set[i];
                let b = set[j];
                let left, right;
                left = a + b;
                right = b + a;
                if (left !== right) {
                    console.log("Nicht abelsch")
                    return false; 
                }
        }
    }
return true;
}

function distributivePruefung(set){
    const length = set.length;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            for (let k = 0; k < length; k++) {
                let a = set[i];
                let b = set[j];
                let c = set[k];
                let left, right;
                left = (a + b) * c;
                right = a * c + b * c;
                if (left !== right) {
                    console.log("Nicht distributiv")
                    return false; 
                }
                let left2, right2;
                left2 = a * (b + c);
                right2 = a * b + a * c;
                if(left2 !== right2){
                    console.log("Nicht distributiv")
                    return false;
                }
            }
        }
    }
return true;

}

function abelschPruefung2(set){
    const length = set.length;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
                let a = set[i];
                let b = set[j];
                let left, right;
                left = a * b;
                right = b * a;
                if (left !== right) {
                    return false; 
                }
        }
    }
return true;
}