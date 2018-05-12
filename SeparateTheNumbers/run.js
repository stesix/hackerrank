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

function separateNumbers(s) {
    // Complete this function
    let step = 1;
    let first;

    if (s.length < 2)
        return console.log('NO');

    while (step <= s.length/2 + 1) {
        let ok = false;
        let lastChecked;

        first = s.substr(0, step);

        //console.log('------ STEP:', step, first);
        if (step > 1 && first.charAt(0) == '0')
            break;

        lastChecked = first;
        let i = step;
        while (i < s.length) {
            let tmp = s.substr(i, step);
            if (step > 1 && tmp.charAt(0) == '0') {
                ok = false;
                break;
            }

            if (step > 15) {
                let longRemainder = 0;
                for (let k = 0; k < Math.floor(step/4); k++) {
                    let longTmp = tmp.substr(tmp.length - (k + 1) * 4, 4);
                    let longLastChecked = lastChecked.substr(lastChecked.length - (k + 1) * 4, 4);
                    let longTmpN = parseInt(longTmp);
                    let longLastCheckedN = parseInt(longLastChecked);

                    //console.log("+++ LONG CHECK -", k, longTmp, longLastChecked);
                    if (k === 0) {
                        if ( longLastCheckedN === (longTmpN - 1) || longLastCheckedN === (longTmpN - 1 + 10000) ) {
                            if (longLastCheckedN === (longTmpN - 1 + 10000))
                                longRemainder = 1;
                            ok = true;
                        } else {
                            ok = false;
                            break;
                        }
                    } else {
                        if (longRemainder > 0) {
                            longRemainder = 0;
                            longLastChecked++;
                        }

                        if (longTmpN !== longLastCheckedN) {
                            ok = false;
                            break;
                        }
                    }
                }

                let longTmp = tmp.substr(0, tmp.length % 4);
                let longLastChecked = lastChecked.substr(0, lastChecked.length % 4);
                if (longTmp !== longLastChecked) {
                    ok = false;
                    break;
                }
            } else {
                if (parseInt(lastChecked) > (parseInt(tmp) - 1)) {
                    let specialTmp = s.substr(i, step + 1);
                    if (parseInt(lastChecked) != (parseInt(specialTmp) - 1))
                        break;

                    step++;
                    ok = true;
                    lastChecked = specialTmp;
                } else if (parseInt(lastChecked) == (parseInt(tmp) - 1)) {
                    ok = true;
                    lastChecked = tmp;
                } else {
                    ok = false;
                    break;
                }
            }

            i = i + step;
        }

        if (ok && i === s.length)
            return console.log('YES', first);

        step++;
    }


    console.log('NO');
}

function main() {
    var q = parseInt(readLine());
    for(var a0 = 0; a0 < q; a0++){
        var s = readLine();
        separateNumbers(s);
    }

}
