# Fritter

Build your own not-quite-[Twitter](https://twitter.com/)!

The project is structured as follows:

- `index.ts` sets up the database connection and the Express server
- `/freet` contains files related to freet concept
  - `collection.ts` contains freet collection class to wrap around MongoDB database
  - `middleware.ts` contains freet middleware
  - `model.ts` contains definition of freet datatype
  - `router.ts` contains backend freet routes
  - `util.ts` contains freet utility functions for transforming data returned to the client
- `/user` contains files related to user concept
  - `collection.ts` contains user collection class to wrap around MongoDB database
  - `middleware.ts` contains user middleware
  - `model.ts` - contains definition of user datatype
  - `router.ts` - contains backend user routes
  - `util.ts` contains user utility functions for transforming data returned to the client
- `/profile` contains files related to profile concept
  - `collection.ts` contains profile collection class to wrap around MongoDB database
  - `middleware.ts` contains profile middleware
  - `model.ts` - contains definition of profile datatype
  - `router.ts` - contains backend profile routes
  - `util.ts` contains profile utility functions for transforming data returned to the client
- `/interaction` contains files related to interaction concept
  - `collection.ts` contains interaction collection class to wrap around MongoDB database
  - `middleware.ts` contains interaction middleware
  - `model.ts` - contains definition of interaction datatype
  - `router.ts` - contains backend interaction routes
  - `util.ts` contains interaction utility functions for transforming data returned to the client
- `/following` contains files related to following concept
  - `collection.ts` contains following collection class to wrap around MongoDB database
  - `middleware.ts` contains following middleware
  - `model.ts` - contains definition of following datatype
  - `router.ts` - contains backend following routes
  - `util.ts` contains following utility functions for transforming data returned to the client
- `/follower_barrier` contains files related to follower barrier concept
  - `collection.ts` contains follower barrier collection class to wrap around MongoDB database
  - `middleware.ts` contains follower barrier middleware
  - `model.ts` - contains definition of follower barrier datatype
  - `router.ts` - contains backend follower barrier routes
  - `util.ts` contains follower barrier utility functions for transforming data returned to the client
- `/public` contains the code for the frontend (HTML/CSS/browser JS)


## API routes

The following api routes have already been implemented for you :

- ```GET /```
    - This renders the `index.html` file that will be used to interact with the backend

# Freet
- ``` GET /api/freets ``` - Get all the freets
    - Returns
        - An array of all freets sorted in descending order by date modified
- ``` GET /api/freets?authorId=id ``` - Get freets by authorId
    - Returns 
        - An array of freets created by user with username `author`
    - Throws 
        - `400` if `author` is not given
        - `404` if `author` is not a recognized username of any user

- ``` POST /api/freets ``` - Create a new freet
    - Body 
        - `content` _{string}_ - The content of the freet
    - Returns
        - A success message
        - A object with the created freet
    - Throws
        - `403` if the user is not logged in
        - `400` If the freet content is empty or a stream of empty spaces
        - `413` If the freet content is more than 140 characters long
- ``` DELETE /api/freets/:freetId? ``` - Delete an existing freet
    - Returns
        - A success message
    - Throws 
        - `403` if the user is not logged in
        - `403` if the user is not the author of the freet
        - `404` if the freetId is invalid
- ```PUT /api/freets/:freetId? ``` - Update an existing freet
    - Body
        - `content` _{string}_ - The new content of the freet
    - Returns
        - A success message
        - An object with the updated freet
    - Throws 
        - `403` if the user is not logged in
        - `404` if the freetId is invalid
        - `403` if the user is not the author of the freet
        - `400` if the new freet content is empty or a stream of empty spaces
        - `413` if the new freet content is more than 140 characters long

# Users
-  ```POST /api/users/session``` - Sign in user
    - Body
        - `username` _{string}_ - The user's username
        - `password` _{string}_ - The user's password
    - Returns 
        - A success message
        - An object with user's details (without password)
    -Throws
        - `403` if the user is already logged in
        - `400` if username or password is not in correct format format or missing in the req
        - `401` if the user login credentials are invalid
- ```DELETE /api/users/session``` - Sign out user
    - Returns 
        - A success message
    - Throws
        - `403` if user is not logged in
- ```POST /api/users``` - Create an new user account
    - Body
        - `username` _{string}_ - The user's username
        - `password` _{string}_ - The user's password
    - Returns
        - A success message
        - An object with the created user's details (without password)
    - Throws
        - `403` if there is a user already logged in
        - `400` if username or password is in the wrong format
        - `409` if username is already in use
- ```PUT /api/users``` - Update a user's profile
    - Body _(no need to add fields that are not being changed)_
        - `username` _{string}_ - The user's username
        - `password` _{string}_ - The user's password
    - Returns
        - A success message
        - An object with the update user details (without password)
    - Throws 
        - `403` if the user is not logged in
        - `400` if username or password is in the wrong format
        - `409` if the username is already in use
- ```DELETE /api/users``` - Delete user
    - Returns
        - A success message
    - Throws
        - `403` if the user is not logged in

# Profile
- ```POST /api/profile``` - Create an new user profile
    - Body
        - `username` _{string}_ - The user profile username
        - `picture` _{string}_ - The user's profile picture
        - `bio`  _{string}_ - The user's profile bio 
    - Returns
        - A success message
        - A profile with the created user's details
    - Throws
        - `403` if the user is not logged in 
        - `409` if username is already in use
        - `413` if the bio is more than 140 characters long
- ```PUT /api/profile``` - Update profile bio for given user profile
    - Body _(no need to add fields that are not being changed)_
        - `bio` _{string}_ - The user's new profile bio
        - `picture` _{string}_ - The user's new profile picture
    - Returns
        - A success message
        - An object with the updated profile
    - Throws 
        - `403` if the user is not logged in
        - `400` if the new bio/picture content is empty or a stream of empty spaces
        - `413` if the new bio content is more than 140 characters long
- ```DELETE /api/profile``` - Delete user profile
    - Returns
        - A success message
    - Throws
        - `403` if the user is not logged in

# Freet Interactions
- ```GET /api/interaction``` - Get all the interactions
    - Returns
        - An array of all the interactions in the database
- ```GET /api/interaction?freetId=id``` - Get interactions by freetID.
    - Returns 
        - An array of interactions created by freet with id, `freetId`
    - Throws 
        - `400` If freetId is not given
        - `403` If the user is not logged in
        - `404` If freet with freetId does not exist
- ```DELETE /api/freet_interaction/:interactionId``` - Delete an interaction
    - Returns
        - A success message
    - Throws
        - `403` If the user is not logged in or is not the author of the interaction
        - `404` if `interactionId` does not exist
- ```POST /api/interaction``` - Create an interaction
    - Body
        - `type` _{string}_ - The interaction type
        - `authorId` _{string}_ - The user profile username
        - `freetId` _{string}_ - The freet ID
        - `content`  _{string}_ - If of type 'reply' then the content otherwise empty 
    - Returns
        - A success message
        - An object with the created interaction
    - Throws
        - `403` if the user is not logged in
        - `404` if `authorId` is not a recognized username of any user
        - `404` if `freetId` is invalid
        - `404` if `type` is not a recognized type of interaction
        - `413` if the new freet interaction content is more than 140 characters long     
- ```PUT /api/interaction/:interactionId? ``` - Update an existing interaction
    - Body
        - `content` _{string}_ - The new content of the reply interaction
    - Returns
        - A success message
        - An object with the updated interaction
    - Throws 
        - `403` if the user is not logged in
        - `404` if the interactionId is invalid
        - `403` if the user is not the author of the freet
        - `400` if the new freet interaction content is empty or a stream of empty spaces
        - `413` if the new freet interaction content is more than 140 characters long
        
# Following
- ```DELETE /api/following/:followingId``` - Delete a following
    - Returns
        - A success message
    - Throws
        - `403` if the user is not logged in
        - `404` if `followingId` does not exist
- ```POST /api/following``` - Create a following
    - Body
        - `follower` _{string}_ - userId who is doing the following
        - `following` _{string}_ - userId who is being followed
    - Returns
        - A success message
        - An object with the created following
    - Throws
        - `403` if the user `follower`  is not logged in
        - `404` if `follower` is not a recognized username of any user
        - `404` if `following` is not a recognized username of any user

# Follower Barrier
- ```DELETE /api/follower_barrier/:fbId``` - Turn off fbState
    - Returns
        - A success message
    - Throws
        - `403` if the user is not logged in
        - `404` if `fbId` does not exist
- ```POST /api/follower_barrier``` - Turn on fbState
    - Body
        - `userId` _{string}_ - userId who is turning on fbState
        - `passcode` _{string}_ - passcode needed to follow a user
    - Returns
        - A success message
        - An object with the created follower barrier
    - Throws
        - `403` if the user `userId`  is not logged in
        - `400` if the new passcode is empty or a stream of empty spaces
        - `413` if the new passcode is more than 10 characters long
- Update passcode
- ```PUT /api/follower_barrier/:fbId? ``` - Update an existing freet interaction
    - Body
        - `passcode` _{string}_ - The new passcode
    - Returns
        - A success message
        - An object with the updated follower barrier
    - Throws 
        - `403` if the user is not logged in
        - `404` if the `fbId` invalid
        - `400` if the new passcode is empty or a stream of empty spaces
        - `413` if the new passcode is more than 10 characters long




