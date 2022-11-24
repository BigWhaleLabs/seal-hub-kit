import { generateCommitmentByInput } from './generateCommitmentByInput'
import { generateSignatureInputs } from './generateSignatureInputs'
import { recoverPublicKey } from '@ethersproject/signing-key'
import { utils } from 'ethers'

export function generateCommitment(signature: string, message: string) {
  const signatureInputs = generateSignatureInputs(signature, message)
  const msgHash = utils.hashMessage(message)
  const msgHashBytes = utils.arrayify(msgHash)
  const publicKey = recoverPublicKey(msgHashBytes, signature)

  return generateCommitmentByInput(signatureInputs, publicKey)
}
