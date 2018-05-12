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

function beautifulBinaryString(b) {
    let changes = 0;
    let idx = b.indexOf('010');
    while (idx > -1) {
        //console.log("Considering idx:", idx);
        changes++;
        idx = b.indexOf('010', idx + 3);
    }

    return changes;
}

function main() {
    var n = parseInt(readLine());
    var b = readLine();
    var result = beautifulBinaryString(b);
    process.stdout.write("" + result + "\n");

}
