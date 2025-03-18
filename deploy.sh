#!/bin/bash

# Exit on error
set -e

# Build the project
echo "Building project..."
npx vite build

# Create a temporary branch for deployment
echo "Creating deployment branch..."
git checkout --orphan temp_gh_pages

# Move to dist directory and prepare files
echo "Preparing files..."
cp -r dist/* .
touch .nojekyll

# Add all files to git
echo "Adding files to git..."
git add -A

# Commit the changes
echo "Committing changes..."
git commit -m "Deploy to GitHub Pages"

# Delete the gh-pages branch if it exists
echo "Cleaning up old deployment..."
git branch -D gh-pages 2>/dev/null || true

# Rename the temporary branch to gh-pages
echo "Creating gh-pages branch..."
git branch -m gh-pages

# Force push to the gh-pages branch
echo "Pushing to GitHub Pages..."
git push -f origin gh-pages

# Return to the main branch
echo "Returning to main branch..."
git checkout main

echo "Deployment complete!" 