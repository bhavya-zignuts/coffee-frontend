# auto-deploy-staging-backpackers-webapp.sh
cd /apps/coffee/staging-coffee/backpackercars-webapp
git checkout pre-staging
git pull 
docker build -t backpackercars-webapp:stage . 
docker stop backpackercars-webapp-staging && docker rm backpackercars-webapp-staging
docker run -dp 8092:8088 --name backpackercars-webapp-staging --restart unless-stopped backpackercars-webapp:stage

