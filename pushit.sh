#!/bin/bash

# Define the current day and time
CURRENT_DAY_TIME=$(date +"%Y-%m-%d %H:%M:%S")

# Create a commit message including the day and time
COMMIT_MESSAGE="Update changes - $CURRENT_DAY_TIME"

# Add all changes
git add .

# Commit changes with the provided message
git commit -m "$COMMIT_MESSAGE"

# Prompt user for the branch
read -p "Enter the branch name (e.g., main): " BRANCH_NAME

# Push changes to the specified branch
git push origin "$BRANCH_NAME"
