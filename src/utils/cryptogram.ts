/**
 * @name: cryptogram
 * @author: liubi_chaos_g
 * @date: 2021-12-18 09:59
 * @description：cryptogram
 * @update: 2021-12-18 09:59
 */
import * as crypto from 'crypto'

/**
 * Make Salt
 */
export function makeSalt(): string {
  return crypto.randomBytes(3).toString('base64')
}

export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) return ''
  const tempSalt = ''
  return crypto.pbkdf2Sync(password, salt, 1000, 16, 'sha1').toString('base64')
}
