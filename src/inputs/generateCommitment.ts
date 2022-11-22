import { recoverPublicKey } from '@ethersproject/signing-key'
import { utils } from 'ethers'
import { generateCommitment } from './generateCommitmentByInput'
import { generateSignatureInputs } from './generateSignatureInputs'

export async function generateCommitmentBySignature(
  signature: string,
  message: string
) {
  const signatureInputs = await generateSignatureInputs(signature, message)
  const msgHash = utils.hashMessage(message)
  const msgHashBytes = utils.arrayify(msgHash)
  const publicKey = recoverPublicKey(msgHashBytes, signature)

  return generateCommitment(signatureInputs, publicKey)
}
