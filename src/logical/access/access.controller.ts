import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common'
import { AccessService } from './access.service'
import { CreateAccessDto, UpdateAccessDto } from './dto/access.dto'

@Controller('access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {
  }

  @Post()
  create(@Body() createAccessDto: CreateAccessDto) {
    return this.accessService.create(createAccessDto)
  }

  @Get()
  findAll() {
    return this.accessService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessService.findOne(+id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAccessDto: UpdateAccessDto) {
    return this.accessService.update(+id, updateAccessDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessService.remove(+id)
  }
}
