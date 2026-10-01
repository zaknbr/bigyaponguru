#!/bin/bash
set -e

echo "🚀 [1/4] Building Bigyaponguru Next.js static production export..."
npm run build

echo "📦 [2/4] Deploying to DigitalOcean Droplet (adguru.smartconverterbd.com)..."
SSH_KEY="/Users/zakaria/.gemini/antigravity/scratch/id_itibritto"
SERVER_IP="159.65.0.214"
REMOTE_PATH="/home/adguru/htdocs/adguru.smartconverterbd.com"

# Sync files
scp -i "$SSH_KEY" -o StrictHostKeyChecking=no -r out/* root@"$SERVER_IP":"$REMOTE_PATH/"

# Fix permissions and reload Nginx
ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no root@"$SERVER_IP" "chown -R adguru:adguru $REMOTE_PATH && chmod -R 755 $REMOTE_PATH && systemctl reload nginx"

echo "🐙 [3/4] Syncing version control with GitHub..."
git add .
if ! git diff-index --quiet HEAD --; then
  COMMIT_MSG="${1:-chore: update and deploy live app}"
  git commit -m "$COMMIT_MSG"
fi
git push origin main

echo ""
echo "✅ [4/4] Deployment Complete!"
echo "🌐 Live URL: https://adguru.smartconverterbd.com"
echo "📂 GitHub:   https://github.com/zaknbr/bigyaponguru"
