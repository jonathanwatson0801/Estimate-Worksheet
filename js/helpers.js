// helpers.js
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount || 0);
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function calculateLineTotal(item) {
    return (item.qty || 0) * (item.unitCost || 0);
}

function calculateLaborTotal(laborRow) {
    return (laborRow.guys || 0) * (laborRow.days || 0) * (laborRow.rate || 360);
}