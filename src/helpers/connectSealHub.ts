import { Provider } from '@ethersproject/abstract-provider'
import { SEAL_HUB_CONTRACT_ADDRESS } from '@big-whale-labs/constants'
import { SealHub__factory } from '@big-whale-labs/seal-hub-contract'

export function connectSealHub(provider: Provider) {
  return SealHub__factory.connect(SEAL_HUB_CONTRACT_ADDRESS, provider)
}
