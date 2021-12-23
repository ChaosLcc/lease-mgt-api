import { applyDecorators, Type } from '@nestjs/common'
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger'
import { ResponseObjDto } from '../logical/content/dto/content.dto'

export const ApiObjResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        title: '响应示例',
        allOf: [
          { $ref: getSchemaPath(ResponseObjDto) },
          {
            properties: {
              code: { type: 'number', default: '0' },
              msg: { type: 'string', default: 'success' },
              data: {
                $ref: getSchemaPath(model),
              },
            },
          },
        ],
      },
    }),
  )
}
