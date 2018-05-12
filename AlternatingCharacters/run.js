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

function alternatingCharacters(s) {
    let del = 0;

    let lastEval = s.charAt(0);
    for (let i = 1; i < s.length; i++) {
        if (s.charAt(i) !== lastEval) {
            lastEval = s.charAt(i);
        } else {
            del++;
        }
    }

    return del;
}

function main() {
    var q = parseInt(readLine());
    for(var a0 = 0; a0 < q; a0++){
        var s = readLine();
        var result = alternatingCharacters(s);
        process.stdout.write("" + result + "\n");
    }

}
