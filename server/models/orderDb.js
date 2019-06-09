const order = [];

const order1 = {
  id: 1,
  car_id: 1,
  createdOn: '04/01/2016',
  status: 'pending',
  price: 100,
  price_offered: 80,
};

const order2 = {
  id: 2,
  car_id: 2,
  createdOn: '01/01/2017',
  status: 'accepted',
  price: 95,
  price_offered: 95,
};

order.push(order1, order2);
export default order;
