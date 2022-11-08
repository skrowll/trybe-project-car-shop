import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarModel from '../../../models/car.model';
import CarService from '../../../services/car.service';
import { carMock, carMockWithId, updatedCarMockWithId, carMockInvalid } from '../../mocks/car.mock';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
		sinon.stub(carModel, 'readOne')
			.onCall(0).resolves(carMockWithId)
			.onCall(1).resolves(null);
    sinon.stub(carModel, 'read').resolves([carMockWithId]);
    sinon.stub(carModel, 'update')
			.onCall(0).resolves(carMockWithId)
			.onCall(1).resolves(null);
      sinon.stub(carModel, 'delete')
    	.onCall(0).resolves(carMockWithId)
    	.onCall(1).resolves(null);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a car', () => {
    it('successfully created', async () => {
      const frameCreated = await carService.create(carMock);

      expect(frameCreated).to.be.deep.equal(carMockWithId);
    });

    it('failure to create', async () => {
      let error;
      try {
        await carService.create(carMockInvalid);
      } catch (err) {
        error = err;
      }
        expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('searching cars', () => {
    it('successfully found', async () => {

      const cars = await carService.read();
      expect(cars).to.be.deep.equal([carMockWithId]);
    });
  });

  describe('searching a car', () => {
    it('successfully found', async () => {
      const carCreated = await carService.readOne(carMockWithId._id);

      expect(carCreated).to.be.deep.equal(carMockWithId);
    });
    it('failure to find', async () => {
      let error;
      try {
        await carService.readOne(carMockWithId._id);
      } catch (err: any) {
        error = err;
      }
      expect(error, "error should not be undefined").not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
    });
  });

  describe('update car', () => {
    it('successfully updated', async () => {
      const car = await carService.update(carMockWithId._id, carMock);
      expect(car).to.be.deep.equal(carMockWithId);
    });

    it('failure to update', async () => {
      let error;
      try {
        await carService.update(carMockWithId._id, carMockInvalid as any);
      } catch (err: any) {
        error = err;
      }
      expect(error).to.be.instanceOf(ZodError);
    });
    it('failure to update', async () => {
      let error;
      try {
        await carService.update(carMockWithId._id, carMock);
      } catch (err: any) {
        error = err;
      }
      expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
    });
  });

  describe('delete car', () => {
		it('successfully deleted', async () => {
			const car = await carService.delete(carMockWithId._id);
			expect(car).to.be.deep.equal(carMockWithId);
		});

		it('failure to delete', async () => {
      let error;
			try {
				await carService.delete(carMockWithId._id);
			} catch (err: any) {
        error = err
			}
      expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
		});
	});

});