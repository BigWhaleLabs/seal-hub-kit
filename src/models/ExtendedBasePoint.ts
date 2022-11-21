import * as BN from 'bn.js'
import * as elliptic from 'elliptic'

export interface ExtendedBasePoint extends elliptic.curve.base.BasePoint {
  x: BN
  y: BN
}
