import { Provider } from '@ethersproject/abstract-provider'
import { fetchAllCommitments } from '../helpers/fetchAllCommitments'
import { getCommitmentFromPrecommitment } from '../commitments/getCommitmentFromPrecommitment'
import { getMerkleTreeInputs } from '../helpers/getMerkleTreeInputs'
import { getUAndSFromSignature } from '..'
import { isCommitmentRegistered } from '../commitments/isCommitmentRegistered'
import { utils } from 'ethers'

export async function getSealHubValidatorInputs(
  signature: string,
  message: string,
  provider: Provider
) {
  const { U, s } = getUAndSFromSignature(signature, message)
  const address = utils.verifyMessage(message, signature)
  const commitment = await getCommitmentFromPrecommitment({ U, s, address })
  // Check if commitment is registered
  if (!(await isCommitmentRegistered(commitment, provider))) {
    throw new Error(`Commitment: ${commitment} not found in SealHub!`)
  }
  // Fetch all commitments and construct the Merkle tree
  const commitments = await fetchAllCommitments(provider)
  const merkleTreeInputs = await getMerkleTreeInputs(commitment, commitments)
  // Return the result
  return {
    U,
    s,
    address,
    ...merkleTreeInputs,
    commitmentMerkleRootIndex: commitments.length - 1,
  }
}
