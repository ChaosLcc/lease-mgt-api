import { Injectable } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Logger } from '../../utils/log4js'
import { encryptPassword, makeSalt } from '../../utils/cryptogram'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto)
  }

  findAll() {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.role = role.id')
      .printSql()
      .getMany()
    // return this.userRepository.find({ relations: ['role'] })
  }

  async findOne(username: string) {
    return await this.userRepository.findOne({ username })
    // return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto)
    // return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.userRepository.delete(id)
    // return `This action removes a #${id} user`;
  }

  async register(reqBody: CreateUserDto) {
    if (reqBody.password !== reqBody.repassword) {
      return {
        code: 400,
        msg: '两次密码输入不一致',
      }
    }
    const user = await this.findOne(reqBody.username)
    if (user) {
      return { code: 400, msg: '用户已存在' }
    }
    const salt = makeSalt() // 制作密码盐
    reqBody.password = encryptPassword(reqBody.password, salt)
    reqBody.passwordSalt = salt
    try {
      await this.create(reqBody)
      return { code: 200, msg: 'Success' }
    } catch (e) {
      Logger.error(e)
      return { code: 503, msg: `Service error: ${e}` }
    }
  }
}
