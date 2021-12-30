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
    createRoleDto.roleValue = `ROLE_${createRoleDto.roleName}`
    return await this.roleRepository.save(createRoleDto)
  }

  async findAll() {
    return await this.roleRepository.find()
  }

  async findOne(id: number) {
    return await this.roleRepository.findOne({ id })
  }

  async update(id: number, updateRoleDto: RoleItemDto) {
    if (updateRoleDto.roleName) {
      updateRoleDto.roleValue = `ROLE_${updateRoleDto.roleName}`
    }
    return await this.roleRepository.update(id, updateRoleDto)
  }

  async remove(id: number) {
    const role = await this.roleRepository.findOne(id)
    if (role) {
      return await this.roleRepository.delete(id)
    } else {
      return '没有该角色'
    }
  }
}
