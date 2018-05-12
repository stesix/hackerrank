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

    //console.log(s);

    for (let i = 0; i < 26; i++) {
        result[String.fromCharCode(FIRST_VAL + i)] = { "occurrences":  0 };
    }

    for (let i = 0; i < s.length; i++) {
        result[s.charAt(i)]["occurrences"]++;
    }

    return result;
}



function anagram(s){
    if (s.length % 2 === 1)
        return -1;

    let left = analyseString(s.substr(0, s.length / 2));
    let right = analyseString(s.substr(s.length / 2, s.length / 2));

    //console.log("LEFT", left);
    //console.log("RIGHT", right);

    let leftChanges = 0;
    let rightChanges = 0;

    for (let c in left) {
        if (left[c].occurrences < right[c].occurrences) {
            leftChanges += right[c].occurrences - left[c].occurrences;
        } else if (left[c].occurrences > right[c].occurrences) {
            rightChanges += left[c].occurrences - right[c].occurrences;
        }
    }

    if (rightChanges > leftChanges)
        return leftChanges;
    return rightChanges
}

function main() {
    var q = parseInt(readLine());
    for(var a0 = 0; a0 < q; a0++){
        var s = readLine();
        var result = anagram(s);
        process.stdout.write("" + result + "\n");
    }

}
