# Nodeapp-count-visits.

## Introduction.

This is a simple nodejs applicaton which counts the number of visits to the page and stores the count in local redis-server and nginx is used as reverse proxy to access application.

## Prerequisites.

* Docker daemon on standalone server.

## How it Works?

Application will be running as 3 different containers in server and containers can access each other with localhost/server-ip as we use HOST network while docker run, which also allows us to access the application running inside the container from server itself.

Custom images are built to make some required modification by pulling offical images from docker hub, we have two dockerfiles (nginxdockerfile, nodedockerfile) to build images. please go through the dockerfiles for more info.

Below are the commands to setup application.

## Commands to build and setup application.

  Please clone the git repo and run the commands from the same repository in your server and at the end you will be able to access the application on http://localhost

  * Build Docker image for node 
  
  ```
  docker build -f nodedockerfile -t node-12.5.0:redis .
  ```
  
  * Build Docker image for nginx
  
  ```
  docker build -f nginxdockerfile -t nginx-1.16.0:nodeapp .
  ```
  
  * Run all 3 apps
  
  ```
  docker run -it -d --name my-redis-app --network host redis:5.0.4
  docker run -it -d --name my-node-app --network host  -w /usr/src/app node-12.5.0:redis node myscript.js
  docker run -it -d --name my-nginx-app --network host nginx-1.16.0:nodeapp
  
  ```

 
  * Commands to get versions of nginx/nodejs/redis
  
  ```
  docker exec -it my-nginx-app nginx -v
  docker exec -it my-node-app node --version
  docker exec -it my-redis-app redis-server --version
  ```

  * Multiple hits on the application
  
  ```
  for i in {1..25}; do curl localhost; done
  
  ```
        
  * Command to get the count of the visits from redis server
  
  ```
  redis-cli GET visits
  
  ```

## References.

https://www.c-sharpcorner.com/UploadFile/dacca2/node-js-in-action-implement-visit-counter-in-node-js/

https://www.sitepoint.com/using-redis-node-js/

https://github.com/nodejs/docker-node/blob/master/README.md#how-to-use-this-image
