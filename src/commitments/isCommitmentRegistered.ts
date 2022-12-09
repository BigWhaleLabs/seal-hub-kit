import { Provider } from '@ethersproject/abstract-provider'
import { connectSealHub } from '../helpers/connectSealHub'

export function isCommitmentRegistered(
  commitment: string | bigint,
  provider: Provider
) {
  return connectSealHub(provider).commitmentMap(String(commitment))
}
