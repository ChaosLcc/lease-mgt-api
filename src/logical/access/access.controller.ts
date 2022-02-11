import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  UseGuards,
} from '@nestjs/common'
import { AccessService } from './access.service'
import {
  AccessItemDto,
  CreateAccessDto,
  UpdateAccessDto,
} from './dto/access.dto'
import { ApiObjResponse } from '../../decorator/api-obj-response.decorator'
import { ApiListResponse } from '../../decorator/api-list-response.decorator'
import { ValidationPipe } from '../../pipe/validation.pipe'
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiTags,
} from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { Logger } from '../../utils/log4js'

@Controller('access')
@ApiTags('access')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiExtraModels(AccessItemDto)
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  /**
   * 新增权限
   * @param createAccessDto
   */
  @Post()
  @ApiObjResponse(AccessItemDto)
  @ApiBody({ description: '新增权限', type: CreateAccessDto })
  @UsePipes(new ValidationPipe())
  create(@Body() createAccessDto: CreateAccessDto) {
    Logger.log(createAccessDto)
    return this.accessService.create(createAccessDto)
  }

  /**
   * 查询所有权限-不分页
   */
  @Get()
  @ApiListResponse(AccessItemDto)
  findAll() {
    return this.accessService.findAll()
  }

  /**
   * 根据id查找权限
   * @param id
   */
  @Get(':id')
  @ApiObjResponse(AccessItemDto)
  findOne(@Param('id') id: string) {
    return this.accessService.findOne(+id)
  }

  /**
   * 根据id修改权限
   * @param id
   * @param updateAccessDto
   */
  @Put(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateAccessDto: UpdateAccessDto) {
    return this.accessService.update(+id, updateAccessDto)
  }

  /**
   * 删除权限
   * @param id
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessService.remove(+id)
  }
}
