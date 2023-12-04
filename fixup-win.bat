@echo off
echo {> dist/cjs/package.json
echo    "type": "commonjs" >> dist/cjs/package.json
echo }>> dist/cjs/package.json

echo {> dist/mjs/package.json
echo    "type": "module" >> dist/mjs/package.json
echo }>> dist/mjs/package.json