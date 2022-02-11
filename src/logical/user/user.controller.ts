import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  UsePipes,
  Put,
} from '@nestjs/common'
import { UserService } from './user.service'
import {
  CreateUserDto,
  UpdateUserDto,
  LoginDto,
  UserItemDto,
  RegisterDto, AddUserDto,
} from './dto/user.dto'
import { AuthService } from '../auth/auth.service'
import { AuthGuard } from '@nestjs/passport'
import { ValidationPipe } from '../../pipe/validation.pipe'
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'
import {
  PaginatedDto,
  ResponseListDto,
  ResponseObjDto,
  ResponsePaginatedDto,
} from '../content/dto/content.dto'
import { ApiPaginatedResponse } from '../../decorator/api-paginated-response.decorator'
import { ApiObjResponse } from '../../decorator/api-obj-response.decorator'
import { ApiListResponse } from '../../decorator/api-list-response.decorator'
import { Logger } from '../../utils/log4js'

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
@ApiExtraModels(
  PaginatedDto,
  UserItemDto,
  ResponseObjDto,
  ResponseListDto,
  ResponsePaginatedDto,
)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '用户列表' })
  @ApiListResponse(UserItemDto)
  // @ApiPaginatedResponse(UserItemDto)
  async findAll() {
    return await this.userService.findAll()
  }

  /**
   * 根据用户名查询用户信息
   * @param username
   */
  @Get()
  // @ApiOperation({ description: '根据用户名查询用户信息' })
  @ApiQuery({ name: 'username', description: '用户名' })
  @ApiObjResponse(UserItemDto)
  async findOne(@Query('username') username) {
    return await this.userService.findOne(username)
  }

  @Put()
  @ApiOperation({ summary: '修改用户信息' })
  @ApiBody({ type: UpdateUserDto })
  @ApiQuery({ name: 'id', description: '用户id' })
  update(@Query('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @ApiParam({ name: 'id', description: '用户id' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }

  @Post('add')
  @UsePipes(new ValidationPipe()) // 使用管道验证数据
  @ApiOperation({ summary: '添加用户' })
  @ApiBody({ type: AddUserDto })
  add(@Body() body: AddUserDto) {
    return this.userService.add(body)
  }

  @Post('register')
  @UsePipes(new ValidationPipe()) // 使用管道验证
  @ApiOperation({ summary: '注册' })
  @ApiBody({ type: RegisterDto })
  register(@Body() body: CreateUserDto) {
    return this.userService.register(body)
  }

  // JWT验证 - step 1: 用户请求登录
  @Post('login')
  @ApiOperation({ summary: '登录' })
  @ApiBody({ description: '用户登录', type: LoginDto })
  async login(@Body() loginParams: LoginDto) {
    console.log('JWT验证 - step 1: 用户请求登录')
    const authResult = await this.authService.validateUser(
      loginParams.username,
      loginParams.password,
    )
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user)
      case 2:
        return { code: 600, msg: '账号或密码错误' }
      default:
        return { code: 600, msg: '查无此人' }
    }
  }
}
