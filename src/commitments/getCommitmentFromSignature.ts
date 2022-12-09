import { getCommitmentFromPrecommitment } from './getCommitmentFromPrecommitment'
import { getUAndSFromSignature } from '../helpers/getUAndSFromSignature'
import { utils } from 'ethers'

export function getCommitmentFromSignature(signature: string, message: string) {
  const precomputes = getUAndSFromSignature(signature, message)
  const address = utils.verifyMessage(message, signature)
  return getCommitmentFromPrecommitment({ ...precomputes, address })
}
