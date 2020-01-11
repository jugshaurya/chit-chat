This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Chit Chat

- a Discord Clone

## Steps :

- [x] Add Firebase
- [x] Add Firebase Auth

  - [x] createUser with username, email and password
  - [x] sign in user with email ad password
  - [x] Add user Avatar(https://api.adorable.io/avatars/285/${email}.png)
  - [x] Add Redux to save user info to store so to use it anywhere required
    - [x] Add loading Screen when user is found or directing to Homepage

- [x] Discord have five sections

  - [ ] 1.  Servers section to store all the user joined servers + user created servers

  - [ ] 2. User Info Section to describe the user data profile

    - [x] Add change Avatar
    - [ ] Show Welcome \${user.displayName}
    - [x] show Avatar
    - [x] Add Sign-out Button

  - [ ] 3. Channels section to store all the channels per server

    - [x] @front-end : add a button to add channels and show form instead of extras area.
    - [x] @firebase : Add channel model to database with properties channel name & channel description regitered under logged in User.
    - [x] @front-end :Show all the available channels on the channel area for a given server
    - [x] Add Active/selected Channel to redux so to get all the messages for active channel.

* [ ] 4. Mesage Board for specific Channel

  - [x] show Current Active Channel Name inside message Board
  - [x] Show all the Active Channel Messages already stored in db
  - [x] Add new Messages form to add new Messages
    - messages Node Structure
      - id
      - channelId
      - message description
      - createdBy: User ID
      - createdAt: DateTime

* [ ] 5. Extras Section to add additional Functionality to the chit chat app
  - [x] Add create Channel Form
  - [x] Add upload File Form and store the image in firebase storage

# Thank

- https://ui-avatars.com/api/?font-size=0.5
- `https://api.adorable.io/avatars/285/${email}.png`
- add attributon to loading.io
- https://loading.io/ -<div>Icons made by <a href="https://www.flaticon.com/authors/itim2101" title="itim2101">itim2101</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

- https://www.geeksforgeeks.org/firebase-realtime-database-with-operations-in-android-with-examples/

- https://spectrum.chat/react/general/how-to-remount-refresh-a-react-component~7119779f-245f-4c1b-bcdb-a01c00cdb1e6
  (Solved: How to remount the component instead of re-rendering if a prop if changed for that component )

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
