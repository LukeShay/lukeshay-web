#!/bin/bash

LIBS=libs/*
TOOLS=tools/*
SDKS=sdks/*
PWD=$(pwd)

npm config set "//registry.npmjs.org/:_authToken" "$1" && npm config set "@lukeshay:registry" "https://registry.npmjs.org/"

# for f in ${LIBS}
# do
#     echo "Publishing lib ${f}"
#     cd "${f}"
#     pnpm publish
# done

for f in ${TOOLS}
do
    echo "Publishing tool ${PWD}/${f}"
    npm publish "${PWD}/${f}"
done

# for f in ${SDKS}
# do
#     echo "Publishing sdk ${f}"
#     cd "${f}"
#     pnpm publish
# done

echo 'Done publishing changes.'
