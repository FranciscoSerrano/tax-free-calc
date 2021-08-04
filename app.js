const altamonteTaxRate = 0.07;

const prevButton = document.querySelectorAll(".btn-prev");
const nextButton = document.querySelectorAll(".btn-next");
const addButton = document.querySelector(".btn-add");
const removeButton = document.querySelector(".btn-remove");
const submitButton = document.querySelector(".btn-submit")
const resetButton = document.querySelector(".btn-reset")
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");

let bagInput = document.getElementById("bag");
let tax = document.getElementById("tax");
let currentSubtotal = document.getElementById("current-subtotal");
let currentTaxableTotal = document.getElementById("current-taxable-total");

let numFormSteps = 0;
let bag = 0;
let taxable = 0;
let taxableCount = 2;

nextButton.forEach(btn => {
  btn.addEventListener("click", () => {
    bag = parseInt(document.getElementById("bag").value);
    if (!bag || bag <= 0) {
      alert("Please enter a valid subtotal")
    } else {
      currentSubtotal.innerHTML = bag;
      numFormSteps++;
      updateFormSteps();
      updateProgressBar();
    }
  })
})

prevButton.forEach(btn => {
  btn.addEventListener("click", () => {
    numFormSteps--;
    updateFormSteps();
    updateProgressBar();
  })
})

submitButton.addEventListener("click", () => {
  calculateTaxableItems();

  if (validateTotal()) {
    numFormSteps++;
    updateFormSteps();
    updateProgressBar();
    showTaxRate();
  } else {
    alert("Please make sure that your taxables + $1000 matches your subtotal.")
  }
})

resetButton.addEventListener("click", () => {
  bag = 0;
  taxable = 0;
  taxableCount = 2;
  currentSubtotal.innerHTML = 0;
  currentTaxableTotal.innerHTML = 0;
  bagInput.value = "";
})

addButton.addEventListener("click", () => {
  addInputField();
  taxableCount++;
})

removeButton.addEventListener("click", () => {
  const plusItemsChilds = document.getElementById("plus-items").childNodes

  if (plusItemsChilds.length > 3) {
    removeInputField();
    taxableCount--;
  }
})

function validateTotal() {
  if(currentSubtotal.innerHTML - currentTaxableTotal.innerHTML != 1000) return false;
  return true
}

function calculateTaxableItems() {
  const plusItems = document.getElementById("plus-items");
  const childNode = plusItems.children.length;
  let sum = 0;
  for (let i = 1; i <= childNode; i++) {
    const item = parseInt(document.getElementById(`taxable${i}`).value)
    sum += item;
  }
  currentTaxableTotal.innerHTML = sum;
}

function updateFormSteps() {
  formSteps.forEach(formSteps => {
    formSteps.classList.contains("form-step-active") &&
    formSteps.classList.remove("form-step-active");
  });
  formSteps[numFormSteps].classList.add("form-step-active");
}

function updateProgressBar() {
  progressSteps.forEach((progressStep, index) => {
    if(index < numFormSteps + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  })
  const progressActive = document.querySelectorAll(".progress-step-active");
  progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}

function addInputField() {
  const taxableItem = document.createElement('input');
  taxableItem.type = "number";
  taxableItem.name = "taxable";
  taxableItem.className = "taxable";
  taxableItem.id = `taxable${taxableCount}`;

  const plusItems = document.getElementById("plus-items");
  plusItems.appendChild(taxableItem);
}

function removeInputField() {
  const plusItems = document.getElementById("plus-items")
  const lastTaxableItem = plusItems.lastChild;
  lastTaxableItem.remove();
}

function newTaxRate(bag, taxable) {
  if (bag < taxable) return "Error: Bag cannot be less than taxable subtotal";
  if (bag <= 1000 || taxable === 0) return (altamonteTaxRate * 100).toFixed(2);
  const taxRate = (taxable / bag * altamonteTaxRate) * 100;
  return taxRate.toFixed(2);
}

function showTaxRate() {
  tax.innerHTML = `Your new tax rate is: <span>${newTaxRate(parseInt(currentSubtotal.innerHTML), parseInt(currentTaxableTotal.innerHTML))}%</span>`;
}