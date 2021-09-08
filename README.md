# PAPI-TODO - Partners API Example App
​
### Disclaimer
This is an example project crafted with the sole purpose to show how the Tokeet Partner API can be integrated within a webapp. It is not recommended to use this code, or parts of it, in a production application. The contents of this repository has not been reviewed for security issues or other possible eploits. This repository does not implement some known best practicies.
​
### Stack
* Customized [Vue.js TodoMVC Example](https://todomvc.com/examples/vue/):
    * match Partners API data schema
    * tasks storage based on [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and `/tasks/*` API.
* Custom built login.html page with big "login" button.
* [Express.js](https://expressjs.com)
    * cookie based authentication. (cookie name is "AuthToken")
    * `/auth/*` - authentication routes
    * `/tasks/*` - Tasks API (for authenticated users only)
    * `/` - if cookie set - respond with `./public/index.html` (vue.js application)  
    `/` if cookie isn't set - redirect to `/login.html`
    * `/*` - serve static files (ui) from `./public` or die with 404.
​
### Configuration
Create a `.env` file in this project root folder. (Example - `./env-example`)
​
variable           | description
-------------------|------------------------
PAPI_ENDPOINT      | Partners API endpoint (https://papi.tokeet.com)
PAPI_CLIENT_ID     | App ID (replace with your app id from [Partners Portal](https://partners.tokeet.com))
PAPI_CLIENT_SECRET | App Secret (example value is fake, replace with your secret)
TODOAPP_HOST       | Webapp url (https://papi-todo.wtf for production).
​
### How to run
​
#### local server
​
This is a `node.js` application, so you might want to install `node.js` (at least version 14). 
​
```bash
npm install
npm start
DEBUG=* npm start  # verbose logging
```
​
Server will start listening on localhost:3000
​
#### local docker
​
Install docker-compose (if it is not built into docker yet).
​
```bash
docker-compose up --build papi-todo-app
```
​
Consider using [localtunnel](https://theboroer.github.io/localtunnel-www/) to make your local web service available from internet.
​
#### cloud docker
​
* Edit `./docker-compose.yml` file with respect to your application settings. Use different domain name and email.
* Configure your docker cli to point to your cloud provider. I'm using [Docker Machine](https://docs.docker.com/machine/) for this.
* Deploy using next command
    ```bash
    docker-compose up
    ```