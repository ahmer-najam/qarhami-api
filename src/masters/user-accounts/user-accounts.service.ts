import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { LoginDto, UserAccounts } from './user-accounts.entity';
import { ObjectId } from 'mongodb';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserAccountsService {
  constructor(
    @InjectRepository(UserAccounts)
    private readonly userAccountsRepo: MongoRepository<UserAccounts>,
  ) {}

  async getAllData() {
    return await this.userAccountsRepo.find();
  }

  async getDataById(id) {
    let _result = await this.userAccountsRepo.findOneBy({
      where: { _id: new ObjectId(id) },
    });
    return _result;
  }

  async saveData(body: UserAccounts) {
    body.updatedAt = new Date();
    let _user = await this.userAccountsRepo.findOneBy({
      where: { $or: [{ email: body.email }, { userName: body.userName }] },
    });

    if (_user) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'User already exists',
        error: 'Bad Request',
      });
    }

    //Hash and salt password
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);

    if (!body.id) {
      body.createdAt = new Date();
      return await this.userAccountsRepo.save(body);
    } else {
      let _result = await this.userAccountsRepo.update(body.id, body);
      return body;
    }
  }

  async login(loginData: LoginDto) {
    let _user = await this.userAccountsRepo.findOneBy({
      where: { email: loginData.email },
    });

    if (!_user) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Invalid credentials',
        error: 'Unauthorized',
      });
    } else {
      const isPasswordValid = await bcrypt.compare(
        loginData.password,
        _user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException({
          statusCode: 401,
          message: 'Invalid credentials',
          error: 'Unauthorized',
        });
      }
    }

    console.log(process.env.SECRET_KEY);

    const token = await this.generateToken(_user);
    return { token: token };
  }

  async generateToken(user: UserAccounts): Promise<string> {
    const payload = {
      role: user.role,
      email: user.email,
      userName: user.userName,
    };

    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
  }
}
