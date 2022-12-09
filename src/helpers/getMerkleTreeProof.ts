import { IncrementalMerkleTree } from '@zk-kit/incremental-merkle-tree'
import { buildPoseidon } from 'circomlibjs'

export async function getMerkleTreeProof(
  commitment: bigint,
  commitments: bigint[]
) {
  const poseidon = await buildPoseidon()
  const F = poseidon.F
  const tree = new IncrementalMerkleTree(
    (values) => BigInt(F.toString(poseidon(values))),
    30,
    BigInt(0),
    2
  )
  commitments.forEach((c) => tree.insert(c))
  return tree.createProof(tree.indexOf(commitment))
}
