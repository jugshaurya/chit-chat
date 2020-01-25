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
      - createdBy: username, userPhoto URL
      - createdAt: DateTime
  - [x] Add User Info infront of a message
  - [x] All Individual Person messages

  - [x] Add Online and offline User Firebase

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
  (Solved: How to remount the component instead of re-rendering if a prop if changed for that component).
- https://stackoverflow.com/questions/37444685/store-files-with-unique-random-names && https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  (Solved: storage images are saved with file names that are unique for even same images. Issue #5 solved).

- https://medium.com/@allegra9/add-emoji-picker-to-your-react-chat-app-30d8cbe8d9a6

- [chat wireframe](https://dribbble.com/shots/9593663-Web-Desktop-Chat-App/attachments/1621741?mode=media)

![](chatwireframe.png)
