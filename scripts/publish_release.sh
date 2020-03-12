#!/bin/sh

LIBS=libs/*
TOOLS=tools/*
SDKS=sdks/*
PWD=$(pwd)

yarn config set "//registry.npmjs.org/:_authToken" "$1" && yarn config set "@lukeshay:registry" "https://registry.npmjs.org/"

# for f in ${LIBS}
# do
#     echo "Publishing lib ${f}"
#     cd "${f}"
#     pnpm publish
# done

# for f in ${TOOLS}
# do
#     echo "Publishing tool ${PWD}/${f}"
#     yarn publish "${PWD}/${f}"
# done

# for f in ${SDKS}
# do
#     echo "Publishing sdk ${f}"
#     cd "${f}"
#     pnpm publish
# done

node common/scripts/install-run-rush.js install
node common/scripts/install-run-rush.js rebuild --verbose
node common/scripts/install-run-rush.js publish --apply --publish --npm-auth-token $1 --include-all

echo 'Done publishing changes.'
