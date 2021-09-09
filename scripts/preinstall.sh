## Preinstall Script to set the appropriate registry
echo "Setting Github NPM Auth Token"
npm config set //npm.pkg.github.com/:_authToken $GITHUB_PACKAGES_TOKEN
npm config set @abdulhannanali:registry https://npm.pkg.github.com/
echo "Github NPM Token Set"