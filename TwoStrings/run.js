process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////
const FIRST_VAL = 'a'.charCodeAt(0);

function analyseString(s) {
    let result = {};

    for (let i = 0; i < 26; i++) {
        result[String.fromCharCode(FIRST_VAL + i)] = { "occurrences":  s.indexOf(String.fromCharCode(FIRST_VAL + i)) };
    }

    return result;
}

function twoStrings(s1, s2){
    let first = analyseString(s1);
    let second = analyseString(s2);

    for (let c in first) {
        if (first[c].occurrences > 0 && second[c].occurrences > 0) {
            return "YES";
        }
    }

    return "NO";
}

function main() {
    var q = parseInt(readLine());
    for(var a0 = 0; a0 < q; a0++){
        var s1 = readLine();
        var s2 = readLine();
        var result = twoStrings(s1, s2);
        process.stdout.write("" + result + "\n");
    }

}
