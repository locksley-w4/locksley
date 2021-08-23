function rand(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

function randFloat(min, max, nad) {
    return parseFloat((min + Math.random() * (max + 1 - min)).toFixed(nad))
}

function randArray(Arraylength, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER, repeats = true,) {
    let returnArray = Array(Arraylength);
    let i = 0;

    if (!repeats && max + 1 - min < Arraylength) {
        throw ReferenceError('Параметры введены неверно. Диапазон доступных чисел слишком маленький!)');
    }

    while (returnArray[Arraylength - 1] == undefined) {


        let randNum = Math.floor(min + Math.random() * (max + 1 - min));

        if (repeats) {
            returnArray[i++] = randNum;
        } else {

            if (returnArray.indexOf(randNum) === -1) {
                returnArray[i++] = randNum;
            }

        }
    }
    return returnArray;
}
let anyarray = randArray(15, 1, 10, true);

function population(array, searchableElem = undefined) {
    let populationObject = { "elem": "how many times", total: array.length };
    let populationProcent = { "elem": "%", total: 100 };
    let popularity = 0;


    array.forEach((elem, index, _array) => {
        _array.forEach((_elem, _index) => {
            if (_elem === elem) {
                popularity++
            }
        });
        populationObject[elem] = popularity;

        popularity = 0
    });

    array.forEach((elem, index) => {
        populationProcent[elem] = Math.round(populationObject[elem] * 100 / array.length * 10) / 10
    });

    populationObject.procents = populationProcent;


    if (typeof searchableElem !== "undefined") {
        array.forEach(el => {
            if (el === searchableElem) {
                popularity++
            }
        });
        populationObject.result = popularity;

        popularity = 0;
    }


    return populationObject;
}

function randArrayEl(array) {
    return array[rand(0, array.length - 1)]
}

function torf() { // true or false
    return !!rand(0, 1)
}


/**
 * 
 * @param {Number} length 
 * @param {String} type 
 * @property "all" any symbols, letters and numbers
 * @property "let" only letters
 * @property "num" only numbers
 * @property "lan" only letters and numbers
 * @property "sym" only symbols
 * @param {Boolean} onlyEnglishLetters 
 * @param {Array} not 
 * @returns random string
 */
function randString(length, type = "all", onlyEnglishLetters = true, not = null,) {
    const allSymbols = `\`1234567890-~!@#$%^&*()_+qQwWeErRtTyYuUiIoOpP[]{}aAsSdDfFgGhHjJkKlL\';\\|\":zZxXcCvVbBnNmM,.<>?/`;

    const notLettersAndNumbers = `\`~!@#$%^&*()_+{}[];:\'\"|\\<,>.?/`;

    const alphabetEN = "qwertyuiopasdfghjklzxcvbnm";

    const numbers = randArray(10, 0, 9, false)


    let result = "";
    if (type === "all") {
        for (let i = 0; i < length; i++) {
            result += randArrayEl(allSymbols)
        }
    } else if (type === "let") {
        for (let i = 0; i < length; i++) {
            let _letter = randArrayEl(alphabetEN)
            result += torf() ? _letter.toUpperCase() : _letter;
        }
    } else if (type === "num") {
        for (let i = 0; i < length; i++) {
            result += randArrayEl(numbers)
        }
    } else if (type === "lan") {
        for (let i = 0; i < length; i++) {
            let isNumber = rand(1, 5) % 2 === 0;
            if (isNumber) result += randArrayEl(numbers).toString();
            else result += torf() ? randArrayEl(alphabetEN).toUpperCase() : randArrayEl(alphabetEN);
        }
    }
    else if (type === "sym") {
        for (let i = 0; i < length; i++) {
            result += randArrayEl(notLettersAndNumbers)
        }
    }

    return result;

}
// console.log(randString(10, "sym"));

let passwords = Array(5);

i = 0;

while (passwords[passwords.length - 1] === undefined) {
    let pass = randString(1, "num");

    if (passwords.indexOf(pass) === -1) {
        passwords[i++] = pass;
    }
}

/**
 * 
 * @param {Array} array 
 * @param {Number} length 
 */

function makeUniquePassword(array, length) {
    let pass = randString(length, "num")

    if (array.indexOf(pass) !== -1) return makeUniquePassword(array, length)
    else return pass;
}

// console.log(makeUniquePassword(passwords, 1))

function randArrayString(length, typeOfString = "lan", elementLength = 8, repeats = true,) {
    let result = Array(length);

    let i = 0;
    if (repeats) {

        while (!result[length - 1]) {
            let randArrayEl = randString(elementLength, typeOfString)

            result[i++] = randArrayEl
        }
    } else {
        while (!result[length - 1]) {
            let randArrayEl = randString(elementLength, typeOfString);

            let resultToCheck = result.map((elem) => elem.toLowerCase());

            if (resultToCheck.indexOf(randArrayEl.toLowerCase()) !== -1) continue

            result[i++] = randArrayEl
        }
    }

    return result

}

// console.log(randArrayString(100, "lan", 15, true));

