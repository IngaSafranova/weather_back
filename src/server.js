
import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import cors from "cors";



let config = dotenv.config();

export const API_KEY = process.env.API_KEY;
console.log(API_KEY);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));



app.use(function (req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});


app.post("/weather", function (req, res) {
  
  const url = ` http://api.openweathermap.org/geo/1.0/direct?q=${req.body.city}&limit=5&appid=${process.env.API_KEY}`;

const config = {responseType:'json',
withCredentials: false}

  axios(  url, config ).then(async (response) => {
  const lat = response.data[0].lat
  const lon = response.data[0].lon
   
console.log(lat)

    const response_1 = await axios(`
         https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.API_KEY}`, config);
    return res.json(response_1.data);})

});

app.listen(9000, () => {
  console.log("Server started");
});


