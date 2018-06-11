# graphql-apollo-react-setup

This is GraphQL - Apollo - React setup

To run this application, execute the following commands:

  1. Install npm modules

    ```
    $ npm install
    ```

  2. Update Mongo configuration with correct host and user ids in constants.js:

    ```
    export const host = 'mongodb://<host>';
    export const login = {user: '<user>', pass: '<pass>'};
    ```

  3. Run client and backend servers

    ```
    $ npm run all
    ```
