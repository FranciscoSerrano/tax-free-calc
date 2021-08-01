const altamonteTaxRate = 0.07;

function newTaxRate(bag, taxable) {
  if(bag < taxable) return "Error: Bag cannot be less than taxable subtotal"
  if(bag <= 1000 || taxable === 0) return bag;
  const taxRate = (taxable / bag * altamonteTaxRate) * 100;
  return taxRate.toFixed(2);
}


// simple tests
console.log(newTaxRate(1356, 337)); // 1.74
console.log(newTaxRate(1299, 299)); // 1.61
console.log(newTaxRate(1000, 0)); // 1000
console.log(newTaxRate(0, 1000)); // Error
