/**
 * @name: content.dto
 * @author: liubi_chaos_g
 * @date: 2021-12-22 10:57
 * @description：content.dto
 * @update: 2021-12-22 10:57
 */
import { ApiProperty } from '@nestjs/swagger'

export class ContentDto {
  /**
   * 主键
   */
  id: number

  /**
   * 创建时间
   */
  createdDate?: Date

  /**
   * 修改时间
   */
  updatedDate?: Date
}

class ResponseDto {
  @ApiProperty()
  code: number
  @ApiProperty()
  msg: string
}

export class ResponseObjDto<TData> extends ResponseDto {
  @ApiProperty()
  data: TData
}

export class ResponseListDto<TData> extends ResponseDto {
  @ApiProperty()
  data: TData[]
}

export class PaginatedDto<TData> {
  @ApiProperty()
  total: number

  @ApiProperty()
  size: number

  @ApiProperty()
  current: number

  @ApiProperty()
  pages: number

  @ApiProperty()
  results: TData[]
}

export class ResponsePaginatedDto<TData> extends ResponseDto {
  @ApiProperty()
  data: PaginatedDto<TData>
}
