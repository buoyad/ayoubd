#! /bin/bash

set -e

cd api && npm run dev | sed 's/^/\[api\]: /' && cd .. & 
pidApi=$!
echo "started api: $pidApi"
cd site && bun run dev | sed 's/^/\[next\]: /' && cd .. &
pidNext=$!
echo "started next: $pidNext"

trap "kill -2 $pidApi $pidNext" SIGINT SIGTERM EXIT
wait $pidApi $pidNext

echo "exited"

exit $?
