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

/*
    Find and print the respective total healths of the unhealthiest (minimum total health)
    and healthiest (maximum total health) strands of DNA as two space-separated values on a single line.
*/

function Node() {
    this.index = [];
    this.indexH = [];
    this.children = {};
}

function Trie() {
    var root = new Node();

    function add(word, node, index, health) {
        var previousHealth = 0;

        if (word === '') {
            if (node.index.length > 0)
                previousHealth = node.indexH[node.index.length - 1];

            node.index.push(index);
            node.indexH.push(health + previousHealth);
            return;
        }

        var c = word[0];
        if (!node.children[c])
            node.children[c] = new Node();

        add(word.substr(1), node.children[c], index, health);
    }

    return {
        add: function(word, index, health) {
            add(word, root, index, health);
        },
        getRoot: function() {
            return root;
        }
    }
}

function findIndex(genes, first, last, value) {
    var idx = Math.floor((last - first) / 2) + first;

    if (genes[idx] === value)
        return idx;

    if (genes[first] === value)
        return first;

    if (genes[last] === value)
        return last;

    if (genes[idx] > value)
        last = idx;
    else
        first = idx;

    if (last - first <= 1) {
        if (genes[last] < value)
            return last;
        return first;
    }

    return findIndex(genes, first, last, value);
}

function getScore(node, first, last, r) {
    if (node.index.length === 0)
        return r;

    var startIdx = findIndex(node.index, 0, node.index.length - 1, first - 1);
    var endIdx = findIndex(node.index, 0, node.index.length - 1, last);

    if (node.index[endIdx] <= last) {
        r += node.indexH[endIdx];
        //console.log('++ getScore <= last r:', node.indexH[endIdx], 'endIdx: ', endIdx);
    }

    //

    if (node.index[startIdx] < first) {
        r -= node.indexH[startIdx];
        //console.log('++ getScore < first indexH:', node.indexH[endIdx], 'startIdx: ', startIdx);
    }

    return r;
}

function performMagic(genes, health, first, last, d) {
    var rating = 0;

    //console.log("****** building on " + d);
    for (var i = 0; i < d.length; i++) {
        var iter = i;
        var node = genes.getRoot();

        do {
            node = node.children[d[iter++]];
            if (!node)
                break;

            rating = getScore(node, first, last, rating);
            //console.log('RATING:', rating, "NODE: ", node);
        } while(node && iter < d.length);
    }
    return rating;
}

function main() {
    var n = parseInt(readLine());
    genes = readLine().split(' ');
    health = readLine().split(' ');
    health = health.map(Number);
    var s = parseInt(readLine());

    var min = Infinity;
    var max = -Infinity;
    var trie = new Trie();

    genes.forEach((gene, index) => {
        trie.add(gene, index, health[index]);
    });

    for(var a0 = 0; a0 < s; a0++){
        var first_temp = readLine().split(' ');
        var first = parseInt(first_temp[0]);
        var last = parseInt(first_temp[1]);
        var d = first_temp[2];

        var tmp = performMagic(trie, health, first, last, d);

        if (tmp > max) max = tmp;
        if (tmp < min) min = tmp;
    }

    console.log(min, max);
}
