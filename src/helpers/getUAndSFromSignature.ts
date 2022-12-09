import * as BN from 'bn.js'
import { SECP256K1_N, secp256k1 } from './constants'
import { hashPersonalMessage } from '@ethereumjs/util'
import { splitToRegisters } from './splitToRegisters'
import { utils } from 'ethers'

export function getUAndSFromSignature(signature: string, message: string) {
  const msgHash = hashPersonalMessage(Buffer.from(message))
  const { r, s } = utils.splitSignature(signature)
  const biR = new BN(r.slice(2, r.length), 'hex')
  const hexS = s.slice(2, s.length)
  const rInv = new BN(biR).invm(SECP256K1_N)
  const w = rInv.mul(new BN(msgHash)).neg().umod(SECP256K1_N)
  const U = secp256k1.curve.g.mul(w)
  return {
    U: [splitToRegisters(U.x), splitToRegisters(U.y)],
    s: [splitToRegisters(hexS)],
  }
}
