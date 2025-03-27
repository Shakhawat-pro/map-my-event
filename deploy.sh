echo "Switching to branch main"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r dist/* root@69.62.105.179:/var/www/69.62.105.179/