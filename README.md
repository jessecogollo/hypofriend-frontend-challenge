# Hypofriend Code Challenge

* name: Jesse Cogollo

* email: cogollo87@gmail.com

## Build Setup

```bash
# install dependencies
$ yarn install
# serve with hot reload at localhost:3000
$ yarn dev
# run tests
$ yarn test
# build for production and launch server
$ yarn build
$ yarn start
# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

### Would you use a store to manage the states? If so why / why not? What are the benefits here, especially when dealing with a query and handling the response?

* Here it's not needed, because we can pass the data through the props and an emitter. But sure. When the code base is larger, the store should work good enough to avoid mutated data on the way.

### What browsers and devices would you support, and why did you choose these?

* The Evergreen ones. But the answer depends on the stats of our system users. If people actively use our web app, for instance, IE11, we need to support it. But for the requirements, the Evergreen ones should work.

### How would you improve the effectiveness of the tests and possible expand the test coverage?

* In this case, I would add e2e tests, for example, with CypressJS.

#### How would you handle CORs issues? And what would you do to bypass the issues mentioned with our production endpoints?

* The first thing I would do is create a staging/development environment and test the services in the local environment. I would use a service such as [Ngrok](https://ngrok.com/) and, of course, configure the server to allow connections from the URL without getting blocked.

### How would you handle slow responses from the API endpoint? What can you do to ensure that are no issues due to a slow response. This can be both visually and also improve performance.

* Adding a spinner or loading component. Also, Google Chrome allows us to emulate a slow network using the webtool feature in the Network tab to check how our web app works in slow networks.
