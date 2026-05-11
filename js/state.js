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
    toolExpense: [],
    tripFee: [],
    
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

const COMMON_VENDORS = ["Amazon", "American Fence", "Builders First", "GT Lumber", "Home Depot", "Legacy Supply", "Lowe's", "Metals4U", 
    "McCoys", "Montopolis", "Shope Made", "Southwest Automated Solutions", "Timber Town", "Triple S Steel", "TS Distributors"];