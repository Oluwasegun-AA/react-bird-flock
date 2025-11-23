# Publishing Guide

## Pre-Publishing Checklist

Before publishing to npm, ensure:

- ✅ All tests pass: `npm test`
- ✅ Build succeeds: `npm run build`
- ✅ README.md is up to date
- ✅ Version number is correct in package.json
- ✅ LICENSE file exists
- ✅ Repository URL is correct

## First Time Setup

1. **Create npm account** (if you don't have one)

   ```bash
   npm signup
   ```

2. **Login to npm**
   ```bash
   npm login
   ```

## Publishing Steps

### 1. Update Version

Use semantic versioning (major.minor.patch):

```bash
# Patch release (0.1.0 -> 0.1.1) - bug fixes
npm version patch

# Minor release (0.1.0 -> 0.2.0) - new features
npm version minor

# Major release (0.1.0 -> 1.0.0) - breaking changes
npm version major
```

This will:

- Update version in package.json
- Create a git tag
- Commit the change

### 2. Build and Test

The `prepublishOnly` script will automatically run tests and build:

```bash
npm run prepublishOnly
```

Or manually:

```bash
npm test
npm run build
```

### 3. Verify Build Output

Check the `dist/` folder:

```bash
ls -la dist/
```

Should contain:

- `react-bird-flock.js` (ES module)
- `react-bird-flock.umd.cjs` (UMD for CommonJS)
- `index.d.ts` (TypeScript definitions)
- Source maps

### 4. Test the Package Locally (Optional)

```bash
# Create a tarball
npm pack

# This creates react-bird-flock-0.1.0.tgz
# Install it in another project to test
cd ../test-project
npm install ../react-bird-flock/react-bird-flock-0.1.0.tgz
```

### 5. Publish to npm

**Dry run (recommended first time):**

```bash
npm publish --dry-run
```

**Actual publish:**

```bash
npm publish
```

**For scoped packages (if applicable):**

```bash
npm publish --access public
```

### 6. Verify Publication

```bash
# Check package page
npm view react-bird-flock

# Install in test project
npm install react-bird-flock
```

## Version Management Strategy

### Pre-release versions (0.x.x)

- Current: `0.1.0`
- For initial development and testing
- Breaking changes are allowed

### Stable release (1.0.0+)

- After thorough testing and API stabilization
- Follow semantic versioning strictly
- Document breaking changes in CHANGELOG.md

## Updating an Existing Package

```bash
# Make your changes
git add .
git commit -m "feat: add new feature"

# Update version
npm version patch  # or minor/major

# Push changes and tags
git push
git push --tags

# Publish
npm publish
```

## Common Issues

### "You do not have permission to publish"

- Check if package name is available: `npm view react-bird-flock`
- Ensure you're logged in: `npm whoami`
- Package name might be taken - try a scoped package: `@yourusername/react-bird-flock`

### "prepublishOnly script failed"

- Tests are failing - fix them before publishing
- Build is failing - check TypeScript errors

### "Package name too similar"

- npm may block names too similar to existing packages
- Choose a more unique name

## Package Maintenance

### Unpublishing (within 72 hours)

```bash
npm unpublish react-bird-flock@0.1.0
```

⚠️ **Warning**: Unpublishing is permanent and discouraged after 72 hours

### Deprecating a version

```bash
npm deprecate react-bird-flock@0.1.0 "Upgrade to 0.2.0"
```

### Checking download stats

```bash
npm view react-bird-flock
```

Or visit: https://www.npmjs.com/package/react-bird-flock

## CI/CD Publishing (Optional)

For automated publishing with GitHub Actions, create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm test
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Then create an npm token and add it to GitHub Secrets as `NPM_TOKEN`.

## Beta/Alpha Releases

```bash
# Publish as beta
npm version prerelease --preid=beta
npm publish --tag beta

# Users install with
npm install react-bird-flock@beta
```

## Resources

- [npm documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [npm package.json docs](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)
