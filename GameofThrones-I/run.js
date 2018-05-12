process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function(data) {
    input_stdin += data;
});

process.stdin.on('end', function() {
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

    for (let i = 0; i < 26; i++) 
        result[String.fromCharCode(FIRST_VAL + i)] = { "occurrences":  0 };
    

    for (let i = 0; i < s.length; i++) 
        result[s.charAt(i)].occurrences++;
    

    return result;
}



function gameOfThrones(s) {
    let left = analyseString(s);

    let haveOdd = false;

    for (let c in left) {
        if (left[c].occurrences % 2 === 1) {
            if (s.length % 2 !== 1)
                return "NO";

            if (haveOdd)
                return "NO";
            haveOdd = true;
        }
    }

    return "YES";
}

function main() {
    var s = readLine();
    var result = gameOfThrones(s);
    process.stdout.write("" + result + "\n");

}
