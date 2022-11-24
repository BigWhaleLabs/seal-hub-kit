import { Provider } from '@ethersproject/abstract-provider'
import { recoverPublicKey } from '@ethersproject/signing-key'
import { utils } from 'ethers'
import { hasCommitment } from '../helpers/hasCommitment'
import { fetchCommitments } from '../helpers/fetchCommitments'
import { generateCommitmentByInput } from './generateCommitmentByInput'
import { generateMerkleTreeInputs } from './generateMerkleTreeInputs'
import { generateSignatureInputs } from './generateSignatureInputs'

export async function generateInputs(
  signature: string,
  message: string,
  provider: Provider
) {
  const signatureInputs = await generateSignatureInputs(signature, message)
  const msgHash = utils.hashMessage(message)
  const msgHashBytes = utils.arrayify(msgHash)
  const publicKey = recoverPublicKey(msgHashBytes, signature)
  const commitment = await generateCommitmentByInput(signatureInputs, publicKey)

  if (!(await hasCommitment(commitment, provider)))
    throw new Error(`Commitment: ${commitment} not found in SealHub!`)

  const commitments = await fetchCommitments(provider)

  const merkleTreeInputs = await generateMerkleTreeInputs(
    commitment,
    commitments
  )

  return {
    ...signatureInputs,
    ...merkleTreeInputs,
    commitmentMerkleRootIndex: commitments.length - 1,
  }
}
