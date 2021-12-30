import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UsePipes,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common'
import { RoleService } from './role.service'
import { CreateRoleDto, RoleItemDto, UpdateRoleDto } from './dto/role.dto'
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'
import { ValidationPipe } from '../../pipe/validation.pipe'
import { AuthGuard } from '@nestjs/passport'
import { ApiListResponse } from '../../decorator/api-list-response.decorator'

@ApiTags('role')
@ApiBearerAuth()
@Controller('role')
@UseGuards(AuthGuard('jwt'))
@ApiExtraModels(RoleItemDto)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  /**
   * 新增角色
   * @param createRoleDto
   */
  @Post()
  @UsePipes(ValidationPipe)
  @ApiBody({ description: '请求示例', type: CreateRoleDto })
  create(@Body() createRoleDto: RoleItemDto) {
    return this.roleService.create(createRoleDto)
  }

  /**
   * 角色列表-无分页
   */
  @Get()
  @ApiListResponse(RoleItemDto)
  findAll() {
    return this.roleService.findAll()
  }

  /**
   * 修改角色
   * @param updateRoleDto
   */
  @Put()
  @UsePipes(ValidationPipe)
  @ApiBody({ type: UpdateRoleDto, description: '请求示例' })
  async update(@Body() updateRoleDto: UpdateRoleDto) {
    return await this.roleService.update(+updateRoleDto.id, updateRoleDto)
  }

  /**
   * 删除角色
   * @param id
   */
  @Delete()
  @ApiQuery({ name: 'id', description: '角色id' })
  remove(@Query('id') id: string) {
    return this.roleService.remove(+id)
  }
}
