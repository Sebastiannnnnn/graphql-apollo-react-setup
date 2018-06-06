# graphql-apollo-react-setup

This is GraphQL - Apollo - React test setup

To run this application, execute the following commands:

  1. Install npm modules

    ```
    $ npm install
    ```

  2. Update Mongo configuration with correct host and user ids in resolvers.js:

    ```
    mongoose.connect('mongodb://<host>', {user: '<user>', pass: '<pass>'})
    ```

  3. Start client side server:

    ```
    $ npm run start
    ```

  4. Start back-end server

    ```
    $ npm run dev
    ```

  5. or start both

    ```
    $ npm run all
    ```
