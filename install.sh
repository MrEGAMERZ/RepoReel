#!/bin/bash
set -e

echo "🎬 Installing RepoReel into the current project..."

# Determine current directory
PROJECT_DIR="$PWD"
INSTALL_DIR="$PROJECT_DIR/.reporeel"

# Clone or update the repository locally
if [ -d "$INSTALL_DIR" ]; then
  echo "Updating existing RepoReel installation in $INSTALL_DIR..."
  cd "$INSTALL_DIR"
  git pull origin master --quiet
else
  echo "Cloning RepoReel into $INSTALL_DIR..."
  git clone https://github.com/MrEGAMERZ/RepoReel.git "$INSTALL_DIR" --quiet
fi

# Setup dependencies
echo "Installing dependencies..."
cd "$INSTALL_DIR"
npm install --quiet
npm run build --quiet

# Create a local runner script in the project root
cd "$PROJECT_DIR"
cat << 'EOF' > reporeel
#!/bin/bash
node .reporeel/dist/cli/index.js "$@"
EOF
chmod +x reporeel

# Add to gitignore if not present
if [ -f .gitignore ]; then
  if ! grep -q ".reporeel" .gitignore; then
    echo ".reporeel/" >> .gitignore
    echo "reporeel" >> .gitignore
  fi
fi

echo "✅ RepoReel installed locally, exactly like gstack!"
echo ""
echo "Try it out by typing: ./reporeel launch-video"
