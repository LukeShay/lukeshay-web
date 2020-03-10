#!/bin/bash

LIBS=$(ls -d libs/*)
TOOLS=$(ls -d tools/*)
SDKS=$(ls -d sdks/*)

for i in "${LIBS[@]}"
do
    echo "Publishing lib ${i}"
    cd "libs/${i}"
    npm publish
done

for i in "${TOOLS[@]}"
do
    echo "Publishing tool ${i}"
    cd "tools/${i}"
    npm publish
done

for i in "${SDKS[@]}"
do
    echo "Publishing sdk ${i}"
    cd "sdks/${i}"
    npm publish
done

echo 'Done publishing changes.'
