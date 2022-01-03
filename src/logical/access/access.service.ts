import { Injectable } from '@nestjs/common'
import { CreateAccessDto, UpdateAccessDto } from './dto/access.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Access } from './entities/access.entity'
import { Repository } from 'typeorm'

@Injectable()
export class AccessService {
  constructor(
    @InjectRepository(Access)
    private accessRepository: Repository<Access>,
  ) {}

  create(createAccessDto: CreateAccessDto) {
    return this.accessRepository.save(createAccessDto)
  }

  findAll() {
    return this.accessRepository.find()
  }

  findOne(id: number) {
    return this.accessRepository.findOne(id)
  }

  update(id: number, updateAccessDto: UpdateAccessDto) {
    return this.accessRepository.update(id, updateAccessDto)
  }

  remove(id: number) {
    return this.accessRepository.delete(id)
  }
}
