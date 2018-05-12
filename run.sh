#!/bin/bash

if [ -z "$1" ] ; then
    echo "Usage: $0 Exercise"
    exit 1
fi

if [ ! -d "$1" ] ; then
    echo "Can't find the folder containing the exercise"
    exit 1
fi

if [ ! -f "$1/run.js" ] ; then
    echo "Can't find the file to execute in the exercise ($1/run.js)"
    exit 1
fi

cd "$1" &> /dev/null

for testFile in test.* ; do
    extension=$( echo $testFile | cut -d. -f2 )

    echo "** Running test '$testFile' for '$1':"
    if [ -f "result.$extension" ] ; then
        node run.js < $testFile > "result.${extension}.tmp"
        diff -q "result.$extension" "result.${extension}.tmp"
        exit_code=$?

        if [ $exit_code -ne 0 ] ; then
            echo "*** Error, expected this output:"
            cat "result.$extension"
            echo
            echo "*** Obtained this output:"
            cat "result.${extension}.tmp"
        else
            echo "*** Results for $testFile match the expectation."
        fi
        rm -f "result.${extension}.tmp"
    else
        node run.js < $testFile
    fi
done
