import { getCommitmentFromPrecommitment } from './getCommitmentFromPrecommitment'
import { getPrecomputesFromSignature } from '../helpers/getPrecomputesFromSignature'
import { utils } from 'ethers'

export function getCommitmentFromSignature(signature: string, message: string) {
  const precomputes = getPrecomputesFromSignature(signature, message)
  const address = utils.verifyMessage(message, signature)
  return getCommitmentFromPrecommitment({ ...precomputes, address })
}
