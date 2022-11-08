import { Router } from 'express';
import MotorcycleController from '../controllers/motorcycle.controller';
import MotorcycleModel from '../models/motorcycle.model';
import MotorcycleService from '../services/motorcycle.service';

const motorcycleRoute = Router();

const motorcycleModel = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleService);

motorcycleRoute.post('/', (req, res) => motorcycleController.create(req, res));
motorcycleRoute.get('/', (req, res) => motorcycleController.read(req, res));
motorcycleRoute.get('/:id', (req, res) => motorcycleController.readOne(req, res));
motorcycleRoute.put('/:id', (req, res) => motorcycleController.update(req, res));
motorcycleRoute.delete('/:id', (req, res) => motorcycleController.delete(req, res));

export default motorcycleRoute;