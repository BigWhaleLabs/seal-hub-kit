import { BigNumber } from 'ethers'
import { generateTreeProof } from './generateTreeProof'

export async function generateMerkleTreeInputs(
  commitment: bigint,
  commitments: bigint[]
) {
  const proof = await generateTreeProof(commitment, commitments)

  return {
    pathIndices: proof.pathIndices,
    siblings: proof.siblings.map(([s]) => BigNumber.from(s).toHexString()),
  }
}
