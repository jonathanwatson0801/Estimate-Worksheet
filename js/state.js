// js/state.js

let estimate = {
    jobAddress: "",
    jobDescription: "",
    footage: 0,
    materials: [],
    consumables: [],
    shopLabor: [],
    fieldLabor: [],
    paintSupplies: [],
    paintLabor: [],
    fuel: [],
    rentalEquip: [],
    otherCosts: {
        toolExpense: 0,
        tripFees: 0
    },
    materialMarkupPercent: 15,
    materialTaxRate: 8.25,
    shopLaborMarkupPercent: 15,
    fieldLaborMarkupPercent: 15,
    markupPercent: 30,

    // Labor Mode Toggles
    shopLaborMode: "traditional",      // "traditional" or "perFoot"
    fieldLaborMode: "traditional",
    paintLaborMode: "traditional"
};

const COMMON_VENDORS = ["Amazon", "American Fence", "Builders First", "GT Lumber", "Home Depot", "Legacy Sypply", "Lowe's", "Metals4U", 
    "McCoys", "Shope Made", "Timber Town", "Triple S Steel", "TS Distributors"];