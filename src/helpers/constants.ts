import * as BN from 'bn.js'
import * as elliptic from 'elliptic'

export const secp256k1 = new elliptic.ec('secp256k1')

export const SECP256K1_N = new BN(
  'fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141',
  16
)
export const REGISTERS = 4n
export const STRIDE = 8n
export const NUM_STRIDES = 256n / STRIDE // = 32
