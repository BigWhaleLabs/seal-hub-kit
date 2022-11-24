import { Provider } from '@ethersproject/abstract-provider'
import { utils } from 'ethers'
import { createHub } from './sealHub'

const transferEventInterface = new utils.Interface([
  `event CommitmentCreated(uint256 commitmentId, bytes32 merkleRoot)`,
])

function parsePostLogData({
  data,
  topics,
}: {
  data: string
  topics: string[]
}) {
  return transferEventInterface.parseLog({ data, topics })
}

export async function fetchCommitments(provider: Provider) {
  const sealHub = createHub(provider)

  const transactions = await sealHub.queryFilter(
    sealHub.filters.CommitmentCreated()
  )

  return transactions
    .map(({ data, topics }) => parsePostLogData({ data, topics }))
    .map(({ args }) => args.commitmentId)
    .map((commitment) => commitment.toBigInt())
}
