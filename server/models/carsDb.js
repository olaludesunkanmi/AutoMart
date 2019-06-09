const cars = [];

const car1 = {
  id: 1,
  owner: 1,
  createdOn: '04/01/2016',
  state: 'new',
  status: 'available',
  price: 100,
  manufacturer: 'Toyota',
  model: 'camry',
  body_type: 'car',
};
const car2 = {
  id: 2,
  owner: 2,
  createdOn: '01/01/2017',
  state: 'used',
  status: 'available',
  price: 95,
  manufacturer: 'Ford',
  model: 'Ranger',
  body_type: 'Truck',
};

const car3 = {
  id: 3,
  owner: 3,
  createdOn: '01/01/2015',
  state: 'new',
  status: 'sold',
  price: 150,
  manufacturer: 'Chevrolette',
  model: 'Equinox',
  body_type: 'car',
};

cars.push(car1, car2, car3);
export default cars;
