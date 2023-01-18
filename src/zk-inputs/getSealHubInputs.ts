import { getTPrecomputesFromSignature } from '../helpers/getTPrecomputesFromSignature'
import { getUAndSFromSignature } from '../helpers/getUAndSFromSignature'

export function getSealHubInputs(signature: string, message: string) {
  const { U, s } = getUAndSFromSignature(signature, message)
  const { TPrecomputes } = getTPrecomputesFromSignature(signature)
  // Return the result
  return {
    TPrecomputes,
    U,
    s,
  }
}
