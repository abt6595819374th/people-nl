# people-nl

## How to develop
1. Install nodemon globally:

    $ npm install -g nodemon
    
2. Start the server:

    $ cd server
    $ nodemon index

3. Run unit tests

    $ cd server
    $ npm run test
    
    
## FE app
1. Install angular cli globally

    $ npm install -g angular-cli

2. Start FE dev server

    $ cd client
    $ npm start

3. Run unit tests

    $ cd client
    $ ng test

4. Lint

    $ cd client
    $ ng lint

## How to deploy server side
1. $ cd people-nl
2. $ git pull
3. $ npm install --production # (If dependencies have changed)
4. $ pm2 restart people-nl
