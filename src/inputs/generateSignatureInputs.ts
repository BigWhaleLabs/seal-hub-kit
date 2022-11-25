import * as BN from 'bn.js'
import { ExtendedBasePoint } from '../models/ExtendedBasePoint'
import { SECP256K1_N, secp256k1 } from './constants'
import { getPointPreComputes } from './getPointPreComputes'
import { hashPersonalMessage } from '@ethereumjs/util'
import { splitToRegisters } from './splitToRegisters'
import { utils } from 'ethers'

export function generateSignatureInputs(signature: string, message: string) {
  const msgHash = hashPersonalMessage(Buffer.from(message))
  const { v, r, s } = utils.splitSignature(signature)

  const biV = BigInt(v)
  const biR = new BN(r.slice(2, r.length), 'hex')
  const hexS = s.slice(2, s.length)
  const hexR = r.slice(2, r.length)

  const isYOdd = (biV - BigInt(27)) % BigInt(2)
  const rPoint = secp256k1.keyFromPublic(
    secp256k1.curve.pointFromX(new BN(biR), isYOdd).encode('hex'),
    'hex'
  )

  // Get the group element: -(m * r^−1 * G)
  const rInv = new BN(biR).invm(SECP256K1_N)

  // w = -(r^-1 * msg)
  const w = rInv.mul(new BN(msgHash)).neg().umod(SECP256K1_N)
  // U = -(w * G) = -(r^-1 * msg * G)
  const U = secp256k1.curve.g.mul(w)

  // T = r^-1 * R
  const T = rPoint.getPublic().mul(rInv) as ExtendedBasePoint

  const TPreComputes = getPointPreComputes(T)

  return {
    TPreComputes,
    U: [splitToRegisters(U.x), splitToRegisters(U.y)],
    s: [splitToRegisters(hexS)],
    r: [splitToRegisters(hexR)],
  }
}
