const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const UserCar =require("./models/userCar")
const User = require("./models/user");
const Admin=require("./models/admin");

const app = express();

mongoose
  .connect(
    //"mongodb+srv://max:QuBqs0T45GDKPlIG@cluster0-ntrwp.mongodb.net/node-angular?retryWrites=true"
    "mongodb://127.0.0.1:27017/userdb"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/new-users", (req, res, next) => {
  console.log("signup")
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    mobile: req.body.mobile
  });
  user.save();
  res.status(201).json({
    message: "user added successfully"
  });
});

app.post("/api/booking", (req, res, next) => {
  console.log("ho gyi book")
  const usercar = new UserCar({
    id: req.body.id,
    username: req.body.username,
    dfrom: req.body.dfrom,
    dto: req.body.dto
  });
  usercar.save();
  res.status(201).json({
    message: "userCar added successfully"
  });
});

app.post("/api/users",(req, res, next)=>{
  console.log("find")
  User.findOne({username:req.body.username}).then(documents =>{
    if(documents)
    {
      
      if(documents.password==req.body.password)
      {
        res.status(200).json({
          message:1
        });
      }
    }
  });
});


app.post("/api/admins", (req, res, next) => {
  const record = new Admin({
    id: req.body.id,
    name: req.body.name,
    suv: req.body.suv,
    type: req.body.type,
    seater: req.body.seater,
    url: req.body.url,
    price:req.body.price,
    petrol:req.body.petrol,
    from: req.body.from,
    to:req.body.to
  });
  record.save();
  res.status(201).json({
    message: "admin added successfully"
  });
});

app.get("/api/admins", (req, res, next) => {
  Admin.find().then(documents => {
    res.status(200).json({
      message: "cars fetched successfully!",
      records: documents
    });
  });
});

app.get("/api/users", (req, res, next) => {
  User.find().then(documents => {
    res.status(200).json({
      message: "users fetched successfully!",
      posts: documents
    });
  });
});

app.get("/api/booking", (req, res, next) => {
  UserCar.find().then(documents => {
    res.status(200).json({
      message: "user cars fetched successfully!",
      bookings: documents
    });
  });
});

module.exports = app;
