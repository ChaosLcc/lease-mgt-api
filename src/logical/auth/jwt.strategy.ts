/**
 * @name: jwt.strategy
 * @author: liubi_chaos_g
 * @date: 2021-12-20 09:30
 * @description：jwt.strategy
 * @update: 2021-12-20 09:30
 */
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { jwtConstants } from './constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    })
  }

  // JWT验证 - step4: 被守卫调用
  async validate(payload: any) {
    console.log('JWT验证 - step4: 被守卫调用')
    return { userId: payload.id, username: payload.username, trueName: payload.trueName, nickname: payload.nickname, role: payload.role }
  }
}
