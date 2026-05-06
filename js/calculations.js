// ==================== CALCULATIONS ====================
function calculateMaterialSubtotal() {
    return estimate.materials.reduce((sum, row) => sum + calculateLineTotal(row), 0);
}
function calculateMaterialTax() {
    return calculateMaterialSubtotal() * (estimate.materialTaxRate / 100);
}
function calculateMaterialWithMarkup() {
    return (calculateMaterialSubtotal() + calculateMaterialTax()) * (1 + estimate.materialMarkupPercent / 100);
}

function calculateConsumablesTotal() { return estimate.consumables.reduce((sum, row) => sum + calculateLineTotal(row), 0); }
function calculatePaintSuppliesTotal() { return estimate.paintSupplies.reduce((sum, row) => sum + calculateLineTotal(row), 0); }
function calculatePaintLaborTotal() { return estimate.paintLabor.reduce((sum, row) => sum + calculateLaborTotal(row), 0); }
function calculateFuelTotal() { return estimate.fuel.reduce((sum, row) => sum + (row.tankFills || 0) * (row.costPerFill || 0), 0); }

function calculateShopWithMarkup() {
    const subtotal = estimate.shopLabor.reduce((sum, row) => sum + calculateLaborTotal(row), 0);
    return subtotal * (1 + estimate.shopLaborMarkupPercent / 100);
}
function calculateFieldWithMarkup() {
    const subtotal = estimate.fieldLabor.reduce((sum, row) => sum + calculateLaborTotal(row), 0);
    return subtotal * (1 + estimate.fieldLaborMarkupPercent / 100);
}

function calculateGrandCost() {
    return calculateMaterialWithMarkup() +
           calculateConsumablesTotal() +
           calculatePaintSuppliesTotal() +
           calculatePaintLaborTotal() +
           calculateFuelTotal() +
           calculateShopWithMarkup() +
           calculateFieldWithMarkup() +
           Object.values(estimate.otherCosts).reduce((sum, val) => sum + val, 0);
}