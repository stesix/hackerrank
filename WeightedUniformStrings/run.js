'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the weightedUniformStrings function below.
 */
const FIRST_VAL = 'a'.charCodeAt(0);

function analyseArray(s) {
    let lastChar = '';
    let i = 0;
    let result = {};
    let occurrence = 0;

    for (let i = 0; i < s.length; i++) {
        if (lastChar !== s.charAt(i)) {
            lastChar = s.charAt(i);
            occurrence = 1;
            if (!result[s.charAt(i)])
                result[s.charAt(i)] = { "occurrences": 1, "value": s.charCodeAt(i) - FIRST_VAL + 1 };
        } else {
            occurrence++;
            if (occurrence > result[lastChar].occurrences)
                result[lastChar].occurrences = occurrence;
        }
    }

    for (let key in result) {
        let obj = result[key];
        obj.max = obj.occurrences * obj.value;

        console.log(key, 'max:', obj.max, 'occurrences:', obj.occurrences, 'value:', obj.value);
    }

    return result;
}

function weightedUniformStrings(s, queries) {
    /*
     * Write your code here.
     */
    let result = [];

    // reduce string
    let stringAnalysis = analyseArray(s);

    for (let k = 0; k < queries.length; k++) {
        let found = false;
        let query = queries[k];
        for (let key in stringAnalysis) {
            let obj = stringAnalysis[key];
            if (query <= obj.max && obj.value <= query && query % obj.value === 0 && obj.occurrences >= (query/obj.value) ) {
                found = true;
                break;
            }
        }

        if (found)
            result.push('Yes');
        else
            result.push('No');
    }

    return result;
}

function main() {
    //const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const queriesCount = parseInt(readLine(), 10);

    let queries = [];

    for (let queriesItr = 0; queriesItr < queriesCount; queriesItr++) {
        const queriesItem = parseInt(readLine(), 10);
        queries.push(queriesItem);
    }

    let result = weightedUniformStrings(s, queries);

    console.log(result.join("\n") + "\n");
}

