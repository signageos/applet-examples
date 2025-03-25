#!/bin/bash

# Set error catching
set -o pipefail

# State
SUCCESS_BUILDS=()
FAILED_BUILDS=()
SUCCESS_INSTALLS=()
FAILED_INSTALLS=()

# Find 'cli-applet' folders
# TODO make the entry path as argument
echo "--------------------------------------------"
echo "Batch script to build all nested cli applets"
echo "--------------------------------------------"

echo "looking up 'cli-applet' in ./examples/..."
CLI_APPLET_DIRS=$(find ./examples/ -type d -name "cli-applet")

if [ -z "$CLI_APPLET_DIRS" ]; then
    echo "No folders 'cli-applet' found."
    exit 1
fi

echo "Found 'cli-applet' folders:"
echo "$CLI_APPLET_DIRS"
echo "-------------------------------------"
echo "Starting build for all..."
echo "-------------------------------------"

# Count folders and iterate
TOTAL_DIRS=$(echo "$CLI_APPLET_DIRS" | wc -l)
CURRENT=1

for dir in $CLI_APPLET_DIRS; do

    # if [[ "$dir" == *"framework"* ]]; then
    #    echo "Skipping framework-based applet in $dir..."
    #    continue
    # fi

    echo "[$CURRENT/$TOTAL_DIRS] Processing: $dir"

    # Change path
    pushd "$dir" > /dev/null

    # Install dependencie
    echo "Cleaning 'node_modules' in $dir..."
    rm -rf ./node_modules
    echo "Running 'npm install' in $dir..."
    if npm install > install_log.txt 2>&1; then
        echo "✅ Install ok."
        SUCCESS_INSTALLS+=("$dir")
    else
        echo "X Install failed. Log stored: $dir/install_log.txt"
        FAILED_INSTALLS+=("$dir")
    fi

    # Build source and report
    echo "Running 'npm run build' in $dir..."
    if npm run build > build_log.txt 2>&1; then
        echo "✅ Build ok."
        SUCCESS_BUILDS+=("$dir")
    else
        echo "X Build failed. Log stored: $dir/build_log.txt"
        FAILED_BUILDS+=("$dir")
    fi

    # Return to original path
    popd > /dev/null

    echo "-------------------------------------"
    ((CURRENT++))
done

echo "RESULT:"
echo "-------------------------------------"
echo "Folders processed: $TOTAL_DIRS"
echo "Successful builds: ${#SUCCESS_BUILDS[@]}"
echo "Failed builds: ${#FAILED_BUILDS[@]}"
echo "-------------------------------------"

if [ ${#SUCCESS_BUILDS[@]} -gt 0 ]; then
    echo "SUCCESSFUL BUILDS:"
    for dir in "${SUCCESS_BUILDS[@]}"; do
        echo "✅ $dir"
    done
    echo "-------------------------------------"
fi

if [ ${#FAILED_BUILDS[@]} -gt 0 ]; then
    echo "FAILED BUILDS:"
    for dir in "${FAILED_BUILDS[@]}"; do
        echo "❌ $dir"
    done
    echo "-------------------------------------"
fi

echo "Done."

# Prune logs
# find . -name install_log.txt -print0 | xargs -0 rm -rf
# find . -name build_log.txt -print0 | xargs -0 rm -rf

# Prune node_modules
# find . -name 'node_modules' -type d -prune -print -exec rm -rf '{}' \;