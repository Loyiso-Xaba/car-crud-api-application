import express from 'express';
import cors from 'cors';
import { mostPopularCar } from './mostPupularCar.js';
import {cars} from './carmanagement.js';


const PORT = process.env.PORT || 4020;
const app = express();


app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/api/popular-car', function (req, res) {
    const result = mostPopularCar(cars);
    res.json({ 
      mostPopularCar: result 
    });
  });

app.get('/api/cars', (req, res) => {
  res.json(cars);
});


app.delete('/api/cars/:reg_number', (req, res) => {
    const { reg_number } = req.params;
    const carIndex = cars.findIndex(car => car.reg_number === reg_number);
    if (carIndex !== -1) {
      cars.splice(carIndex, 1);
      res.json({ message: 'Request for deletion of car successful' });
    } else {
      res.json({
           message: 'Request for deletion of car unsuccessful.' });
    }
  });
  


app.post('/api/cars', (req, res) => {
  const newCar = req.body;
  newCar.id = cars.length ? cars[cars.length - 1].id + 1 : 1;
  cars.push(newCar);
  res.json(newCar); 
});


app.listen(4020, function () {
    console.log(`app listening on port ${PORT}`);
});

