// ==================== RENDER FUNCTIONS ====================
function renderMaterials() { /* (your existing renderMaterials - unchanged) */ 
    const tbody = document.getElementById("materials-body");
    tbody.innerHTML = "";
    estimate.materials.forEach((row, index) => {
        const total = calculateLineTotal(row);
        const tr = document.createElement("tr");
        tr.className = "group hover:bg-emerald-50 transition-colors";
        tr.innerHTML = `
            <td class="pl-8 py-4"><input type="text" value="${row.description || ''}" class="table-input text-left" onchange="updateMaterial(${index}, 'description', this.value)"></td>
            <td class="pl-4 py-4">
                <select onchange="updateMaterial(${index}, 'vendor', this.value)" class="table-input text-left w-full bg-white border border-gray-300 rounded-xl px-3 py-3">
                    <option value="">Select Vendor...</option>
                    ${COMMON_VENDORS.map(v => `<option value="${v}" ${row.vendor === v ? 'selected' : ''}>${v}</option>`).join('')}
                </select>
            </td>
            <td class="text-center py-4"><input type="number" value="${row.qty || 0}" min="0" step="0.01" class="table-input w-20" onchange="updateMaterial(${index}, 'qty', parseFloat(this.value) || 0)"></td>
            <td class="text-center py-4"><input type="number" value="${row.unitCost || 0}" min="0" step="0.01" class="table-input w-28" onchange="updateMaterial(${index}, 'unitCost', parseFloat(this.value) || 0)"></td>
            <td class="text-right pr-8 py-4 font-semibold">${formatCurrency(total)}</td>
            <td class="pr-4"><button onclick="deleteMaterialRow(${index})" class="delete-btn opacity-0 group-hover:opacity-100 text-xl">×</button></td>
        `;
        tbody.appendChild(tr);
    });

    const subtotal = calculateMaterialSubtotal();
    const tax = calculateMaterialTax();
    const taxed = subtotal + tax;
    const final = calculateMaterialWithMarkup();

    document.getElementById("materials-subtotal").textContent = formatCurrency(subtotal);
    document.getElementById("materials-tax").textContent = formatCurrency(tax);
    document.getElementById("materials-taxed").textContent = formatCurrency(taxed);
    document.getElementById("materials-with-markup").textContent = formatCurrency(final);
    document.getElementById("material-markup-input").value = estimate.materialMarkupPercent;
}

function renderConsumables() { /* your existing */ 
    const tbody = document.getElementById("consumables-body");
    tbody.innerHTML = "";
    estimate.consumables.forEach((row, index) => {
        const total = calculateLineTotal(row);
        const tr = document.createElement("tr");
        tr.className = "group hover:bg-emerald-50 transition-colors";
        tr.innerHTML = `
            <td class="pl-8 py-4"><input type="text" value="${row.description || ''}" class="table-input text-left" onchange="updateConsumable(${index}, 'description', this.value)"></td>
            <td class="text-center py-4"><input type="number" value="${row.qty || 0}" min="0" step="0.01" class="table-input w-20" onchange="updateConsumable(${index}, 'qty', parseFloat(this.value) || 0)"></td>
            <td class="text-center py-4"><input type="number" value="${row.unitCost || 0}" min="0" step="0.01" class="table-input w-28" onchange="updateConsumable(${index}, 'unitCost', parseFloat(this.value) || 0)"></td>
            <td class="text-right pr-8 py-4 font-semibold">${formatCurrency(total)}</td>
            <td class="pr-4"><button onclick="deleteConsumableRow(${index})" class="delete-btn opacity-0 group-hover:opacity-100 text-xl">×</button></td>
        `;
        tbody.appendChild(tr);
    });
    document.getElementById("consumables-total").textContent = formatCurrency(calculateConsumablesTotal());
}

function renderPaintSupplies() { /* your existing */ 
    const tbody = document.getElementById("paint-supplies-body");
    tbody.innerHTML = "";
    estimate.paintSupplies.forEach((row, index) => {
        const total = calculateLineTotal(row);
        const tr = document.createElement("tr");
        tr.className = "group hover:bg-emerald-50 transition-colors";
        tr.innerHTML = `
            <td class="pl-8 py-4"><input type="text" value="${row.description || ''}" class="table-input text-left" onchange="updatePaintSupply(${index}, 'description', this.value)"></td>
            <td class="text-center py-4"><input type="number" value="${row.qty || 0}" min="0" step="0.01" class="table-input w-20" onchange="updatePaintSupply(${index}, 'qty', parseFloat(this.value) || 0)"></td>
            <td class="text-center py-4"><input type="number" value="${row.unitCost || 0}" min="0" step="0.01" class="table-input w-28" onchange="updatePaintSupply(${index}, 'unitCost', parseFloat(this.value) || 0)"></td>
            <td class="text-right pr-8 py-4 font-semibold">${formatCurrency(total)}</td>
            <td class="pr-4"><button onclick="deletePaintSupply(${index})" class="delete-btn opacity-0 group-hover:opacity-100 text-xl">×</button></td>
        `;
        tbody.appendChild(tr);
    });
    document.getElementById("paint-supplies-total").textContent = formatCurrency(calculatePaintSuppliesTotal());
}

function renderPaintLabor() { /* your existing */ 
    const tbody = document.getElementById("paint-labor-body");
    tbody.innerHTML = "";
    estimate.paintLabor.forEach((row, index) => {
        const total = calculateLaborTotal(row);
        const tr = document.createElement("tr");
        tr.className = "group hover:bg-emerald-50 transition-colors";
        tr.innerHTML = `
            <td class="pl-8 py-4"><input type="text" value="${row.description || ''}" class="table-input text-left" onchange="updatePaintLabor(${index}, 'description', this.value)"></td>
            <td class="text-center py-4"><input type="number" value="${row.guys || 0}" min="0" class="table-input w-16" onchange="updatePaintLabor(${index}, 'guys', parseFloat(this.value) || 0)"></td>
            <td class="text-center py-4"><input type="number" value="${row.days || 0}" min="0" class="table-input w-16" onchange="updatePaintLabor(${index}, 'days', parseFloat(this.value) || 0)"></td>
            <td class="text-center py-4"><input type="number" value="${row.rate || 360}" min="0" class="table-input w-28" onchange="updatePaintLabor(${index}, 'rate', parseFloat(this.value) || 0)"></td>
            <td class="text-right pr-8 py-4 font-semibold">${formatCurrency(total)}</td>
            <td class="pr-4"><button onclick="deletePaintLaborRow(${index})" class="delete-btn opacity-0 group-hover:opacity-100 text-xl">×</button></td>
        `;
        tbody.appendChild(tr);
    });
    document.getElementById("paint-labor-total").textContent = formatCurrency(calculatePaintLaborTotal());
}

function renderFuel() {
    const tbody = document.getElementById("fuel-body");
    tbody.innerHTML = "";
    estimate.fuel.forEach((row, index) => {
        const total = (row.tankFills || 0) * (row.costPerFill || 0);
        const tr = document.createElement("tr");
        tr.className = "group hover:bg-emerald-50 transition-colors";
        tr.innerHTML = `
            <td class="pl-8 py-4"><input type="text" value="${row.description || ''}" class="table-input text-left" onchange="updateFuel(${index}, 'description', this.value)"></td>
            <td class="text-center py-4"><input type="number" value="${row.tankFills || 0}" min="0" step="0.1" class="table-input w-28" onchange="updateFuel(${index}, 'tankFills', parseFloat(this.value) || 0)"></td>
            <td class="text-center py-4"><input type="number" value="${row.costPerFill || 0}" min="0" step="0.01" class="table-input w-32" onchange="updateFuel(${index}, 'costPerFill', parseFloat(this.value) || 0)"></td>
            <td class="text-right pr-8 py-4 font-semibold">${formatCurrency(total)}</td>
            <td class="pr-4"><button onclick="deleteFuelRow(${index})" class="delete-btn opacity-0 group-hover:opacity-100 text-xl">×</button></td>
        `;
        tbody.appendChild(tr);
    });
    document.getElementById("fuel-total").textContent = formatCurrency(calculateFuelTotal());
}

function renderTripFee() {
    const tbody = document.getElementById("trip-body");
    if (!tbody) return;

    tbody.innerHTML = "";
    estimate.tripFee.forEach((row, index) => {
        const total = (row.numberOfTrips || 0) * (row.costPerTrip || 0);

        const tr = document.createElement("tr");
        tr.className = "group hover:bg-emerald-50 transition-colors";
        tr.innerHTML = `
            <td class="pl-8 py-4">
                <input type="text" value="${row.description || ''}" 
                       class="table-input text-left" 
                       onchange="updateTrip(${index}, 'description', this.value)">
            </td>
            <td class="text-center py-4">
                <input type="number" value="${row.numberOfTrips || 0}" min="0" step="0.1" 
                       class="table-input w-28" 
                       onchange="updateTrip(${index}, 'numberOfTrips', parseFloat(this.value) || 0)">
            </td>
            <td class="text-center py-4">
                <input type="number" value="${row.costPerTrip || 0}" min="0" step="0.01" 
                       class="table-input w-32" 
                       onchange="updateTrip(${index}, 'costPerTrip', parseFloat(this.value) || 0)">
            </td>
            <td class="text-right pr-8 py-4 font-semibold">${formatCurrency(total)}</td>
            <td class="pr-4">
                <button onclick="deleteTripRow(${index})" 
                        class="delete-btn opacity-0 group-hover:opacity-100 text-xl">×</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById("trip-total").textContent = formatCurrency(calculateTripTotal());
}

function renderRental() {
    const tbody = document.getElementById("rental-body");
    if (!tbody) return;

    tbody.innerHTML = "";
    estimate.rentalEquip.forEach((row, index) => {
        const total = (row.rentLength || 0) * (row.rentCost || 0);

        const tr = document.createElement("tr");
        tr.className = "group hover:bg-emerald-50 transition-colors";
        tr.innerHTML = `
            <td class="pl-8 py-4">
                <input type="text" value="${row.description || ''}" 
                       class="table-input text-left" 
                       onchange="updateRental(${index}, 'description', this.value)">
            </td>
            <td class="text-center py-4">
                <input type="number" value="${row.rentLength || 0}" min="0" step="0.1" 
                       class="table-input w-28" 
                       onchange="updateRental(${index}, 'rentLength', parseFloat(this.value) || 0)">
            </td>
            <td class="text-center py-4">
                <input type="number" value="${row.rentCost || 0}" min="0" step="0.01" 
                       class="table-input w-32" 
                       onchange="updateRental(${index}, 'rentCost', parseFloat(this.value) || 0)">
            </td>
            <td class="text-right pr-8 py-4 font-semibold">${formatCurrency(total)}</td>
            <td class="pr-4">
                <button onclick="deleteRentalRow(${index})" 
                        class="delete-btn opacity-0 group-hover:opacity-100 text-xl">×</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Update total
    document.getElementById("rental-total").textContent = formatCurrency(calculateRentalTotal());
}

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
        tr.className = "group hover:bg-emerald-50 transition-colors";

        if (mode === "perFoot") {
            tr.innerHTML = `
                <td class="pl-8 py-4"><input type="text" value="${row.description || ''}" class="table-input text-left" onchange="${updateFnName}(${index}, 'description', this.value)"></td>
                <td class="text-center py-4 text-gray-400">—</td>
                <td class="text-center py-4 text-gray-400">—</td>
                <td class="text-center py-4">
                    <input type="number" value="${row.pricePerFoot || 0}" min="0" step="0.01" class="table-input w-28" onchange="${updateFnName}(${index}, 'pricePerFoot', parseFloat(this.value) || 0)">
                </td>
                <td class="text-right pr-8 py-4 font-semibold">${formatCurrency(total)}</td>
                <td class="pr-4"><button onclick="${deleteFnName}(${index})" class="delete-btn opacity-0 group-hover:opacity-100 text-xl">×</button></td>
            `;
        } else {
            tr.innerHTML = `
                <td class="pl-8 py-4"><input type="text" value="${row.description || ''}" class="table-input text-left" onchange="${updateFnName}(${index}, 'description', this.value)"></td>
                <td class="text-center py-4"><input type="number" value="${row.guys || 0}" min="0" class="table-input w-16" onchange="${updateFnName}(${index}, 'guys', parseFloat(this.value) || 0)"></td>
                <td class="text-center py-4"><input type="number" value="${row.days || 0}" min="0" class="table-input w-16" onchange="${updateFnName}(${index}, 'days', parseFloat(this.value) || 0)"></td>
                <td class="text-center py-4"><input type="number" value="${row.rate || 360}" min="0" class="table-input w-28" onchange="${updateFnName}(${index}, 'rate', parseFloat(this.value) || 0)"></td>
                <td class="text-right pr-8 py-4 font-semibold">${formatCurrency(total)}</td>
                <td class="pr-4"><button onclick="${deleteFnName}(${index})" class="delete-btn opacity-0 group-hover:opacity-100 text-xl">×</button></td>
            `;
        }
        tbody.appendChild(tr);
    });

    // Update subtotal and markup total
    const subtotal = laborArray.reduce((sum, row) => {
        return sum + (mode === "perFoot" ? (row.pricePerFoot || 0) * (estimate.footage || 0) : calculateLaborTotal(row));
    }, 0);

    if (subtotalId) document.getElementById(subtotalId).textContent = formatCurrency(subtotal);
    if (withMarkupId) {
        const withMarkup = subtotal * (1 + markupPercent / 100);
        document.getElementById(withMarkupId).textContent = formatCurrency(withMarkup);
    }

    // Update column headers
    updateLaborTableHeaders(sectionKey);
}

function updateLaborTableHeaders(sectionKey) {
    const mode = estimate[sectionKey + "Mode"] || "traditional";
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

function renderOtherCosts() {
    const container = document.getElementById("other-costs");
    const labels = { toolExpense: "Tool Expense"};

    container.innerHTML = Object.keys(estimate.otherCosts).map(key => {
        const value = estimate.otherCosts[key] || 0;
        return `
            <div class="bg-white rounded-2xl p-5 shadow">
                <div class="text-sm font-medium text-gray-500">${labels[key] || key}</div>
                <input type="number" value="${value}" class="w-full text-4xl font-semibold text-center mt-3 focus:outline-none"
                       onchange="updateOtherCost('${key}', parseFloat(this.value) || 0)">
                <div class="text-right text-xs text-emerald-600 mt-1">${formatCurrency(value)}</div>
            </div>
        `;
    }).join("");
}