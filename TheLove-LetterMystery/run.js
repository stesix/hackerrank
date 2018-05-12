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

function theLoveLetterMystery(s){
    let changes = 0;
    for (let i = 0; i < s.length/2; i++)
        changes += Math.abs(s.charCodeAt(i) - s.charCodeAt(s.length - 1 - i));

    return changes;
}

function main() {
    var q = parseInt(readLine());
    for (var a0 = 0; a0 < q; a0++){
        var s = readLine();
        var result = theLoveLetterMystery(s);
        process.stdout.write("" + result + "\n");
    }

}
