import ads from '../models/adsDb';
import users from '../models/userDb';

class AdsController {
  static postAd(req, res) {
    const newAd = {
      id: ads[ads.length - 1].id + 1,
      createdOn: new Date().toUTCString(),
      owner: req.body.owner,
      email: req.body.email,
      manufacturer: req.body.manufacturer,
      model: req.body.model,
      price: req.body.price,
      state: req.body.state,
      status: req.body.status,
    };
    const userId = users.find(o => o.id === parseInt(newAd.owner, 10));
    if (!userId) {
      return res.status(404).json({
        status: 404,
        error: 'owner not found',
      });
    }
    const user = users.find(e => e.email === newAd.email);
    if (!user) {
      return res.status(404).json({
        status: 404,
        error: 'User not found',
      });
    }

    ads.push(newAd);
    return res.status(201).json({
      status: 201,
      data: {
        id: newAd.id,
        createdOn: new Date().toUTCString(),
        email: req.body.email,
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        price: req.body.price,
        state: req.body.state,
        status: req.body.status,
      },
    });
  }
}

export default AdsController;
