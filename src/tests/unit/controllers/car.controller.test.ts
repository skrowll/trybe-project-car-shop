import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarModel from '../../../models/car.model';
import CarService from '../../../services/car.service';
import CarController from '../../../controllers/car.controller';
import { NextFunction, Request, Response } from 'express';
import { carMock, carMockWithId } from '../../mocks/car.mock';

describe('Car Controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const req = {} as Request;
  const res = {} as Response;
  const next = (sinon.stub() as unknown) as NextFunction;

  before(async () => {
    sinon.stub(carService, 'create').resolves(carMockWithId);
    sinon.stub(carService, 'readOne').resolves(carMockWithId);
    sinon.stub(carService, 'read').resolves([carMockWithId]);
    sinon.stub(carService, 'delete').resolves(carMockWithId);
    sinon.stub(carService, 'update').resolves(carMockWithId);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a car', () => {
    it('successfully created', async () => {
      req.body = carMock;
      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('searching cars', () => {
    it('successfully found', async () => {

      await carController.read(req, res);
      expect((res.json as sinon.SinonStub).calledWith([carMockWithId])).to.be.true;
    });
  });

  describe('searching a car', () => {
    it('successfully found', async () => {
      req.params = { id: 'a validação é feita na model' }
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('update car', () => {
    it('successfully updated', async () => {
      req.params = { id: carMockWithId._id }
      req.body = carMock
      await carController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('delete car', () => {
		it('successfully deleted', async () => {
			req.params = { id: carMockWithId._id }
      await carController.delete(req, res);

			expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
		});
  });
});
