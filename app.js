const altamonteTaxRate = 0.07;

const prevButton = document.querySelectorAll(".btn-prev");
const nextButton = document.querySelectorAll(".btn-next");
const submitButton = document.querySelector(".btn-submit")
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const tax = document.getElementById("tax");

let numFormSteps = 0;
let bag = 0;
let taxable = 0;

nextButton.forEach(btn => {
  btn.addEventListener("click", () => {
    numFormSteps++;
    updateFormSteps();
    updateProgressBar();
    bag = parseInt(document.getElementById("bag").value);
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
  numFormSteps++;
  updateFormSteps();
  updateProgressBar();
  console.log("submitted");
  taxable = parseInt(document.getElementById("taxable").value);
  showTaxRate();
})

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


function newTaxRate(bag, taxable) {
  if(bag < taxable) return "Error: Bag cannot be less than taxable subtotal";
  if(bag <= 1000 || taxable === 0) return bag;
  const taxRate = (taxable / bag * altamonteTaxRate) * 100;
  return taxRate.toFixed(2);
}


function showTaxRate() {
  tax.innerHTML = `Your new tax rate is: ${newTaxRate(bag, taxable)}%`;
}