import * as BN from 'bn.js'
import { REGISTERS } from './constants'
import { addHexPrefix } from './addHexPrefix'

export function splitToRegisters(value?: BN | string) {
  const registers = [] as bigint[]

  if (!value) {
    return ['0', '0', '0', '0']
  }
  const hex = value.toString('hex').padStart(64, '0')
  for (let k = 0; k < REGISTERS; k++) {
    // 64bit = 16 chars in hex
    const val = hex.slice(k * 16, (k + 1) * 16)

    registers.unshift(BigInt(addHexPrefix(val)))
  }

  return registers.map((el) => el.toString())
}
