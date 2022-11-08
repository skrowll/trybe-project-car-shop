import { Router } from 'express';
import CarController from '../controllers/car.controller';
import CarModel from '../models/car.model';
import CarService from '../services/car.service';

const carRoute = Router();

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

carRoute.post('/', (req, res) => carController.create(req, res));
carRoute.get('/', (req, res) => carController.read(req, res));
carRoute.get('/:id', (req, res) => carController.readOne(req, res));
carRoute.put('/:id', (req, res) => carController.update(req, res));

export default carRoute;