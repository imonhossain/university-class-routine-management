import { User } from '@/entities/User';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      /* eslint-disable node/no-process-env */
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: { user: User }): Promise<User> {
    return payload.user;
  }
}
