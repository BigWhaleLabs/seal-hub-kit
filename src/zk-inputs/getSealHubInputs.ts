import { getTPrecomputesFromSignature } from '../helpers/getTPrecomputesFromSignature'
import { getUAndSFromSignature } from '../helpers/getUAndSFromSignature'

export function getSealHubInputs(signature: string, message: string) {
  const { U, s, rInv } = getUAndSFromSignature(signature, message)
  const { TPrecomputes, T } = getTPrecomputesFromSignature(signature)
  // Return the result
  return {
    U,
    s,
    TPrecomputes,
    T,
    rInv,
  }
}
