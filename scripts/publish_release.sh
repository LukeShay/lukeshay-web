#!/bin/sh

LIBS=libs/*
TOOLS=tools/*
SDKS=sdks/*
PWD=$(pwd)

yarn config set "//registry.npmjs.org/:_authToken" "$1" && yarn config set "@lukeshay:registry" "https://registry.npmjs.org/"

DATE=$(date +%m-%d-%y-%H-%M)
BRANCH_NAME="release-${DATE}"
DATE=$(date +%m-%d-%y %H:%M)
COMMIT="Release ${DATE}"
PR_DESC="Published release on ${DATE}"

node common/scripts/install-run-rush.js install \
&& \
node common/scripts/install-run-rush.js rebuild --verbose \
&& \
node common/scripts/install-run-rush.js publish --apply --publish --npm-auth-token $1 --include-all \
&& \
node common/scripts/install-run-rush.js change --overwrite --bulk --email "shay.luke17@gmail.com" --bump-type none || exit 1

git checkout -b ${BRANCH_NAME}
git acm ${COMMIT}
git push --set-upstream origin ${BRANCH_NAME}

gh pr create -t ${COMMIT} -b ${PR_DESC} -w
