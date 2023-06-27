const express = require("express")

const app = express()

app.use(express.json())


//All Hall data
const hallData = [
    {
      id: "1",
      numberOfSeats: 100,
      amenities: ["Ac", "chairs", "discolights"],
      price: 5000,
      ifBooked: "true",
      customerName: "Sanjay",
      date: "05-feb-2022",
      startTime: "10-feb-2022 at 12PM",
      endTime: "11-feb-2020 at 11am",
      RoomId: 201,
      RoomName: "Duplex",
    },
    {
      id: "2",
      numberOfSeats: 100,
      amenities: ["Ac", "chairs", "discolights"],
      price: 5000,
      ifBooked: "false",
      customerName: "",
      date: "",
      startTime: "",
      endTime: "",
      RoomId: 202,
      RoomName: "Duplex",
    },
    {
      id: "3",
      numberOfSeats: 50,
      amenities: ["Ac", "chairs"],
      price: 3000,
      ifBooked: "false",
      customerName: "",
      date: "",
      startTime: "",
      endTime: "",
      RoomId: 203,
      RoomName: "Classic",
    },
    {
      id: "4",
      numberOfSeats: 100,
      amenities: ["Ac", "chairs", "discolights"],
      price: 5000,
      ifBooked: "true",
      customerName: "Suresh",
      date: "03-feb-2022",
      startTime: "15-feb-2022 at 12PM",
      endTime: "16-feb-2020 at 11am",
      RoomId: 204,
      RoomName: "Duplex",
    },
    {
      id: "5",
      numberOfSeats: 200,
      amenities: ["Ac", "chairs", "discolights", "buffet"],
      price: 9000,
      ifBooked: "true",
      customerName: "Vidhya",
      date: "06-feb-2022",
      startTime: "11-feb-2022 at 12PM",
      endTime: "12-feb-2020 at 11am",
      RoomId: 205,
      RoomName: "Suite",
    },
  ];

app.get("/" , (req, res)=> {
    res.send("welcome to hall booking")
})

//To get all details of halldata
app.get("/hall-detalis" , (req, res)=> {
  res.send(hallData)
})


//To get a details of filtered roomname and booked true
app.get("/hall-detalis/filter", (req, res)=> {
     const {roomtype, ifBooked} = req.query
      console.log(roomtype)
      console.log(ifBooked)
      let filterHalls
      if(roomtype){
          filterHalls = hallData.filter((hall)=>hall.RoomName === roomtype)
          return res.send(filterHalls)
      }
     return res.send(hallData)
})

  // getting specific id
  app.get("hall-details/:id", (req, res)=>{
    const { id } = req.params
    console.log(id)

    const hall = hallData.find((hall) => hall.id === id)
    res.send(hall)
  })

  
// Creating a room with Number of seats available , amenties of room , price 
app.post("/add/hall-detalis", (req, res)=>{

    const newHall = {
          id: hallData.length + 1,
          numberOfSeats: req.body.numberOfSeats,
          amenities:req.body.amenities,
          price:req.body.price
         
    };
    hallData.push(newHall)
    return res.send(hallData)

})

// Book a room with customer Name , Date, Start Time, End Time, Room ID.

app.post("/bookroom", (req, res) => {
  const bookaroom = {
    id: hallData.length + 1,
    customerName: req.body.customerName,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    RoomId: req.body.RoomId
  }
  hallData.push(bookaroom)
    return res.send(hallData)
})

//get filltered hall data
app.get("/hall-detalis", (req, res) => {
  const {roomtype,ifBooked} = req.query;
  console.log(ifBooked)
  let filterHalls
  if (ifBooked){
    filterHalls = hallData.filter((hall) => hall.ifBooked === true)
    return res.send(hallData)
  }
})

//check rooms already booked or not
app.put("/hall-details/:id", (req, res)=>{
  const {id} = req.params;
  const hall = hallData.find((hall)=>hall.id === id);

  if(hall.ifBooked === "true"){
      res.status(400).send("This room is already booked");
      return;
  }else hall.customerName = req.body.customerName;
  hall.date = req.body.date;
  hall.startTime = req.body.startTime;
  hall.endTime = req.body.endTime;
  res.send(hall)
})


app.listen(9000, () => console.log("sever is running localhost:9000"))