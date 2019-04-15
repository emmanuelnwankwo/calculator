// Var declaration to get doc id's
const container = document.getElementById('container');
const operatorScreen = document.getElementById('operatorScreen');
const displayScreen = document.getElementById('displayScreen');
const equalsButton = document.getElementById('equalsButton');
let resultDisplayed = false;
let decimalAdded = false;
let operatorAdded = false;

const addNumberToDisplay = (number) => {
    if(resultDisplayed == true)
    {
        displayScreen.textContent = "";
        operatorScreen.textContent = "";
        resultDisplayed = false;
    }
    displayScreen.textContent += number;
    operatorAdded = false; 
}

const displayInput = (displayButtons) => {
    displayButtons.forEach(button => {
        button.addEventListener("click", event => {
            addNumberToDisplay(button.children[0].textContent);
        })
    });

    window.addEventListener("keypress", event => {
        switch(event.key){
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
              addNumberToDisplay(event.key);
              break;
            }
    });
}
const displayEventListener = () => {
    const displayButtons = document.querySelectorAll(".action");
    displayInput(displayButtons);
}


const addOperatorToDisplay = (operator) => {
    if ((operatorScreen.textContent == "" && displayScreen.textContent == "") || operatorAdded == true)
        return;
    else if (resultDisplayed == true){
        operatorScreen.textContent = displayScreen.textContent;
    }
    else{
        operatorScreen.textContent += displayScreen.textContent;
     }

    operatorScreen.textContent += operator;
    displayScreen.textContent = "";
    decimalAdded = false;
    resultDisplayed = false;
    operatorAdded = true;
}

const operatorInput = (operatorButtons) => {
    operatorButtons.forEach(button => {
      button.addEventListener("click", event => {
          addOperatorToDisplay(button.children[0].textContent);
        });
    });

    window.addEventListener("keypress", event => {
        switch(event.key){
            case "*":
            case "/":
            case "+":
            case "-":
            addOperatorToDisplay(event.key);
              break;
            }
    });
 }

const operatorEventListener = () => {
    const operatorButtons = document.querySelectorAll(".operator");
    operatorInput(operatorButtons);
}

const clear = () => {
    operatorScreen.textContent = "";
    displayScreen.textContent = "";
    resultDisplayed = false;
    decimalAdded = false;
    operatorAdded = false;
}

const clearEventListener = () => {
    const clearButton = document.getElementById("clearButton");
    clearButton.addEventListener("click", (e) =>{
      clear();
    });

    window.addEventListener("keypress", event => {
        if(event.key == "C" || event.key == "c")
            clear();
        });
    
  }

const displaySolution = () => {
    if (resultDisplayed == true)
        return;

    operatorScreen.textContent += displayScreen.textContent;
    const number = Function('"use strict";return (' + operatorScreen.textContent+ ')')();
    displayScreen.textContent = Math.round(number * 100) / 100;
    resultDisplayed = true;
    decimalAdded = false;
    operatorAdded = false;
}

const equalEventListener = () => {
    const equalButton = document.getElementById("equalsButton");
    equalButton.addEventListener("click", (e) =>{
      displaySolution();
    });

    window.addEventListener("keypress", event => {
        if(event.key == "=" || event.key == "Enter")
            displaySolution();
        });

  }

  const addDecimalToDisplay = () => {
    if(resultDisplayed == true)
    {
        displayScreen.textContent = "";
        operatorScreen.textContent = "";
        resultDisplayed = false;
    }

    if(decimalAdded == false)
      {
        displayScreen.textContent += ".";
      }
      
      decimalAdded  = true;
   
  } 
  
  const decimalEventListener = () => {
    const decimalButton = document.getElementById("dotButton");
    decimalButton.addEventListener("click", (e) =>{
        addDecimalToDisplay();
    });

    window.addEventListener("keypress", event => {
        if(event.key == ".")
            addDecimalToDisplay();
        });
    
  }

decimalEventListener();
displayEventListener();
operatorEventListener();
clearEventListener();
equalEventListener();