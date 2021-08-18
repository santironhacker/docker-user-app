# commands

## create docker network
docker network create mongo-network

## start mongodb
docker run -d \
-p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=admin \
--net mongo-network \
--name mongodb \
mongo

## start mongodb-express
docker run -d \
-p 8081:8081 \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
-e ME_CONFIG_MONGODB_ADMINPASSWORD=admin \
-e ME_CONFIG_MONGODB_SERVER=mongodb \
--net mongo-network \
--name mongodb \
mongo

## use docker-compose
docker-compose -f mongo.yaml up / down

## list networks
docker network ls

## build an image with dockerfile
docker build -t my-app:1.0 .
docker build -t my-app:1.0 (this is a name and a tick) . (location: build an image using this dockerfile)
Be aware whenever you alter a Dockerfile you need to rebuild the image. You need to first delete the container!

## list images
docker images

## remove image
docker rmi id_image

## open interactive terminal
docker exec -it container_id /bin/bash (or try with /bin/sh if it does not work because some containers do not have bash installed)

## look for environmental variables (inside the terminal bash)
env