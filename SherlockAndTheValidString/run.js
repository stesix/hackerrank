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

function isValid(s){
    let tmp = {};
    let amounts = {};

    let alreadyRemove = false;
    for (let i = 0; i < s.length; i++) {
        if (!tmp[s.charAt(i)])
            tmp[s.charAt(i)] = 0;
        tmp[s.charAt(i)]++;
    }

    //console.log(tmp);

    let min = Infinity;
    let max = -Infinity;
    let keys = 0;

    for (let c in tmp) {
        let occ = tmp[c];
        if (tmp[c] > 0) {
            if (!amounts[tmp[c]]) {
                amounts[tmp[c]] = 0;
                keys++;
            }

            amounts[tmp[c]]++;

            if (occ > max)
                max = occ;

            if (occ < min)
                min = occ;
        }
    }

    if (min === max)
        return "YES";

    //console.log(amounts);
    if (keys === 2 && amounts[1] === 1)
        return "YES";

    //console.log(min, max, amounts[min], amounts[max]);
    if (max > min + 1 || amounts[max] >= amounts[min]) {
        return "NO"
    }

    return "YES";
}

function main() {
    var s = readLine();
    var result = isValid(s);
    process.stdout.write(""+result+"\n");

}
