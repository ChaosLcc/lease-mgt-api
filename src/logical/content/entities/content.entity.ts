import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import * as moment from 'moment'

/**
 * @name: content
 * @author: liubi_chaos_g
 * @date: 2021-12-18 15:03
 * @description：content
 * @update: 2021-12-18 15:03
 */
export abstract class Content {
  @PrimaryGeneratedColumn({
    comment: '主键id',
  })
  id: number

  @CreateDateColumn({
    name: 'created_date',
    comment: '创建时间',
    transformer: {
      to(value: any): any {
        return value
      },
      from(value: any): any {
        return moment(value as Date).format('YYYY-MM-DD HH:mm:ss')
      },
    },
  })
  createdDate: Date

  @UpdateDateColumn({
    name: 'updated_date',
    comment: '修改时间',
    transformer: {
      to(value: any): any {
        return value
      },
      from(value: any): any {
        return moment(value as Date).format('YYYY-MM-DD HH:mm:ss')
      },
    },
  })
  updatedDate: Date
}
