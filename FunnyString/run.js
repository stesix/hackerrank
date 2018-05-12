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
function funnyString(s){
    // Complete this function
    let isValid = false;

    let front = s.charCodeAt(0);
    let back = s.charCodeAt(s.length - 1);

    for (let i = 1; i < s.length/2; i++) {
        if (Math.abs(front - s.charCodeAt(i)) !== Math.abs(back - s.charCodeAt(s.length - 1 - i)))
            return 'Not Funny';

        front = s.charCodeAt(i);
        back = s.charCodeAt(s.length - 1 - i);
    }

    return 'Funny';
}

function main() {
    var q = parseInt(readLine());
    for (var a0 = 0; a0 < q; a0++){
        var s = readLine();
        var result = funnyString(s);
        process.stdout.write("" + result + "\n");
    }

}
