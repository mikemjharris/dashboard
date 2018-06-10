Dashboard
========================

Project to monitor all other projects.

Node express with vue on the front end

`npm install && npm start-dev` To run locally.

To run in prod follow the steps in the `Dockerfile` or just build it and run as a docker container

`docker build . -t dashboard`
`docker run -p 8000:8000 -name dashboard dashboard`
