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



function makingAnagrams(s1, s2) {
    let left = analyseString(s1);
    let right = analyseString(s2);

    //console.log("LEFT", left);
    //console.log("RIGHT", right);

    let leftChanges = 0;
    let rightChanges = 0;

    for (let c in left) {
        if (left[c].occurrences < right[c].occurrences) 
            leftChanges += right[c].occurrences - left[c].occurrences;
        else if (left[c].occurrences > right[c].occurrences) 
            rightChanges += left[c].occurrences - right[c].occurrences;
        
    }

    return rightChanges + leftChanges;
}

function main() {
    var s1 = readLine();
    var s2 = readLine();
    var result = makingAnagrams(s1, s2);
    process.stdout.write("" + result + "\n");
}
