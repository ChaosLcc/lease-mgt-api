import { applyDecorators, Type } from '@nestjs/common'
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger'
import { ResponseListDto } from '../logical/content/dto/content.dto'

export const ApiListResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        title: '响应示例',
        allOf: [
          { $ref: getSchemaPath(ResponseListDto) },
          {
            properties: {
              code: { type: 'number', default: '0' },
              msg: { type: 'string', default: 'success' },
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  )
}
