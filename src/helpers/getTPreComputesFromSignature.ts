import * as BN from 'bn.js'
import { ExtendedBasePoint } from '../models/ExtendedBasePoint'
import { SECP256K1_N, secp256k1 } from './constants'
import { getPointPrecomputes } from './getPointPrecomputes'
import { splitToRegisters } from './splitToRegisters'
import { utils } from 'ethers'

export function getTPrecomputesFromSignature(signature: string) {
  const { v, r } = utils.splitSignature(signature)
  const biV = BigInt(v)
  const biR = new BN(r.slice(2, r.length), 'hex')
  const isYOdd = (biV - BigInt(27)) % BigInt(2)
  const rPoint = secp256k1.keyFromPublic(
    secp256k1.curve.pointFromX(new BN(biR), isYOdd).encode('hex'),
    'hex'
  )
  const rInv = new BN(biR).invm(SECP256K1_N)
  const T = rPoint.getPublic().mul(rInv) as ExtendedBasePoint
  const rPointPublic = rPoint.getPublic() as ExtendedBasePoint
  const TPrecomputes = getPointPrecomputes(T)
  return {
    TPrecomputes,
    T: [splitToRegisters(rPointPublic.x), splitToRegisters(rPointPublic.y)],
  }
}
