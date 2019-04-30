# tabs-backend
An app for holding your friends accountable for the damn money they owe you

### Requirements
- [NodeJS and npm](https://nodejs.org/en/)
- [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)
- [Docker (Optional)](https://hub.docker.com/search/?type=edition&offering=community)

### Quick Start
in desired directory<br>
`git clone https://github.com/michaelroudnitski/tabs-backend.git`

download project dependencies<br>
`cd tabs-backend`<br>
`npm i`

set up mongo database in docker<br>
`docker pull mongo`<br>
`docker run -d -p 27017-27019:27017-27019 --name tabsmongo mongo`<br>

to get the docker container running simply run<br>
`npm run startmongo`

to interact with mongo without needing to enter the container we can simply use<br>
`mongo localhost`

now run the server with `npm start` and you should be good to go!
