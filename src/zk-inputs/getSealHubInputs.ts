import { getTPreComputesFromSignature } from '../helpers/getTPreComputesFromSignature'
import { getUAndSFromSignature } from '../helpers/getUAndSFromSignature'

export function getSealHubInputs(signature: string, message: string) {
  const { U, s } = getUAndSFromSignature(signature, message)
  const { TPreComputes } = getTPreComputesFromSignature(signature)
  // Return the result
  return {
    TPreComputes,
    U,
    s,
  }
}
