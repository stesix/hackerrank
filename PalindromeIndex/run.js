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

function isPalindrome(s) {
    //console.log("++ SLOW - Checking:", s.join(""), '==', s.reverse().join(""), '(' + (s.join("") == s.reverse().join("")) + ')')
    return (s.join("") == s.reverse().join(""));
}

function slowPalindromeCheck(s, i) {
    //console.log("s.length = ", s.length);
    let sArr, removed;

    while (i < s.length/2) {
        sArr = s.split("");
        removed = sArr.splice(s.length - 1 - i, 1);
        //console.log("+ SLOW - check", s.length - 1 - i, " - ", removed);

        if (isPalindrome(sArr))
            return s.length - 1 - i;

        sArr = s.split("");
        removed = sArr.splice(i, 1);

        //console.log("sArr.length = ", sArr.length);
        //console.log("+ SLOW - check", i, " - ", removed);

        if (isPalindrome(sArr))
            return i;

        i++;
    }

    return -1;
}

function palindromeIndex(s) {
    // Complete this function
    let removalsStart = 0;
    let removalsEnd = 0;
    let idx = -1;
    let i = 0;

    while (i < s.length/2) {
        let sIdx = removalsStart + i;
        let eIdx = s.length - i - 1 - removalsEnd;
        let tIdx = -1;

        if (s.charAt(sIdx) !== s.charAt(eIdx)) {
            if (s.charAt(sIdx + 1) === s.charAt(eIdx)) {
                //console.log("*** REMOVE FIRST: ", s.charAt(sIdx + 1), '!==', s.charAt(eIdx), 'removing:',   sIdx);
                removalsStart++;
                tIdx = sIdx;
            } else if (s.charAt(sIdx) === s.charAt(eIdx - 1)) {
                removalsEnd++;
                tIdx = eIdx;
            } else {
                idx = -1;
                break;
            }

            if (tIdx !== idx && idx > -1) {
                idx = -1;
                break;
            }

            idx = tIdx;
        }

        i++;
    }

    if (idx === -1 && i < s.length/2) 
        return slowPalindromeCheck(s, i - 2);
    

    return idx;
}

function main() {
    var q = parseInt(readLine());
    for (var a0 = 0; a0 < q; a0++){
        var s = readLine();
        var result = palindromeIndex(s);
        process.stdout.write("" + result + "\n");
    }

}
