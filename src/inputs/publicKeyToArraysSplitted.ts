import * as BN from 'bn.js'
import { addHexPrefix } from './addHexPrefix'
import { splitToRegisters } from './splitToRegisters'

export function publicKeyToArraysSplitted(publicKey: string) {
  const x = splitToRegisters(
    new BN(BigInt(addHexPrefix(publicKey.slice(4, 4 + 64))).toString())
  )
  const y = splitToRegisters(
    new BN(BigInt(addHexPrefix(publicKey.slice(68, 68 + 64))).toString())
  )

  return [x, y]
}
