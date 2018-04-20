#!/bin/bash

# Create empty file if it doesn't exist yet.
touch ./library.js

# The > operator overwrites the contents of the target file
cat ./Matrix.js > ./library.js

# The >> operator appends data
# Use echo " " to introduce empty lines
echo " " >> ./library.js
echo " " >> ./library.js

# Append the second file
cat ./NeuralNetwork.js >> ./library.js