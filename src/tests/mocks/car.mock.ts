import { ICar } from '../../interfaces/ICar';

const carMock: ICar = {
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
};

const carMockWithId: ICar & { _id: string } = {
  _id: '4edd40c86762e0fb12000003',
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
};

const updatedCarMockWithId: ICar & { _id: string } = {
  _id: '4edd40c86762e0fb12000003',
  model: 'Fusca',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
};

const carMockInvalid: ICar = {
  model: '',
  year: 1500,
  color: 'red',
  buyValue: 3500000,
  seatsQty: 9,
  doorsQty: 8,
};

export { carMock, carMockWithId, updatedCarMockWithId, carMockInvalid };