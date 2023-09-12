const express = require("express")
const fs = require('fs')
const path=require('path')
const bodyParser = require("body-parser")
const HttpError = require("./models/http-errors")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["Authorization", "Content-Type"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 86400,
  })
)



const artistRoutes = require("./routes/artistRoutes")
const usersRoutes = require("./routes/usersRoutes")
const messageRoutes = require("./routes/messageRoutes")
const adminRoutes = require("./routes/adminRoutes")

app.use(bodyParser.json())

app.use('/uploads/images',express.static(path.join('uploads','images')))

app.use("/api/artists", artistRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/message", messageRoutes)

app.use((req, res, next) => {
  const error = new HttpError("cannot find this url path", 404)
    return next(error);
})

app.use((error, req, res, next) => {
  if (req.file)
  {
    fs.unlink(req.file.path, err => {
      console.log(err)
    })
  }
    if (res.headerSent) {
    return next(error)
  }
  res.status(error.code || 500)
  res.json({ message: error.message || "An unknown error occurred!" })
})




mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.74thgvu.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000)
    console.log("database connected")
  })
  .catch((err) => {
    console.log(err)
  })





//   const express = require("express")
//   const fs = require("fs")
//   const path = require("path")
//   const bodyParser = require("body-parser")
//   const HttpError = require("./models/http-errors")
//   const mongoose = require("mongoose")
//   const cors = require("cors")

//   const app = express()
//   const httpServer = require("http").createServer(app) // Create an HTTP server

//   const io = require("socket.io")(httpServer) // Initialize Socket.IO with the HTTP server

//   // ... (your existing code)

//   app.use(
//     cors({
//     origin: "http://localhost:3000",
//     allowedHeaders: ["Authorization", "Content-Type"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//     maxAge: 86400,
//   })
//   )

//    const artistRoutes = require("./routes/artistRoutes")
// const usersRoutes = require("./routes/usersRoutes")
// const messageRoutes = require("./routes/messageRoutes")
// const adminRoutes = require("./routes/adminRoutes")

// app.use(bodyParser.json())

// app.use('/uploads/images',express.static(path.join('uploads','images')))

// app.use("/api/artists", artistRoutes)
// app.use("/api/users", usersRoutes)
// app.use("/api/admin", adminRoutes)
// app.use("/api/message", messageRoutes)

// app.use((req, res, next) => {
//   const error = new HttpError("cannot find this url path", 404)
//     return next(error);
// })

// app.use((error, req, res, next) => {
//   if (req.file)
//   {
//     fs.unlink(req.file.path, err => {
//       console.log(err)
//     })
//   }
//     if (res.headerSent) {
//     return next(error)
//   }
//   res.status(error.code || 500)
//   res.json({ message: error.message || "An unknown error occurred!" })
// })


//   // Socket.IO implementation
//   io.on("connection", (socket) => {
//     console.log("A user connected")

//     // Example socket event
//     socket.on("message", (data) => {
//       console.log("Received message:", data)
//       io.emit("message", data) // Broadcast the message to all connected clients
//     })

//     socket.on("disconnect", () => {
//       console.log("User disconnected")
//     })
//   })

//   // ... (your existing error handling middleware)

//   mongoose
//     .connect(
//       "mongodb+srv://sachin:Seel7rmyuKcMandn@cluster0.74thgvu.mongodb.net/grabArts?retryWrites=true&w=majority"
//     )
//     .then(() => {
//       httpServer.listen(5000, () => {
//         console.log("Server is running on port 5000")
//       })
//       console.log("Database connected")
//     })
//     .catch((err) => {
//       console.log(err)
//     })
