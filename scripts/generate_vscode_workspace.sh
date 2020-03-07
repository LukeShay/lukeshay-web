#!/bin/bash

PWD=$(pwd)
VSCW="lukeshay-web"

echo '{ "path": "${PWD}/scripts", "name": "Scripts" }' | jq .
