import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { encryptPassword } from '../../utils/cryptogram'
import { Logger } from '../../utils/log4js'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // JWT验证 - step 2: 校验用户信息
  async validateUser(username: string, password: string) {
    console.log('JWT验证 - step 2: 校验用户信息')
    const user = await this.userService.findOne(username)
    if (user) {
      const hashedPassword = user.password
      const salt = user.passwordSalt
      // 通过密码盐, 加密传参, 再与数据库里的比较, 判断是否相等
      const hashPassword = encryptPassword(password, salt)
      if (hashedPassword === hashPassword) {
        return { code: 1, user }
      } else {
        return { code: 2, user: null }
      }
    }
    return { code: 3, user: null }
  }

  // JWT验证 - step 3: 处理 jwt 签证
  certificate(user: any) {
    const payload = {
      userId: user.id,
      username: user.username,
      trueName: user.trueName,
      nickname: user.nickname,
      role: user.role,
    }
    console.log('JWT验证 - step 3: 处理 jwt 签证')
    try {
      const token = this.jwtService.sign(payload)
      return { code: 200, data: { token }, msg: '登录成功' }
    } catch (e) {
      return { code: 600, msg: '账号或密码错误' }
    }
  }
}
