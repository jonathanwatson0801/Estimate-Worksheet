// ==================== RENDER FUNCTIONS ====================

// Materials
function renderMaterials() {
    const tbody = document.getElementById("materials-body");
    tbody.innerHTML = "";
    estimate.materials.forEach((row, index) => {
        const total = calculateLineTotal(row);
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="td-desc"><input type="text" value="${row.description || ''}" class="table-input table-input-left" onchange="updateMaterial(${index}, 'description', this.value)"></td>
            <td class="td-vendor">
                <select onchange="updateMaterial(${index}, 'vendor', this.value)" class="vendor-select">
                    <option value="">Select Vendor...</option>
                    ${COMMON_VENDORS.map(v => `<option value="${v}" ${row.vendor === v ? 'selected' : ''}>${v}</option>`).join('')}
                </select>
            </td>
            <td class="td-center"><input type="number" value="${row.qty || 0}" min="0" step="0.01" class="table-input" onchange="updateMaterial(${index}, 'qty', parseFloat(this.value) || 0)"></td>
            <td class="td-center"><input type="number" value="${row.unitCost || 0}" min="0" step="0.01" class="table-input" onchange="updateMaterial(${index}, 'unitCost', parseFloat(this.value) || 0)"></td>
            <td class="td-right">${formatCurrency(total)}</td>
            <td class="td-action"><button onclick="deleteMaterialRow(${index})" class="delete-btn">×</button></td>
        `;
        tbody.appendChild(tr);
    });

    const subtotal = calculateMaterialSubtotal();
    const tax      = calculateMaterialTax();
    const taxed    = subtotal + tax;
    const final    = calculateMaterialWithMarkup();

    document.getElementById("materials-subtotal").textContent = formatCurrency(subtotal);
    document.getElementById("materials-tax").textContent      = formatCurrency(tax);
    document.getElementById("materials-taxed").textContent    = formatCurrency(taxed);
    document.getElementById("materials-with-markup").textContent = formatCurrency(final);
    document.getElementById("material-markup-input").value    = estimate.materialMarkupPercent;
}

// Labor
function renderLabor(bodyId, laborArray, updateFnName, deleteFnName, subtotalId, markupInputId, withMarkupId, markupPercent, sectionKey) {
    const tbody = document.getElementById(bodyId);
    if (!tbody) return;
    tbody.innerHTML = "";

    const mode = estimate[sectionKey + "Mode"] || "traditional";

    laborArray.forEach((row, index) => {
        let total = 0;
        if (mode === "perFoot") {
            total = (row.pricePerFoot || 0) * (estimate.footage || 0);
        } else {
            total = calculateLaborTotal(row);
        }

        const tr = document.createElement("tr");

        if (mode === "perFoot") {
            tr.innerHTML = `
                <td class="td-desc"><input type="text" value="${row.description || ''}" class="table-input table-input-left" onchange="${updateFnName}(${index}, 'description', this.value)"></td>
                <td class="td-muted">—</td>
                <td class="td-muted">—</td>
                <td class="td-center"><input type="number" value="${row.pricePerFoot || 0}" min="0" step="0.01" class="table-input" onchange="${updateFnName}(${index}, 'pricePerFoot', parseFloat(this.value) || 0)"></td>
                <td class="td-right">${formatCurrency(total)}</td>
                <td class="td-action"><button onclick="${deleteFnName}(${index})" class="delete-btn">×</button></td>
            `;
        } else {
            tr.innerHTML = `
                <td class="td-desc"><input type="text" value="${row.description || ''}" class="table-input table-input-left" onchange="${updateFnName}(${index}, 'description', this.value)"></td>
                <td class="td-center"><input type="number" value="${row.guys || 0}" min="0" class="table-input" onchange="${updateFnName}(${index}, 'guys', parseFloat(this.value) || 0)"></td>
                <td class="td-center"><input type="number" value="${row.days || 0}" min="0" class="table-input" onchange="${updateFnName}(${index}, 'days', parseFloat(this.value) || 0)"></td>
                <td class="td-center"><input type="number" value="${row.rate || 360}" min="0" class="table-input" onchange="${updateFnName}(${index}, 'rate', parseFloat(this.value) || 0)"></td>
                <td class="td-right">${formatCurrency(total)}</td>
                <td class="td-action"><button onclick="${deleteFnName}(${index})" class="delete-btn">×</button></td>
            `;
        }
        tbody.appendChild(tr);
    });

    const subtotal = laborArray.reduce((sum, row) => {
        return sum + (mode === "perFoot" ? (row.pricePerFoot || 0) * (estimate.footage || 0) : calculateLaborTotal(row));
    }, 0);

    if (subtotalId) document.getElementById(subtotalId).textContent = formatCurrency(subtotal);
    if (withMarkupId) {
        const withMarkup = subtotal * (1 + markupPercent / 100);
        document.getElementById(withMarkupId).textContent = formatCurrency(withMarkup);
    }

    updateLaborTableHeaders(sectionKey);
}

function updateLaborTableHeaders(sectionKey) {
    const mode   = estimate[sectionKey + "Mode"] || "traditional";
    const prefix = sectionKey === "paintLabor" ? "paint-labor" : sectionKey === "shopLabor" ? "shop-labor" : "field-labor";

    const col1 = document.getElementById(prefix + "-col1");
    const col2 = document.getElementById(prefix + "-col2");
    const col3 = document.getElementById(prefix + "-col3");

    if (mode === "perFoot") {
        if (col1) col1.textContent = "—";
        if (col2) col2.textContent = "—";
        if (col3) col3.textContent = "PRICE / FT";
    } else {
        if (col1) col1.textContent = "GUYS";
        if (col2) col2.textContent = "DAYS";
        if (col3) col3.textContent = "RATE/DAY";
    }
}

// Consumables
function renderConsumables() {
    const tbody = document.getElementById("consumables-body");
    tbody.innerHTML = "";
    estimate.consumables.forEach((row, index) => {
        const total = calculateLineTotal(row);
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="td-desc"><input type="text" value="${row.description || ''}" class="table-input table-input-left" onchange="updateConsumable(${index}, 'description', this.value)"></td>
            <td class="td-center">
                <div class="qty-stepper">
                    <button class="qty-btn" onclick="updateConsumable(${index}, 'qty', Math.max(0, (estimate.consumables[${index}].qty || 0) - 1))">-</button>
                    <input type="number" value="${row.qty || 0}" min="0" step="1" class="table-input" style="width:3.5rem;" onchange="updateConsumable(${index}, 'qty', parseFloat(this.value) || 0)">
                    <button class="qty-btn" onclick="updateConsumable(${index}, 'qty', (estimate.consumables[${index}].qty || 0) + 1)">+</button>
                </div>
            </td>
            <td class="td-center"><input type="number" value="${row.unitCost || 0}" min="0" step="0.01" class="table-input" onchange="updateConsumable(${index}, 'unitCost', parseFloat(this.value) || 0)"></td>
            <td class="td-right">${formatCurrency(total)}</td>
            <td class="td-action"><button onclick="deleteConsumableRow(${index})" class="delete-btn">×</button></td>
        `;
        tbody.appendChild(tr);
    });
    document.getElementById("consumables-total").textContent = formatCurrency(calculateConsumablesTotal());
}


// Paint
function renderPaintSupplies() {
    const tbody = document.getElementById("paint-supplies-body");
    tbody.innerHTML = "";
    estimate.paintSupplies.forEach((row, index) => {
        const total = calculateLineTotal(row);
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="td-desc"><input type="text" value="${row.description || ''}" class="table-input table-input-left" onchange="updatePaintSupply(${index}, 'description', this.value)"></td>
            <td class="td-center"><input type="number" value="${row.qty || 0}" min="0" step="0.01" class="table-input" onchange="updatePaintSupply(${index}, 'qty', parseFloat(this.value) || 0)"></td>
            <td class="td-center"><input type="number" value="${row.unitCost || 0}" min="0" step="0.01" class="table-input" onchange="updatePaintSupply(${index}, 'unitCost', parseFloat(this.value) || 0)"></td>
            <td class="td-right">${formatCurrency(total)}</td>
            <td class="td-action"><button onclick="deletePaintSupply(${index})" class="delete-btn">×</button></td>
        `;
        tbody.appendChild(tr);
    });
    document.getElementById("paint-supplies-total").textContent = formatCurrency(calculatePaintSuppliesTotal());
}

function renderPaintLabor() {
    const tbody = document.getElementById("paint-labor-body");
    tbody.innerHTML = "";
    estimate.paintLabor.forEach((row, index) => {
        const total = calculateLaborTotal(row);
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="td-desc"><input type="text" value="${row.description || ''}" class="table-input table-input-left" onchange="updatePaintLabor(${index}, 'description', this.value)"></td>
            <td class="td-center"><input type="number" value="${row.guys || 0}" min="0" class="table-input" onchange="updatePaintLabor(${index}, 'guys', parseFloat(this.value) || 0)"></td>
            <td class="td-center"><input type="number" value="${row.days || 0}" min="0" class="table-input" onchange="updatePaintLabor(${index}, 'days', parseFloat(this.value) || 0)"></td>
            <td class="td-center"><input type="number" value="${row.rate || 360}" min="0" class="table-input" onchange="updatePaintLabor(${index}, 'rate', parseFloat(this.value) || 0)"></td>
            <td class="td-right">${formatCurrency(total)}</td>
            <td class="td-action"><button onclick="deletePaintLaborRow(${index})" class="delete-btn">×</button></td>
        `;
        tbody.appendChild(tr);
    });
    document.getElementById("paint-labor-total").textContent = formatCurrency(calculatePaintLaborTotal());
}


// Fuel
function renderFuel() {
    const tbody = document.getElementById("fuel-body");
    tbody.innerHTML = "";
    estimate.fuel.forEach((row, index) => {
        const total = (row.tankFills || 0) * (row.costPerFill || 0);
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="td-desc"><input type="text" value="${row.description || ''}" class="table-input table-input-left" onchange="updateFuel(${index}, 'description', this.value)"></td>
            <td class="td-center">
                <div class="qty-stepper">
                    <button class="qty-btn" onclick="updateFuel(${index}, 'tankFills', Math.max(0, (estimate.fuel[${index}].tankFills || 0) - 1))">-</button>
                    <input type="number" value="${row.tankFills || 0}" min="0" step="1" class="table-input" style="width:3.5rem;" onchange="updateFuel(${index}, 'tankFills', parseFloat(this.value) || 0)">
                    <button class="qty-btn" onclick="updateFuel(${index}, 'tankFills', (estimate.fuel[${index}].tankFills || 0) + 1)">+</button>
                </div>
            </td>
            <td class="td-center"><input type="number" value="${row.costPerFill || 0}" min="0" step="0.01" class="table-input" onchange="updateFuel(${index}, 'costPerFill', parseFloat(this.value) || 0)"></td>
            <td class="td-right">${formatCurrency(total)}</td>
            <td class="td-action"><button onclick="deleteFuelRow(${index})" class="delete-btn">×</button></td>
        `;
        tbody.appendChild(tr);
    });
    document.getElementById("fuel-total").textContent = formatCurrency(calculateFuelTotal());
}


// Trip Fee
function renderTripFee() {
    const tbody = document.getElementById("trip-body");
    if (!tbody) return;
    tbody.innerHTML = "";
    estimate.tripFee.forEach((row, index) => {
        const total = (row.numberOfTrips || 0) * (row.costPerTrip || 0);
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="td-desc"><input type="text" value="${row.description || ''}" class="table-input table-input-left" onchange="updateTrip(${index}, 'description', this.value)"></td>
            <td class="td-center"><input type="number" value="${row.numberOfTrips || 0}" min="0" step="0.1" class="table-input" onchange="updateTrip(${index}, 'numberOfTrips', parseFloat(this.value) || 0)"></td>
            <td class="td-center"><input type="number" value="${row.costPerTrip || 0}" min="0" step="0.01" class="table-input" onchange="updateTrip(${index}, 'costPerTrip', parseFloat(this.value) || 0)"></td>
            <td class="td-right">${formatCurrency(total)}</td>
            <td class="td-action"><button onclick="deleteTripRow(${index})" class="delete-btn">×</button></td>
        `;
        tbody.appendChild(tr);
    });
    document.getElementById("trip-total").textContent = formatCurrency(calculateTripTotal());
}


// Rental Equipment
function renderRental() {
    const tbody = document.getElementById("rental-body");
    if (!tbody) return;
    tbody.innerHTML = "";
    estimate.rentalEquip.forEach((row, index) => {
        const total = (row.rentLength || 0) * (row.rentCost || 0);
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="td-desc"><input type="text" value="${row.description || ''}" class="table-input table-input-left" onchange="updateRental(${index}, 'description', this.value)"></td>
            <td class="td-center"><input type="number" value="${row.rentLength || 0}" min="0" step="0.1" class="table-input" onchange="updateRental(${index}, 'rentLength', parseFloat(this.value) || 0)"></td>
            <td class="td-center"><input type="number" value="${row.rentCost || 0}" min="0" step="0.01" class="table-input" onchange="updateRental(${index}, 'rentCost', parseFloat(this.value) || 0)"></td>
            <td class="td-right">${formatCurrency(total)}</td>
            <td class="td-action"><button onclick="deleteRentalRow(${index})" class="delete-btn">×</button></td>
        `;
        tbody.appendChild(tr);
    });
    document.getElementById("rental-total").textContent = formatCurrency(calculateRentalTotal());
}


// Tool Expense
function renderToolExpense() {
    const tbody = document.getElementById("tool-body");
    if (!tbody) return;
    tbody.innerHTML = "";
    estimate.toolExpense.forEach((row, index) => {
        const total = (row.quantity || 0) * (row.costPer || 0);
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="td-desc"><input type="text" value="${row.description || ''}" class="table-input table-input-left" onchange="updateTool(${index}, 'description', this.value)"></td>
            <td class="td-center"><input type="number" value="${row.quantity || 0}" min="0" step="0.1" class="table-input" onchange="updateTool(${index}, 'quantity', parseFloat(this.value) || 0)"></td>
            <td class="td-center"><input type="number" value="${row.costPer || 0}" min="0" step="0.01" class="table-input" onchange="updateTool(${index}, 'costPer', parseFloat(this.value) || 0)"></td>
            <td class="td-right">${formatCurrency(total)}</td>
            <td class="td-action"><button onclick="deleteToolRow(${index})" class="delete-btn">×</button></td>
        `;
        tbody.appendChild(tr);
    });
    document.getElementById("tool-total").textContent = formatCurrency(calculateToolTotal());
}