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

    // Render everything
    renderMaterials();
    renderConsumables();
    renderPaintSupplies();
    renderPaintLabor();
    renderFuel();
    renderRental();

    renderLabor("shop-body", estimate.shopLabor, "updateShopLabor", "deleteShopLaborRow", "shop-subtotal", "shop-markup-input", "shop-with-markup", estimate.shopLaborMarkupPercent, "shopLabor");
    renderLabor("field-body", estimate.fieldLabor, "updateFieldLabor", "deleteFieldLaborRow", "field-subtotal", "field-markup-input", "field-with-markup", estimate.fieldLaborMarkupPercent, "fieldLabor");
    renderLabor("paint-labor-body", estimate.paintLabor, "updatePaintLabor", "deletePaintLaborRow", null, null, "paint-labor-total", 0, "paintLabor");

    renderOtherCosts();

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

window.saveEstimate = function() {
    const dataStr = JSON.stringify(estimate, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `Estimate_${new Date().toISOString().slice(0,10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

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
                
                // Refresh all UI
                calculateAll();
                
                alert("✅ Estimate loaded successfully!");
            } catch (err) {
                alert("❌ Error loading file. Please select a valid .json estimate file.");
            }
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
            body { 
                background: white !important; 
                color: black !important; 
                font-size: 11pt !important;
                line-height: 1.3 !important;
            }
            
            /* Hide everything we don't need */
            .no-print, button, input[type="range"], #markup-scenarios-table, 
            .flex.items-center.gap-x-3 { display: none !important; }
            
            /* Make main container tighter */
            .max-w-7xl { max-width: 100% !important; margin: 0 !important; padding: 10px !important; }
            
            /* Condense cards */
            .shadow, .rounded-3xl { 
                box-shadow: none !important; 
                border: 1px solid #ddd !important; 
                margin-bottom: 12px !important; 
                padding: 12px !important;
            }
            
            h1 { font-size: 18pt !important; margin-bottom: 8px !important; }
            h2 { font-size: 14pt !important; margin: 12px 0 6px !important; }
            h3 { font-size: 12pt !important; margin: 10px 0 4px !important; }
            
            /* Tighten tables */
            table { 
                font-size: 10pt !important; 
                margin-bottom: 8px !important;
            }
            th, td { 
                padding: 6px 4px !important; 
                font-size: 10pt !important;
            }
            
            /* Condense input fields */
            input, textarea { 
                border: 1px solid #999 !important; 
                padding: 4px 6px !important; 
                font-size: 10pt !important;
            }
            
            /* Make grand total prominent but compact */
            .bg-gradient-to-br { 
                background: #f8f9fa !important; 
                color: black !important; 
                border: 2px solid #10b981 !important; 
                padding: 15px !important; 
                margin-top: 15px !important;
            }
            
            #selling-price { font-size: 22pt !important; }
            #grand-total-cost { font-size: 20pt !important; }
            
            /* Remove unnecessary spacing */
            .mb-12, .mb-10, .mb-8, .mb-4 { margin-bottom: 10px !important; }
            .p-8, .p-10 { padding: 12px !important; }
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

    // Force full re-render
    renderMaterials();
    renderConsumables();
    renderPaintSupplies();
    renderPaintLabor();
    renderFuel();
    renderRental();
    renderLabor("shop-body", estimate.shopLabor, "updateShopLabor", "deleteShopLaborRow", "shop-subtotal", "shop-markup-input", "shop-with-markup", estimate.shopLaborMarkupPercent, "shopLabor");
    renderLabor("field-body", estimate.fieldLabor, "updateFieldLabor", "deleteFieldLaborRow", "field-subtotal", "field-markup-input", "field-with-markup", estimate.fieldLaborMarkupPercent, "fieldLabor");
    renderLabor("paint-labor-body", estimate.paintLabor, "updatePaintLabor", "deletePaintLaborRow", null, null, "paint-labor-total", 0, "paintLabor");
    renderOtherCosts();
    calculateAll();

    console.log("%c✅ Estimate has been completely reset", "color:#ef4444; font-weight:bold");
};