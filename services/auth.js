import * as jwt from 'jsonwebtoken';
import config from '../config';
import * as argon2 from 'argon2';
import {
  randomBytes
} from 'crypto';
import userModel from '../models/user';
import fs from 'fs';
import util from 'util';

const readFile = util.promisify(fs.readFile);

export default class AuthService {

  async CheckPasswordSecurity(password) {

    const ref_file = './ref/pwd_10k/10k.txt';

    try {
      let data = await readFile(ref_file)

      if (data.indexOf(password) >= 0) {
        throw new Error('Password Too Common');
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async ChangePassword(req) {
    try {
      const salt = randomBytes(32);

      let old_password = req.old_password;
      let new_password = req.new_password;
      let email = req.email;

      // --------------------------------------------------
      // Validate the old password
      // --------------------------------------------------

      const userRecord = await userModel.findOne({
        email
      });
      
      if (!userRecord) {
        throw new Error('Invalid Email Address');
      }

      const validPassword = await argon2.verify(userRecord.password, old_password);

      if (validPassword) {

        // --------------------------------------------------
        // Set the new password
        // --------------------------------------------------

        await this.CheckPasswordSecurity(new_password);

        const hashedPassword = await argon2.hash(new_password, {
          salt
        });

        userRecord.password = hashedPassword;
        userRecord.save();

        if (!userRecord) {
          throw new Error('User cannot be created');
        }

        const token = this.generateToken(userRecord);
  
        const user = userRecord.toObject();
  
        Reflect.deleteProperty(user, 'password');
        Reflect.deleteProperty(user, 'salt');
  
        return {
          user,
          token
        };

      } else {
        throw new Error ('Invalid Password')
      }
    } catch (e) {
      console.log(e);
      throw e;
    };
  }

  async SignUp(req) {

    try {
      const salt = randomBytes(32);

      const hashedPassword = await argon2.hash(req.password, {
        salt
      });
      const userRecord = await userModel.create({
        ...req,
        salt: salt.toString('hex'),
        password: hashedPassword,
      });

      const token = this.generateToken(userRecord);

      if (!userRecord) {
        throw new Error('User cannot be created');
      }

      const user = userRecord.toObject();

      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');

      return {
        user,
        token
      };

    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async SignIn(email, password) {
    const userRecord = await userModel.findOne({
      email
    });
    if (!userRecord) {
      throw new Error('Invalid Email Address');
    }

    const validPassword = await argon2.verify(userRecord.password, password);

    if (validPassword) {
      const token = this.generateToken(userRecord);

      const user = userRecord.toObject();

      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');

      return {
        user,
        token
      };
    } else {
      throw new Error('Invalid Password');
    }
  }

  generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        _id: user._id,
        role: user.role,
        name: user.name,
        exp: exp.getTime() / 1000,
      },

      config.token,
    );
  }
}