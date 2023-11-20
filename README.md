# GrabArts
A full stack web application built on MERN .
here when logged in as users we can find many professional and skilled artists. you can order for artwork by choosing your favourite artist and sending your reference image.

For an artist ,he can log in as an artist to the app and can use this app as a social media platform, where he/she can find other skilled artists and find thier work and follow them message them.
also the verified artists can work through the app as an artist and can start recieveing work orders.


# follow these steps for installation

### 1. Clone the repository:

### 2 Redirect to the root folder wher you can find 2 folders called frontend and backend 

### 3 Redirect to client folder
  cd client
  npm install

### 4 redirect to  server folder
 - cd .. 
 - cd client 
 - npm install
 - 
### 5 redirect to  socket folder
 - cd .. 
 - cd socket 
 - npm install

### 5 create an .env file in client folder and add these datas
 - REACT_APP_BACKEND_URL=http://localhost:5000/api
 - REACT_APP_ASSETS_URL=http://localhost:5000
 - REACT_APP_GOOGLE_API_KEY= your google Oauth api key

### 6 add a nodemon.json file in backend folder with following datas
   {"env":{ "MONGO_USER": "username of mongodb",
    "MONGO_PASSWORD": "mongodb cluster password",
    "MONGO_DB": "database name",
    "JWT_KEY":"a random unique code for json web token"}
}
### 7 start client , server and socket folder
  - redirect to each folders and type the command  npm start

### 8 The React app should now be running on http://localhost:3000.
