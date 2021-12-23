import { applyDecorators, Type } from '@nestjs/common'
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger'
import {
  PaginatedDto,
  ResponsePaginatedDto,
} from '../logical/content/dto/content.dto'

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        title: '响应示例',
        allOf: [
          { $ref: getSchemaPath(ResponsePaginatedDto) },
          {
            properties: {
              code: { type: 'number', default: '0' },
              msg: { type: 'string', default: 'success' },
              data: {
                allOf: [
                  { $ref: getSchemaPath(PaginatedDto) },
                  {
                    properties: {
                      results: {
                        type: 'array',
                        items: { $ref: getSchemaPath(model) },
                      },
                    },
                  },
                ],
                type: 'object',
                items: { $ref: getSchemaPath(PaginatedDto) },
              },
            },
          },
        ],
      },
    }),
  )
}
