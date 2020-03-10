#!/bin/bash

EXIT_STATUS=0

node common/scripts/install-run-rush.js change -v | EXIT_STATUS=1

if [[ EXIT_STATUS == 1 ]]; then
    echo 'Some changes have not been updated.'
fi

# Check if the local repo is clean
if test -n "$(git status --porcelain --untracked-files=no)"
then
  echo "Working directory contains uncommitted changes."
  exit 1
fi

# Check if upstream has changes
if test -n "$(git status -sb --porcelain https://github.com/LukeShay/lukeshay-web.git | grep "\[behind")"
then
  echo "Working directory is behind upstream. Pull upstream and try again."
  exit 1
fi

DATE=$(date +%m-%d-%y-%H:%M)
BRANCH_NAME="stage-release-${DATE}"

echo "Staging release on branch ${BRANCH_NAME}"
git checkout -b ${BRANCH_NAME}

echo "Runnig 'rush publish -a'"
node common/scripts/install-run-rush.js publish -a
node common/scripts/install-run-rush.js change --overwrite --message ""

echo "Commiting and pushing changes to branch ${BRANCH_NAME}."
git acm "Stage release ${DATE}."
git push --set-upstream origin ${BRANCH_NAME}

echo "Successfully staged release. Create a pull request for ${BRANCH_NAME}."
