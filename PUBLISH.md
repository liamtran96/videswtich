# How to Publish to npm

Follow these steps to publish your CLI tool to npm so anyone can install it with `npm install -g claude-model-switcher`.

## Prerequisites

1. **Create an npm account** (if you don't have one)
   - Go to https://www.npmjs.com/signup
   - Create your free account

2. **Login to npm from terminal**
   ```bash
   npm login
   ```
   Enter your username, password, and email

## Step-by-Step Publishing Guide

### 1. Update Package Information

Edit `package.json` and update:

```json
"author": "Your Name <your.email@example.com>"
```

Replace with your actual name and email.

### 2. Check if Package Name is Available

```bash
npm search claude-model-switcher
```

If the name is taken, update the `name` field in `package.json` to something unique like:
- `@yourusername/claude-model-switcher`
- `claude-ai-switcher`
- `ai-model-switcher-cli`

### 3. Build the Project

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` folder.

### 4. Test the Package Locally

```bash
# Create a test package
npm pack

# This creates a .tgz file. Install it locally to test:
npm install -g ./claude-model-switcher-1.0.0.tgz

# Test it works
model-switcher list
model-switcher --help

# Uninstall after testing
npm uninstall -g claude-model-switcher
```

### 5. Publish to npm

```bash
# Publish the package
npm publish
```

If you want to publish with public access (for scoped packages):
```bash
npm publish --access public
```

### 6. Verify Publication

After publishing, check your package on npm:
- Visit: https://www.npmjs.com/package/claude-model-switcher
- Or search: `npm search claude-model-switcher`

### 7. Install and Use

Now anyone can install your tool:

```bash
# Install globally
npm install -g claude-model-switcher

# Use it
model-switcher list
model-switcher use glm-4.6
```

## Publishing Updates

When you make changes and want to publish a new version:

```bash
# 1. Update version number
npm version patch   # 1.0.0 -> 1.0.1 (bug fixes)
npm version minor   # 1.0.0 -> 1.1.0 (new features)
npm version major   # 1.0.0 -> 2.0.0 (breaking changes)

# 2. Build
npm run build

# 3. Publish
npm publish

# 4. Push version tag to git
git push && git push --tags
```

## Troubleshooting

### Error: Package name already taken
Change the `name` in `package.json` to something unique.

### Error: You must be logged in
Run `npm login` and enter your credentials.

### Error: 402 Payment Required
Make sure you're publishing as public: `npm publish --access public`

### Test before publishing
Always run `npm pack` and test the .tgz file locally before publishing.

## Best Practices

1. **Update README.md** with clear installation instructions
2. **Semantic Versioning**: Use proper version numbers (MAJOR.MINOR.PATCH)
3. **Changelog**: Keep track of changes between versions
4. **Test thoroughly** before each publish
5. **Use .npmignore** if you want to exclude files (optional, we use `files` field)

## Quick Publish Checklist

- [ ] npm account created
- [ ] Logged in with `npm login`
- [ ] Updated author in package.json
- [ ] Checked package name availability
- [ ] Built project with `npm run build`
- [ ] Tested with `npm pack` and local install
- [ ] Published with `npm publish`
- [ ] Verified on npmjs.com
- [ ] Tested installing with `npm install -g`

## Example: Complete First Publish

```bash
# 1. Setup
npm login

# 2. Update package.json author field (use your editor)

# 3. Build and test
npm run build
npm pack
npm install -g ./claude-model-switcher-1.0.0.tgz
model-switcher list
npm uninstall -g claude-model-switcher

# 4. Publish
npm publish

# 5. Test the published version
npm install -g claude-model-switcher
model-switcher --help

# Success! Your package is now public
```

## After Publishing

Share your package:
- Tweet about it
- Post on Reddit (r/node, r/programming)
- Share on LinkedIn
- Add badges to README.md
- Submit to awesome lists

Your package URL will be:
**https://www.npmjs.com/package/claude-model-switcher**
