import users from '../models/userDb';
import Helper from '../helpers/helpers';

const { generateToken } = Helper;

class UserController {
  static signUp(req, res) {
    const newUser = {
      id: users[users.length - 1].id + 1,
      email: req.body.email,
      firstname: req.body.firstname.trim(),
      lastname: req.body.lastname.trim(),
      password: req.body.password.trim(),
      address: req.body.address,
      isAdmin: req.body.isAdmin,
    };
    const token = generateToken(newUser);
    users.push(newUser);
    return res.status(201).json({
      status: 201,
      data: [
        {
          token,
          id: newUser.id,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          email: newUser.email,
        },
      ],
    });
  }
}
export default UserController;
