import { getTPrecomputesFromSignature } from '../helpers/getTPrecomputesFromSignature'
import { getUAndSFromSignature } from '../helpers/getUAndSFromSignature'

export function getSealHubInputs(signature: string, message: string) {
  const { U, s, scalarForT, scalarForU } = getUAndSFromSignature(
    signature,
    message
  )
  const { TPrecomputes, T } = getTPrecomputesFromSignature(signature)
  // Return the result
  return {
    U,
    s,
    scalarForT,
    TPrecomputes,
    T,
    scalarForU,
  }
}
