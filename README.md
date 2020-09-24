# Todo App

To-do App with authentication and tasks grouped by projects, which can be created, read, updated, deleted, and completed using Create-react-app, Axios, Nodejs, Express, Mongoose, and JSON Web Tokens. [Demo](https://todoappreactnodejs.netlify.app/)

### Installation

-   Git clone this repo [here](https://github.com/luisccode/TodoApp-react-nodejs).
-   Move into the folder from your terminal:

```sh
    cd TodoApp-react-nodejs
```

-   Run `yarn` or `npm install` inside the client and server folders to install all dependencies.
-   Get your own MongoDB Atlas Database [here](https://www.mongodb.com/cloud/atlas).
-   Add the Database url to your variables.env file.
-   Add the secret key for JSON web tokens to your variables.env file.

```
# server/variables.env file
DB_MONGO=your_mongodb_atlas_database_url
SECRET_KEY=your_secret_key
```

-   Add the backend url to your .env file.

```
# client/.env.development.local file
REACT_APP_BACKEND_URL=http://localhost:4000
```

-   Start the react development server: `cd client && yarn start`.
-   Start the nodejs server: `cd server && yarn run dev`.
