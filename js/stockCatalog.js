// Stock Materials

const STOCK_CATALOG = [

    // Angle Iron
    {material: "Angle Iron", dimensions: "1-1/2x1-1/2x1/8 @ 20'", unit: "Each", unitPrice: 62.90},
    {material: "Angle Iron", dimensions: "2x1-1/2x1/8 @ 20'", unit: "Each", unitPrice: 72.90},
    {material: "Angle Iron", dimensions: "2x2x1/4 @ 20'", unit: "Each", unitPrice: 45.24},
    {material: "Angle Iron", dimensions: "2x2x1/8 @ 20'", unit: "Each", unitPrice: 23.40},
    {material: "Angle Iron", dimensions: "3x2x3/16 @ 20'", unit: "Each", unitPrice: 70.90},





    // Rectangle Tubing
        // 2x1
    {material: "Rectangle Tube", dimensions: "2x1x11ga @ 20'", unit: "Each", unitPrice: 49.00},
    {material: "Rectangle Tube", dimensions: "2x1x11ga @ 24'", unit: "Each", unitPrice: 58.80},
    {material: "Rectangle Tube", dimensions: "2x1x14ga @ 20'", unit: "Each", unitPrice: 35.00},
    {material: "Rectangle Tube", dimensions: "2x1x14ga @ 24'", unit: "Each", unitPrice: 42.00},
        // 3x1
    {material: "Rectangle Tube", dimensions: "3x1x11ga @ 20'", unit: "Each", unitPrice: 65.00},
    {material: "Rectangle Tube", dimensions: "3x1x11ga @ 24'", unit: "Each", unitPrice: 78.00},
    {material: "Rectangle Tube", dimensions: "3x1x14ga @ 20'", unit: "Each", unitPrice: 35.00},
    {material: "Rectangle Tube", dimensions: "3x1x14ga @ 24'", unit: "Each", unitPrice: 42.00},

    // Square Tubing
        // 1/2x1/2 
    {material: "Square Tube", dimensions: "1/2x1/2x16ga @ 20'", unit: "Each", unitPrice: 9.80},
    {material: "Square Tube", dimensions: "1/2x1/2x16ga @ 24'", unit: "Each", unitPrice: 11.76},
        // 5/8x5/8
    {material: "Square Tube", dimensions: "5/8x5/8x16ga @ 20'", unit: "Each", unitPrice: 11.71},
    {material: "Square Tube", dimensions: "5/8x5/8x16ga @ 20'", unit: "Each", unitPrice: 14.06},
        // 3/4x3/4
    {material: "Square Tube", dimensions: "3/4x3/4x16ga @ 20'", unit: "Each", unitPrice: 12.60},
    {material: "Square Tube", dimensions: "3/4x3/4x16ga @ 24'", unit: "Each", unitPrice: 15.12},
        // 1-1/4x1-1/4
    {material: "Square Tube", dimensions: "1-1/4x1-1/4x11ga @ 20'", unit: "Each", unitPrice: 27.00},
    {material: "Square Tube", dimensions: "1-1/4x1-1/4x11ga @ 24'", unit: "Each", unitPrice: 32.40},
        // 1-1/2x1-1/2
    {material: "Square Tube", dimensions: "1-1/2x1-1/2x11ga @ 20'", unit: "Each", unitPrice: 38.00},
    {material: "Square Tube", dimensions: "1-1/2x1-1/2x11ga @ 24'", unit: "Each", unitPrice: 45.60},
    {material: "Square Tube", dimensions: "1-1/2x1-1/2x14ga @ 20'", unit: "Each", unitPrice: 29.22},
    {material: "Square Tube", dimensions: "1-1/2x1-1/2x14ga @ 24'", unit: "Each", unitPrice: 35.07},
        // 1x1
    {material: "Square Tube", dimensions: "1x1x14ga @ 20'", unit: "Each", unitPrice: 19.00},
    {material: "Square Tube", dimensions: "1x1x14ga @ 24'", unit: "Each", unitPrice: 22.80},
    {material: "Square Tube", dimensions: "1x1x16ga @ 20'", unit: "Each", unitPrice: 16.25},
    {material: "Square Tube", dimensions: "1x1x16ga @ 24'", unit: "Each", unitPrice: 19.50},
        // 2x2
    {material: "Square Tube", dimensions: "2x2x3/16 @ 20'", unit: "Each", unitPrice: 66.00},
    {material: "Square Tube", dimensions: "2x2x3/16 @ 20'", unit: "Each", unitPrice: 79.20},
    {material: "Square Tube", dimensions: "2x2x11ga @ 20'", unit: "Each", unitPrice: 64.00},
    {material: "Square Tube", dimensions: "2x2x11ga @ 24'", unit: "Each", unitPrice: 76.80},
    {material: "Square Tube", dimensions: "2x2x14ga @ 20'", unit: "Each", unitPrice: 47.00},
    {material: "Square Tube", dimensions: "2x2x14ga @ 24'", unit: "Each", unitPrice: 56.40},
        // 3x3
    {material: "Square Tube", dimensions: "3x3x1/4 @ 20'", unit: "Each", unitPrice: 149.00},
    {material: "Square Tube", dimensions: "3x3x1/4 @ 24'", unit: "Each", unitPrice: 178.80},
    {material: "Square Tube", dimensions: "3x3x3/16 @ 20'", unit: "Each", unitPrice: 127.50},
    {material: "Square Tube", dimensions: "3x3x3/16 @ 24'", unit: "Each", unitPrice: 153.00},
    {material: "Square Tube", dimensions: "3x3x11ga @ 20'", unit: "Each", unitPrice: 73.67},
    {material: "Square Tube", dimensions: "3x3x11ga @ 24'", unit: "Each", unitPrice: 88.40},
    {material: "Square Tube", dimensions: "3x3x14ga @ 20'", unit: "Each", unitPrice: 56.00},
    {material: "Square Tube", dimensions: "3x3x14ga @ 24'", unit: "Each", unitPrice: 67.20},
        // 3-1/2x3-1/2
    {material: "Square Tube", dimensions: "3-1/2x3-1/2x1/4 @ 20'", unit: "Each", unitPrice: 137.00},
    {material: "Square Tube", dimensions: "3-1/2x3-1/2x1/4 @ 24'", unit: "Each", unitPrice: 164.40},
        // 4x4
    {material: "Square Tube", dimensions: "4x4x1/4 @ 20'", unit: "Each", unitPrice: 254.00},
    {material: "Square Tube", dimensions: "4x4x1/4 @ 24'", unit: "Each", unitPrice: 304.80},
    {material: "Square Tube", dimensions: "4x4x3/16 @ 20'", unit: "Each", unitPrice: 195.00},
    {material: "Square Tube", dimensions: "4x4x3/16 @ 24'", unit: "Each", unitPrice: 234.00},
    {material: "Square Tube", dimensions: "4x4x11ga @ 20'", unit: "Each", unitPrice: 97.00},
    {material: "Square Tube", dimensions: "4x4x11ga @ 24'", unit: "Each", unitPrice: 116.40},
    {material: "Square Tube", dimensions: "4x4x14ga @ 20'", unit: "Each", unitPrice: 79.00},
    {material: "Square Tube", dimensions: "4x4x14ga @ 24'", unit: "Each", unitPrice: 94.80},
        // 5x5 
    {material: "Square Tube", dimensions: "5x5x3/16 @ 20'", unit: "Each", unitPrice: 165.00},
    {material: "Square Tube", dimensions: "5x5x3/16 @ 24'", unit: "Each", unitPrice: 198.00},
        // 6x6
    {material: "Square Tube", dimensions: "6x6x3/16 @ 20'", unit: "Each", unitPrice: 177.00},
    {material: "Square Tube", dimensions: "6x6x3/16 @ 24'", unit: "Each", unitPrice: 212.40},
];