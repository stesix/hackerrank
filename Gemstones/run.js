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
function gemstones(arr){
    // Complete this function
    let result = 0;

    for (let i = 0; i < 26; i++) {
        let found = 0;
        for (let j = 0; j < arr.length; j++) {
            //console.log("Considering", String.fromCharCode(FIRST_VAL + i), "in", arr[j]);
            if (arr[j].indexOf(String.fromCharCode(FIRST_VAL + i)) !== -1)
                found++;
            else
                break;
        }

        if (found === arr.length)
            result++;
    }

    return result;
}

function main() {
    var n = parseInt(readLine());
    var arr = [];
    for (var arr_i = 0; arr_i < n; arr_i++)
        arr[arr_i] = readLine();
    
    var result = gemstones(arr);
    process.stdout.write("" + result + "\n");

}
