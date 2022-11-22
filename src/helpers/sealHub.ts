import { SealHub__factory } from '@big-whale-labs/seal-hub-contract'
import { Provider } from '@ethersproject/abstract-provider'

export const SEAL_HUB_CONTRACT_ADDRESS =
  '0x812c83CD01b59bBcd4d29950D99fcBee9354adD7'

export function createHub(provider: Provider) {
  return SealHub__factory.connect(SEAL_HUB_CONTRACT_ADDRESS, provider)
}
