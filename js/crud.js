// ==================== CRUD ====================

// Toggle between Traditional and Per Foot mode
function toggleLaborMode(section) {
    const modeKey = section + "Mode";
    estimate[modeKey] = estimate[modeKey] === "traditional" ? "perFoot" : "traditional";
    calculateAll();
}

// ==================== ADD ROW FUNCTIONS ====================

window.addShopLaborRow = function() {
    const isPerFoot = estimate.shopLaborMode === "perFoot";
    estimate.shopLabor.push({
        id: generateId(),
        description: "",
        guys: isPerFoot ? 0 : 1,
        days: isPerFoot ? 0 : 1,
        rate: isPerFoot ? 0 : 360,
        pricePerFoot: isPerFoot ? 2.50 : 0
    });
    calculateAll();
};

window.addFieldLaborRow = function() {
    const isPerFoot = estimate.fieldLaborMode === "perFoot";
    estimate.fieldLabor.push({
        id: generateId(),
        description: "",
        guys: isPerFoot ? 0 : 1,
        days: isPerFoot ? 0 : 1,
        rate: isPerFoot ? 0 : 360,
        pricePerFoot: isPerFoot ? 3.50 : 0
    });
    calculateAll();
};

window.addPaintLaborRow = function() {
    const isPerFoot = estimate.paintLaborMode === "perFoot";
    estimate.paintLabor.push({
        id: generateId(),
        description: "",
        guys: isPerFoot ? 0 : 1,
        days: isPerFoot ? 0 : 1,
        rate: isPerFoot ? 0 : 360,
        pricePerFoot: isPerFoot ? 2.00 : 0
    });
    calculateAll();
};

// ==================== UPDATE & DELETE ====================

// Shop and Field Labor
window.updateShopLabor = function(index, field, value) {
    estimate.shopLabor[index][field] = value;
    calculateAll();
};
window.deleteShopLaborRow = function(index) {
    estimate.shopLabor.splice(index, 1);
    calculateAll();
};

window.updateFieldLabor = function(index, field, value) {
    estimate.fieldLabor[index][field] = value;
    calculateAll();
};
window.deleteFieldLaborRow = function(index) {
    estimate.fieldLabor.splice(index, 1);
    calculateAll();
};
window.addShopLaborRow = function() { estimate.shopLabor.push({ id: generateId(), description: "", guys: 1, days: 1, rate: 360 }); calculateAll(); };
window.updateShopLabor = function(index, field, value) { estimate.shopLabor[index][field] = value; calculateAll(); };
window.deleteShopLaborRow = function(index) { estimate.shopLabor.splice(index, 1); calculateAll(); };
window.addFieldLaborRow = function() { estimate.fieldLabor.push({ id: generateId(), description: "", guys: 1, days: 1, rate: 360 }); calculateAll(); };
window.updateFieldLabor = function(index, field, value) { estimate.fieldLabor[index][field] = value; calculateAll(); };
window.deleteFieldLaborRow = function(index) { estimate.fieldLabor.splice(index, 1); calculateAll(); };

// Paint Labor
window.updatePaintLabor = function(index, field, value) {
    estimate.paintLabor[index][field] = value;
    calculateAll();
};
window.deletePaintLaborRow = function(index) {
    estimate.paintLabor.splice(index, 1);
    calculateAll();
};
window.addPaintLaborRow = function() { estimate.paintLabor.push({ id: generateId(), description: "", guys: 1, days: 1, rate: 360 }); renderPaintLabor(); calculateAll(); };
window.updatePaintLabor = function(index, field, value) { estimate.paintLabor[index][field] = value; calculateAll(); };
window.deletePaintLaborRow = function(index) { estimate.paintLabor.splice(index, 1); calculateAll(); };



// Materials
window.updateMaterial = function(index, field, value) { estimate.materials[index][field] = value; calculateAll(); };
window.deleteMaterialRow = function(index) { estimate.materials.splice(index, 1); calculateAll(); };
window.addMaterialRow = function() {
    estimate.materials.push({ id: generateId(), description: "", vendor: "", qty: 0, unitCost: 0 });
    renderMaterials(); calculateAll();
};
window.addStockRow = function() {
    estimate.materials.push({ id: generateId(), description: "", vendor: "", qty: 0, unitCost: 0, isStock: true });
    renderMaterials(); calculateAll();
};
window.updateMaterialMarkup = function() { estimate.materialMarkupPercent = parseFloat(document.getElementById("material-markup-input").value) || 0; calculateAll(); };
window.updateShopMarkup = function() { estimate.shopLaborMarkupPercent = parseFloat(document.getElementById("shop-markup-input").value) || 0; calculateAll(); };
window.updateFieldMarkup = function() { estimate.fieldLaborMarkupPercent = parseFloat(document.getElementById("field-markup-input").value) || 0; calculateAll(); };

window.handleStockSelect = function(rowIndex, catalogIndex) {
    const item = STOCK_CATALOG[catalogIndex];
    estimate.materials[rowIndex].description = `${item.material} – ${item.dimensions}`;
    estimate.materials[rowIndex].unitCost = item.unitPrice;
    estimate.materials[rowIndex].catalogIndex = parseInt(catalogIndex);
    calculateAll();
};
// Consumables
window.addConsumableRow = function() { estimate.consumables.push({ id: generateId(), description: "", qty: 0, unitCost: 0 }); renderConsumables(); calculateAll(); };
window.updateConsumable = function(index, field, value) { estimate.consumables[index][field] = value; calculateAll(); };
window.deleteConsumableRow = function(index) { estimate.consumables.splice(index, 1); calculateAll(); };

// Paint Supplies
window.addPaintSupplyRow = function() { estimate.paintSupplies.push({ id: generateId(), description: "", qty: 0, unitCost: 0 }); renderPaintSupplies(); calculateAll(); };
window.updatePaintSupply = function(index, field, value) { estimate.paintSupplies[index][field] = value; calculateAll(); };
window.deletePaintSupply = function(index) { estimate.paintSupplies.splice(index, 1); calculateAll(); };

// Fuel
window.addFuelRow = function() {
    estimate.fuel.push({ id: generateId(), description: "Fuel Fill", tankFills: 1, costPerFill: 35 });
    renderFuel(); calculateAll();
};
window.updateFuel = function(index, field, value) { estimate.fuel[index][field] = value; calculateAll(); };
window.deleteFuelRow = function(index) { estimate.fuel.splice(index, 1); calculateAll(); };

// Rentals
window.addRentalRow = function() {
    estimate.rentalEquip.push({
        id: generateId(),
        description: "Rental Equipment",
        rentLength: 1,
        rentCost: 35
    });
    renderRental();
    calculateAll();
};
window.updateRental = function(index, field, value) { estimate.rentalEquip[index][field] = value; calculateAll(); };
window.deleteRentalRow = function(index) { estimate.rentalEquip.splice(index, 1); calculateAll(); };

// Tool Expense
window.addToolRow = function() {
    estimate.toolExpense.push({
        id: generateId(),
        description: "Tool Expense",
        quantity: 1,
        costPer: 35
    });
    renderToolExpense();
    calculateAll();
};
window.updateTool = function(index, field, value) { estimate.toolExpense[index][field] = value; calculateAll(); };
window.deleteToolRow = function(index) { estimate.toolExpense.splice(index, 1); calculateAll(); };

// Trip Fees
window.addTripRow = function() {
    estimate.tripFee.push({
        id: generateId(),
        description: "Trip Fee",
        numberOfTrips: 1,
        costPerTrip: 75
    });
    renderTripFee();
    calculateAll();
};
window.updateTrip = function(index, field, value) { estimate.tripFee[index][field] = value; calculateAll(); };
window.deleteTripRow = function(index) { estimate.tripFee.splice(index, 1); calculateAll(); };


// Markup
window.updateMarkup = function(source) {
    const slider = document.getElementById("markup-slider");
    const input = document.getElementById("markup-input");
    let percent;
    if (source && source.id === "markup-input") {
        percent = parseFloat(input?.value);
        if (isNaN(percent)) return;
        estimate.markupPercent = Math.max(0, Math.min(200, percent));
        if (slider) slider.value = estimate.markupPercent;
    } else {
        percent = parseFloat(slider?.value ?? 30);
        estimate.markupPercent = Math.max(0, Math.min(200, percent));
        if (input) input.value = estimate.markupPercent;
    }
    calculateAll();
};

// Markup Chart
function renderMarkupScenarios() {
    const tbody = document.getElementById("markup-scenarios-body");
    if (!tbody) return;
    const grandCost = calculateGrandCost();
    const footage = estimate.footage > 0 ? estimate.footage : 1;
    let html = "";
    for (let percent = 5; percent <= 100; percent += 5) {
        const totalPrice = grandCost * (1 + percent / 100);
        const perFoot = totalPrice / footage;
        html += `<tr>
            <td>${percent}%</td>
            <td>${formatCurrency(totalPrice)}</td>
            <td>${perFoot.toFixed(2)}</td>
        </tr>`;
    }
    tbody.innerHTML = html;
}