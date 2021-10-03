const prefixes = ['Y', 'Z', 'E', 'P', 'T', 'G', 'M', 'k', 'h', 'da', '', 'd', 'c', 'm', 'u', 'n', 'p', 'f', 'a', 'z', 'y'];
const factors = [24, 21, 18, 15, 12, 9, 6, 3, 2, 1, 0, -1, -2, -3, -6, -9, -12, -15, -18, -21, -24];
// SI units only, that follow the mg/kg/dg/cg type of format
const units = ['g', 'b', 'l', 'm', 'sqkm', 'sqm', 'sqcm'];


class UnitConverter {

    addUnit (baseUnit, actualUnit, multiplier) {
        this.table[actualUnit] = { base: baseUnit, actual: actualUnit, multiplier: multiplier };
    }
    
    roundOff (num, places) {
        const x = Math.pow(10,places);
        return Math.round(num * x) / x;
    }

    convert (from, to, amount, rounded=2) {
        // first, convert from the current value to the base unit
        var current = this.table[from];
        var target = this.table[to];
        if (target.base != current.base) {
            throw new Error('Incompatible units; cannot convert from "' + from + '" to "' + to + '"');
        }
        const x = amount * (current.multiplier / target.multiplier);
        if (rounded === false) {
            return x
        }
        return this.roundOff(x, rounded)
    };

    constructor() {
        this.table = []

        for (var j = 0; j < units.length; j++) {
            var base = units[j];
            for (var i = 0; i < prefixes.length; i++) {
                this.addUnit(base, prefixes[i] + base, Math.pow(10, factors[i]));
            }
        }

        // we use the SI gram unit as the base; this allows
        // us to convert between SI and English units
        this.addUnit('g', 'ounce', 28.3495231);
        this.addUnit('g', 'oz', 28.3495231);
        this.addUnit('g', 'pound', 453.59237);
        this.addUnit('g', 'lb', 453.59237);

        // we use the SI metre unit as the base; this allows
        // us to convert between SI and English units
        this.addUnit('m', 'in', 0.0254);
        this.addUnit('m', 'inch', 0.0254);
        this.addUnit('m', 'ft', 0.3048);
        this.addUnit('m', 'foot', 0.3048);
        this.addUnit('m', 'yd', 0.9144);
        this.addUnit('m', 'yard', 0.9144);

        // 2017-01-18 1217 roryok
        // adding in some more 
        this.addUnit('m', 'mi', 1609);
        this.addUnit('m', 'nmi', 1852);
        this.addUnit('sqkm', 'sqmi', 0.386102158542);
        this.addUnit('sqm', 'sqft', 0.09290304);
        this.addUnit('sqm', 'sqyd', 0.836127);
        this.addUnit('sqcm', 'sqin', 6.4516);
        this.addUnit('sqm', 'ac', 4046.86);
        this.addUnit('sqm', 'ar', 100);
        this.addUnit('sqm', 'ha', 10000);

    }
}

export default UnitConverter


// const unitConverter = function (value, unit) {
//     this.value = value;
//     if (unit) {
//         this.currentUnit = unit;
//     }
// };
    
// const from = function (targetUnit) {
//     this.targetUnit = targetUnit;
//     return this;
// };

    
//     unitConverter.prototype.is = function (currentUnit) {
//         this.currentUnit = currentUnit;
//         return this;
//     };

    // unitConverter.prototype.val = function () {
    //     // first, convert from the current value to the base unit
    //     var target = table[this.targetUnit];
    //     var current = table[this.currentUnit];
    //     if (target.base != current.base) {
    //         throw new Error('Incompatible units; cannot convert from "' + this.currentUnit + '" to "' + this.targetUnit + '"');
    //     }
    //     return this.value * (current.multiplier / target.multiplier);
    // };

    // unitConverter.prototype.toString = function () {
    //     return this.val() + ' ' + this.targetUnit;
    // };
    
    // unitConverter.prototype.debug = function () {
    //     return this.value + ' ' + this.currentUnit + ' is ' + this.val() + ' ' + this.targetUnit;
    // };
    





