import { Injectable } from '@nestjs/common'
import { RoleItemDto, UpdateRoleDto } from './dto/role.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Role } from './entities/role.entity'
import { Repository } from 'typeorm'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: RoleItemDto) {
    try {
      createRoleDto.roleValue = `ROLE_${createRoleDto.roleName}`
      return await this.roleRepository.save(createRoleDto)
    } catch (e) {
      console.log(e)
      return void 0
    }
  }

  async findAll() {
    try {
      return await this.roleRepository.find()
    } catch (e) {
      console.log(e)
      return void 0
    }
  }

  async findOne(id: number) {
    try {
      return await this.roleRepository.findOne({ id })
    } catch (e) {
      console.log(e)
      return void 0
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      return await this.roleRepository.update(id, updateRoleDto)
    } catch (e) {
      console.log(e)
      return void 0
    }
  }

  async remove(id: number) {
    try {
      return await this.roleRepository.delete(id)
    } catch (e) {
      console.log(e)
      return void 0
    }
  }
}
