import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let token = request.header('Authorization');

    if (!token) {
      throw new UnauthorizedException({ message: 'Unauthorized user' });
      // return false;
    }

    try {
      token = token.replace('Bearer ', '');
      const user = await this.jwtService.decode(token);

      if (user == null) {
        throw new UnauthorizedException({ message: 'Unauthorized user' });
        // return false;
      } else {
        if (user.exp < Date.now() / 1000) {
          console.log(user.exp, Date.now());
          throw new BadRequestException({ details: 'Session Expired' });
          return false;
        }

        request.user = user;
        return true;
      }
    } catch (error) {
      return false;
    }
  }
}
