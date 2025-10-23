# GitHub Setup Instructions

## Option 1: Using GitHub CLI (Recommended)

1. Install GitHub CLI:
   ```bash
   brew install gh
   ```

2. Authenticate with GitHub:
   ```bash
   gh auth login
   ```

3. Run the setup script:
   ```bash
   ./scripts/setup-github.sh
   ```

## Option 2: Manual Setup

1. Go to [GitHub.com](https://github.com) and create a new repository
2. Name it: `rm-website-r2`
3. Make it public
4. Don't initialize with README (we already have one)
5. Copy the repository URL

6. Add the remote and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/rm-website-r2.git
   git branch -M main
   git push -u origin main
   ```

## Option 3: Quick Setup (if you have GitHub CLI)

```bash
# Install GitHub CLI if not installed
brew install gh

# Login to GitHub
gh auth login

# Create repository and push
gh repo create rm-website-r2 --public --description "Portfolio website built with Next.js, TypeScript, and Tailwind CSS" --source=. --remote=origin --push
```

## Next Steps

Once your repository is set up:

1. **Set up environment variables**: Copy `env.example` to `.env.local` and add your tokens
2. **Install dependencies**: `npm install`
3. **Start development**: `npm run dev`
4. **Deploy**: Consider Vercel for easy deployment with GitHub integration

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run analyze` - Analyze bundle size
