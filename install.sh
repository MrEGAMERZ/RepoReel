#!/bin/bash
set -e

echo "🎬 Installing RepoReel from GitHub..."

INSTALL_DIR="$HOME/.reporeel"

# Clone or update the repository
if [ -d "$INSTALL_DIR" ]; then
  echo "Updating existing RepoReel installation..."
  cd "$INSTALL_DIR"
  git pull origin master --quiet
else
  echo "Cloning RepoReel..."
  git clone https://github.com/MrEGAMERZ/RepoReel.git "$INSTALL_DIR" --quiet
fi

# Setup executable
cd "$INSTALL_DIR"
npm install --quiet
npm run build --quiet

# Link globally
sudo ln -sf "$INSTALL_DIR/dist/cli/index.js" /usr/local/bin/reporeel

echo "✅ RepoReel installed successfully!"
echo ""
echo "Try it out by typing: reporeel launch-video"
