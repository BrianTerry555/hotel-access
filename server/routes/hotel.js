let express = require("express");
let hotelRouter = express.Router();
let expressJwt = require("express-jwt");
let settings = require("../config/settings.js");
let authorization = expressJwt({secret: settings.secret});


hotelRouter.get("/events", (req,res)=>{
  res.status(200).send({
    "message": "Here are the events at the hotel",
    data: [
      {
      checkIn: "11:00 AM",
      checkOut: "4:00 PM",
      title: "Breakfast",
      description: "French Toast"
      },
      {
      checkIn: "12:00 AM",
      checkOut: "5:00 PM",
      title: "Lunch",
      description: "Eggs from Platypus"
      },
    ]
  });
});

hotelRouter.get("/guests", authorization, (req,res)=>{
  res.status(200).send({
    "message": "Here are the guests at the hotel",
    data: [
    {
      firstName: "Caleb",
      lastName: "Black",
      roomNumber: 4
    },
    {
      firstName: "Sarah",
      lastName: "Baldwin",
      roomNumber: "Penthouse"
    }
  ]});
});

module.exports = hotelRouter;
