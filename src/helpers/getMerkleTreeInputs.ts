import { BigNumber } from 'ethers'
import { getMerkleTreeProof } from './getMerkleTreeProof'

export async function getMerkleTreeInputs(
  commitment: bigint,
  commitments: bigint[]
) {
  const proof = await getMerkleTreeProof(commitment, commitments)

  return {
    pathIndices: proof.pathIndices,
    siblings: proof.siblings.map(([s]) => BigNumber.from(s).toHexString()),
  }
}
