import { Provider } from '@ethersproject/abstract-provider'
import { connectSealHub } from './connectSealHub'
import { utils } from 'ethers'

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

export async function fetchAllCommitments(provider: Provider) {
  const sealHub = connectSealHub(provider)

  const transactions = await sealHub.queryFilter(
    sealHub.filters.CommitmentCreated()
  )

  return transactions
    .map(({ data, topics }) => parsePostLogData({ data, topics }))
    .map(({ args }) => args.commitmentId)
    .map((commitment) => commitment.toBigInt())
}
