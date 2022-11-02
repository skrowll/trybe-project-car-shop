import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarModel from '../../../models/car.model';
import { Model } from 'mongoose';
import { carMock, carMockWithId, updatedCarMockWithId } from '../../mocks/car.mock';
import { ICar } from '../../../interfaces/ICar';

describe('Car Model', () => {
  const carModel = new CarModel();
  const newCar = {
    _id: '62cf1fc6498565d94eba52cd',
    model: 'Fusca',
    year: 1970,
    color: 'blue',
    buyValue: 5000,
    seatsQty: 5,
    doorsQty: 2,
  };
  const carList = [carMockWithId, newCar];

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves(carList);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(updatedCarMockWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a car', () => {
		it('successfully created', async () => {
			const newCar = await carModel.create(carMock);
			expect(newCar).to.be.deep.equal(carMockWithId);
		});
	});

  describe('searching cars', () => {
    it('successfully found', async () => {
      const carsFound = await carModel.read();
      expect(carsFound).to.be.an('array');
      carsFound?.forEach((car: ICar, index: number) => {
        expect(car).to.be.deep.equal(carList[index]);
      })
    });
  });

  describe('searching a car', () => {
    it('successfully found', async () => {
      const carFound = await carModel.readOne('4edd40c86762e0fb12000003');
      expect(carFound).to.be.deep.equal(carMockWithId);
    });
  
    it('_id not found', async () => {
      try {
        await carModel.readOne('123ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');
      }
    });
  });

  describe('Updating a car', () => {
    it('successfully updated', async () => {
      const updatedCar = await carModel.update('4edd40c86762e0fb12000003', { model: 'Fusca' });
      expect(updatedCar).to.deep.equal(updatedCarMockWithId);
    });

    it('_id not found', async () => {
      let error: any;
      try {
        await carModel.update('123ERRADO', { model: 'Fusca' });
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');
      }     
    });
  });

  describe('deleting a car', () => {
    it('successfully deletion', async () => {
      const carDeleted = await carModel.delete('4edd40c86762e0fb12000003');
      expect(carDeleted).to.be.deep.equal(carMockWithId);
    });
  
    it('_id not found', async () => {
      try {
        await carModel.delete('123ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');
      }
    });
  });

});