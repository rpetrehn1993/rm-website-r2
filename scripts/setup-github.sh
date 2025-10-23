#!/bin/bash

# GitHub Setup Script for RM Website R2
# This script helps you create a GitHub repository and push your code

echo "🚀 Setting up GitHub repository for RM Website R2..."

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "Please install it first: https://cli.github.com/"
    echo "Or create the repository manually on GitHub.com"
    exit 1
fi

# Check if user is logged in to GitHub CLI
if ! gh auth status &> /dev/null; then
    echo "🔐 Please log in to GitHub CLI first:"
    echo "Run: gh auth login"
    exit 1
fi

# Create repository on GitHub
echo "📦 Creating repository on GitHub..."
gh repo create rm-website-r2 --public --description "Portfolio website built with Next.js, TypeScript, and Tailwind CSS" --source=. --remote=origin --push

echo "✅ Repository created and code pushed to GitHub!"
echo "🌐 Your repository: https://github.com/$(gh api user --jq .login)/rm-website-r2"
