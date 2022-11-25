import { CommitmentInput } from '../models/SignatureInput'
import { Mimc7 } from '../models/Mimc7'
import { REGISTERS } from './constants'
import { publicKeyToArraysSplitted } from '../helpers/publicKeyToArraysSplitted'

export async function generateCommitmentByInput(
  inputs: CommitmentInput,
  publicKey: string
) {
  const k = Number(REGISTERS)
  const prepHash: string[] = []

  const [x, y] = publicKeyToArraysSplitted(publicKey)

  for (let i = 0; i < k; i++) {
    prepHash[i] = inputs.s[0][i]
    prepHash[k + i] = inputs.U[0][i]
    prepHash[2 * k + i] = inputs.U[1][i]
    prepHash[3 * k + i] = x[i]
    prepHash[4 * k + i] = y[i]
  }

  const hashInput = prepHash.flat().map((v) => BigInt(v))
  const mimc7 = await new Mimc7().prepare()

  return mimc7.hash(hashInput)
}
