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
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { ValidationPipe } from '../../pipe/validation.pipe'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('role')
@ApiBearerAuth()
@Controller('role')
@UseGuards(AuthGuard('jwt'))
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiBody({ description: '请求示例', type: CreateRoleDto })
  @ApiOperation({ summary: '新增角色' })
  create(@Body() createRoleDto: RoleItemDto) {
    return this.roleService.create(createRoleDto)
  }

  @Get()
  @ApiOperation({ summary: '角色列表-无分页' })
  @ApiResponse({
    status: 200,
    type: RoleItemDto,
    isArray: true,
    description: '响应示例',
  })
  findAll() {
    return this.roleService.findAll()
  }

  @Put()
  @ApiOperation({ summary: '修改角色' })
  @ApiQuery({ name: 'id', description: '角色id' })
  @ApiBody({ type: UpdateRoleDto, description: '请求示例' })
  update(@Query('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto)
  }

  @Delete()
  @ApiOperation({ summary: '删除角色' })
  @ApiQuery({ name: 'id', description: '角色id' })
  remove(@Query('id') id: string) {
    return this.roleService.remove(+id)
  }
}
