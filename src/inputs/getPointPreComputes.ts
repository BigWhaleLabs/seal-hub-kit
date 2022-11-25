import * as BN from 'bn.js'
import { ExtendedBasePoint } from '../models/ExtendedBasePoint'
import { NUM_STRIDES, STRIDE, secp256k1 } from './constants'
import { splitToRegisters } from './splitToRegisters'

export function getPointPreComputes(point: ExtendedBasePoint) {
  const keyPoint = secp256k1.keyFromPublic({
    x: Buffer.from(point.x.toString(16).padStart(64, '0'), 'hex').toString(
      'hex'
    ),
    y: Buffer.from(point.y.toString(16).padStart(64, '0'), 'hex').toString(
      'hex'
    ),
  })

  const gPowers = [] as string[][][][]
  for (let i = 0n; i < NUM_STRIDES; i++) {
    const stride: string[][][] = []
    const power = 2n ** (i * STRIDE)
    for (let j = 0n; j < 2n ** STRIDE; j++) {
      const l = j * power

      const gPower = keyPoint
        .getPublic()
        .mul(new BN(l.toString())) as ExtendedBasePoint
      const x = splitToRegisters(gPower.x)
      const y = splitToRegisters(gPower.y)
      stride.push([x, y])
    }
    gPowers.push(stride)
  }

  return gPowers
}
