import { Provider } from '@ethersproject/abstract-provider'
import { createHub } from './sealHub'

export function hasCommitment(commitment: string | bigint, provider: Provider) {
  const sealHub = createHub(provider)

  return sealHub.commitmentMap(String(commitment))
}
