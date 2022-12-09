import { Mimc7 } from '../helpers/Mimc7'
import { Precommitment } from '../models/Precommitment'
import { REGISTERS } from '../helpers/constants'

export async function getCommitmentFromPrecommitment(
  precommitment: Precommitment
) {
  const k = Number(REGISTERS)
  const prepHash: (string | bigint)[] = []

  for (let i = 0; i < k; i++) {
    prepHash[i] = precommitment.s[i]
    prepHash[k + i] = precommitment.U[0][i]
    prepHash[2 * k + i] = precommitment.U[1][i]
  }
  prepHash[3 * k] = precommitment.address

  const hashInput = prepHash.flat().map((v) => BigInt(v))
  const mimc7 = await new Mimc7().prepare()

  return mimc7.hash(hashInput)
}
