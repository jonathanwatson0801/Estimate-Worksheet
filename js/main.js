// js/main.js

// ==================== MAIN ENGINE ====================
function calculateAll() {
    // Save form values
    estimate.customerName = document.getElementById("customer-name")?.value || "";
    estimate.customerCompany = document.getElementById("customer-company")?.value || "";
    estimate.customerPhone = document.getElementById("customer-phone")?.value || "";
    estimate.customerEmail = document.getElementById("customer-email")?.value || "";
    estimate.jobAddress = document.getElementById("job-address")?.value || "";
    estimate.jobDescription = document.getElementById("job-description")?.value || "";
    estimate.footage = parseFloat(document.getElementById("footage")?.value) || 0;

    // Auto Generate Date for Date Created
    document.getElementById('date-created').value = new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});

    // Render everything — each wrapped so one failure doesn't block the grand total
    const renders = [
        () => renderMaterials(),
        () => renderConsumables(),
        () => renderPaintSupplies(),
        () => renderPaintLabor(),
        () => renderFuel(),
        () => renderRental(),
        () => renderToolExpense(),
        () => renderTripFee(),
        () => renderLabor("shop-body", estimate.shopLabor, "updateShopLabor", "deleteShopLaborRow", "shop-subtotal", "shop-markup-input", "shop-with-markup", estimate.shopLaborMarkupPercent, "shopLabor"),
        () => renderLabor("field-body", estimate.fieldLabor, "updateFieldLabor", "deleteFieldLaborRow", "field-subtotal", "field-markup-input", "field-with-markup", estimate.fieldLaborMarkupPercent, "fieldLabor"),
        () => renderLabor("paint-labor-body", estimate.paintLabor, "updatePaintLabor", "deletePaintLaborRow", null, null, "paint-labor-total", 0, "paintLabor"),
    ];
    renders.forEach(fn => { try { fn(); } catch(e) { console.error("Render error:", e); } });

    const grandCost = calculateGrandCost();
    document.getElementById("grand-total-cost").textContent = formatCurrency(grandCost);

    const markupFactor = 1 + estimate.markupPercent / 100;
    const sellingPrice = grandCost * markupFactor;
    document.getElementById("selling-price").textContent = formatCurrency(sellingPrice);

    const perFoot = estimate.footage > 0 ? sellingPrice / estimate.footage : 0;
    document.getElementById("per-foot-price").innerHTML = `<span class="text-2xl">${perFoot.toFixed(2)}</span> / ft`;

    renderMarkupScenarios();
}

// ==================== SAVE / LOAD / PRINT ====================

// Save Estimate [File Browser]
window.saveEstimate = async function() {
    const dataStr = JSON.stringify(estimate, null, 2);
    const exportFileDefaultName = 'Estimate_${new Date().toISOString().slice(0,10)}.json';


    if (window.showSaveFilePicker) {
        const fileHandle = await window.showSaveFilePicker({
            suggestedName: exportFileDefaultName,
            types: [{
                description: 'JSON File',
                accept: { 'application/json': ['.json']},
            }],
        });

    const writable = await fileHandle.createWritable();
    await writable.write(dataStr);
    await writable.close();
    } else {
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }
    console.log("%c✅ Estimate saved as JSON", "color:#10b981");
};

// Load Estimate
window.loadEstimate = function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const loadedData = JSON.parse(event.target.result);
                Object.assign(estimate, loadedData);

                // Restore form fields so calculateAll() doesn't overwrite them with empty DOM values
                const fields = {
                    "customer-name": "customerName",
                    "customer-company": "customerCompany",
                    "customer-phone": "customerPhone",
                    "customer-email": "customerEmail",
                    "job-address": "jobAddress",
                    "job-description": "jobDescription",
                    "footage": "footage",
                };
                for (const [id, key] of Object.entries(fields)) {
                    const el = document.getElementById(id);
                    if (el) el.value = estimate[key] ?? "";
                }

                // Restore markup slider and input so they stay in sync with loaded value
                const markupSlider = document.getElementById("markup-slider");
                const markupInput = document.getElementById("markup-input");
                if (markupSlider) markupSlider.value = estimate.markupPercent ?? 30;
                if (markupInput) markupInput.value = estimate.markupPercent ?? 30;

                // Refresh all UI
                calculateAll();
                
                alert("✅ Estimate loaded successfully!");
            } catch (err) {
                alert("❌ Error loading file. Please select a valid .json estimate file.");
            }
            // Re-format phone after loading
const phoneInput = document.getElementById("customer-phone");
if (phoneInput) formatPhoneNumber(phoneInput);
        };
        reader.readAsText(file);
    };
    
    input.click();
};

// Improved Condensed Print / PDF
window.printEstimate = function() {
    const originalTitle = document.title;
    document.title = `Estimate - ${estimate.customerName || 'Modern Fence and Steel'} - ${new Date().toLocaleDateString()}`;

    const style = document.createElement('style');
    style.innerHTML = `
        @media print {
            @page { margin: 0.45in; }

            body { background: white !important; color: black !important; font-size: 9pt !important; line-height: 1.2 !important; }

            /* Hide non-print UI */
            .no-print, button, input[type="range"], #markup-scenarios-table, #markup-scenarios-section { display: none !important; }
            /* Hide labor mode toggles (Per Foot / Guys×Days switch) */
            label.cursor-pointer, label.cursor-pointer + span, label.cursor-pointer ~ span { display: none !important; }

            /* Container */
            .max-w-7xl { max-width: 100% !important; margin: 0 !important; padding: 6px !important; }

            /* Section spacing */
            .mb-12, .mb-10 { margin-bottom: 6px !important; }
            .mb-8, .mb-6   { margin-bottom: 4px !important; }
            .mb-4, .mb-3   { margin-bottom: 2px !important; }
            .mt-8          { margin-top: 6px !important; }
            .pb-6          { padding-bottom: 2px !important; }
            .py-8          { padding-top: 3px !important; padding-bottom: 3px !important; }
            .py-6          { padding-top: 3px !important; padding-bottom: 3px !important; }
            .py-5          { padding-top: 2px !important; padding-bottom: 2px !important; }
            .py-4          { padding-top: 2px !important; padding-bottom: 2px !important; }
            .p-8, .p-10    { padding: 4px 8px !important; }
            .px-8          { padding-left: 8px !important; padding-right: 8px !important; }
            .pl-8          { padding-left: 6px !important; }
            .pr-8          { padding-right: 6px !important; }
            .pl-4          { padding-left: 4px !important; }
            .py-2\\.5      { padding-top: 1px !important; padding-bottom: 1px !important; }

            /* Grid gaps */
            .gap-10 { gap: 6px !important; }
            .gap-8  { gap: 6px !important; }
            .gap-6  { gap: 4px !important; }
            .gap-4  { gap: 3px !important; }

            /* Cards */
            .shadow         { box-shadow: none !important; }
            .rounded-3xl    { border-radius: 4px !important; border: 1px solid #e5e7eb !important; }

            /* Headings */
            h1 { font-size: 14pt !important; margin-bottom: 2px !important; }
            h2 { font-size: 10pt !important; margin: 4px 0 2px !important; }

            /* Text sizes */
            .text-6xl, .text-5xl, .text-4xl { font-size: 12px !important; }
            .text-3xl { font-size: 11px !important; }
            .text-2xl { font-size: 10px !important; }
            .text-xl, .text-lg { font-size: 9px !important; }
            .text-sm, .text-xs { font-size: 8px !important; }

            /* Tables */
            table { font-size: 9pt !important; width: 100% !important; table-layout: auto !important; }
            th, td { padding: 2px 4px !important; font-size: 9pt !important; }

            /* Table inputs: render as plain readable text, no borders */
            .table-input {
                border: none !important;
                background: transparent !important;
                padding: 0 2px !important;
                font-size: 9pt !important;
                width: 100% !important;
                overflow: visible !important;
            }

            /* Job info form inputs: underline only */
            input:not(.table-input), textarea {
                border: none !important;
                border-bottom: 1px solid #bbb !important;
                background: transparent !important;
                padding: 1px 2px !important;
                font-size: 9pt !important;
                width: 100% !important;
            }

            /* Grand total section */
            .bg-gradient-to-br {
                background: #f0fdf4 !important;
                border: 2px solid #10b981 !important;
                padding: 8px 12px !important;
                margin-top: 8px !important;
            }
            .bg-gradient-to-br, .bg-gradient-to-br * { color: black !important; }
            /* Collapse grid gap and hide markup slider column */
            .bg-gradient-to-br .grid { gap: 8px !important; }
            #grand-total-cost { font-size: 16pt !important; }
            #selling-price    { font-size: 18pt !important; color: #059669 !important; }
            #per-foot-price   { font-size: 9pt !important; }
            /* Hide the markup slider row entirely — just show the % value inline */
            .bg-gradient-to-br .flex.items-center { display: none !important; }

            /* Markup % — show input value, hide slider */
            #markup-input { display: inline-block !important; border: none !important; background: transparent !important; width: auto !important; }
        }
    `;
    document.head.appendChild(style);

    window.print();

    // Cleanup
    setTimeout(() => {
        document.head.removeChild(style);
        document.title = originalTitle;
    }, 1500);
}; 

// Phone number formatter - (XXX) XXX-XXXX
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, ''); // Remove all non-digits
    
    if (value.length > 10) {
        value = value.substring(0, 10); // Limit to 10 digits
    }

    if (value.length > 6) {
        value = `(${value.substring(0,3)}) ${value.substring(3,6)}-${value.substring(6)}`;
    } else if (value.length > 3) {
        value = `(${value.substring(0,3)}) ${value.substring(3)}`;
    } else if (value.length > 0) {
        value = `(${value}`;
    }

    input.value = value;
}

// ==================== Reset Estimate ====================
window.resetEstimate = function() {
    if (!confirm("Are you sure you want to reset the entire estimate?\n\nAll data will be lost.")) {
        return;
    }

    // Clear all data
    estimate.materials = [];
    estimate.consumables = [];
    estimate.paintSupplies = [];
    estimate.paintLabor = [];
    estimate.fuel = [];
    estimate.shopLabor = [];
    estimate.fieldLabor = [];
    estimate.rentalEquip = [];
    estimate.toolExpense = [];
    estimate.tripFee = [];

    estimate.jobAddress = "";
    estimate.jobDescription = "";
    estimate.footage = 0;

    // Customer fields
    estimate.customerName = "";
    estimate.customerCompany = "";
    estimate.customerPhone = "";
    estimate.customerEmail = "";

    // Reset markups
    estimate.materialMarkupPercent = 15;
    estimate.shopLaborMarkupPercent = 15;
    estimate.fieldLaborMarkupPercent = 15;
    estimate.markupPercent = 30;

    // Clear all form inputs
    document.querySelectorAll('input, textarea').forEach(input => {
        if (input.type === "number") {
            input.value = (input.id === "footage") ? "0" : "";
        } else if (input.type === "checkbox") {
            input.checked = false;
        } else {
            input.value = "";
        }
    });

    document.getElementById("material-markup-input").value = estimate.materialMarkupPercent;
    document.getElementById("shop-markup-input").value = estimate.shopLaborMarkupPercent;
    document.getElementById("field-markup-input").value = estimate.fieldLaborMarkupPercent;
    document.getElementById("markup-input").value = estimate.markupPercent;
    document.getElementById("markup-slider").value = estimate.markupPercent;


    // Force full re-render
    renderMaterials();
    renderConsumables();
    renderPaintSupplies();
    renderPaintLabor();
    renderFuel();
    renderRental();
    renderToolExpense();
    renderLabor("shop-body", estimate.shopLabor, "updateShopLabor", "deleteShopLaborRow", "shop-subtotal", "shop-markup-input", "shop-with-markup", estimate.shopLaborMarkupPercent, "shopLabor");
    renderLabor("field-body", estimate.fieldLabor, "updateFieldLabor", "deleteFieldLaborRow", "field-subtotal", "field-markup-input", "field-with-markup", estimate.fieldLaborMarkupPercent, "fieldLabor");
    renderLabor("paint-labor-body", estimate.paintLabor, "updatePaintLabor", "deletePaintLaborRow", null, null, "paint-labor-total", 0, "paintLabor");
    calculateAll();

    console.log("%c✅ Estimate has been completely reset", "color:#ef4444; font-weight:bold");
};