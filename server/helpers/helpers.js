import jwt from 'jsonwebtoken';

class Helper {
  static generateToken(user) {
    const token = jwt.sign(
      {
        user,
      },
      process.env.SECRET,
      { expiresIn: '24hrs' },
    );
    return token;
  }
}
export default Helper;
