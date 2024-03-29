# SealHub Kit

Set of functions useful when working with the commitments generated by [SealHub](https://hub.sealc.red)

## Available functions

### `getMessage() => string`

Create a message to sign

### `getSealHubValidatorInputs(signature: string, message: string, provider?: Provider, commitments?: (bigint | string)[])`

Generates an input to create a zk proof

**Parameters**

- `message: string` — a message created using the `getMessage()` function
- `signature: string` — signature made by `wallet.signMessage(message)`
- `provider?: Provider` — abstract Ethereum provider
- `commitments?: (bigint | string)[]` — previously added commitments in the contract

**Returns**

```
{
  U: string[][]
  s: string[]
  address: string
  pathIndices: number[]
  siblings: string[]
}
```

**Example**

```ts
import { Wallet, providers } from 'ethers'
import {
  getMessage,
  getSealHubValidatorInputs,
} from '@big-whale-labs/seal-hub-kit'

const provider = new providers.InfuraProvider('goerli')

async function zkInput() {
  const wallet = Wallet.createRandom()
  const message = getMessage()
  const signature = await wallet.signMessage(message)

  return getSealHubValidatorInputs(signature, message, provider)
}

zkInput()
```

### `getSealHubInputs(signature: string, message: string)`

Generates an input to create a commitment's zk proof

**Parameters**

- `signature: string` — signature made by `wallet.signMessage(message)`
- `message: string` — a message created using the `getMessage()` function

**Returns**

```
{
  U: string[][]
  s: string[]
  scalarForT: string[]
  TPrecomputes: string[][][][]
  T: string[][]
  rInv: string[]
}
```

### `getCommitmentFromSignature(signature: string, message: string) => string`

Create a commitment based on the message and signature

**Parameters**

- `signature: string` — signature made by `wallet.signMessage(message)`
- `message: string` — a message created using the `getMessage()` function

**Example**

```ts
import { Wallet } from 'ethers'
import {
  getMessage,
  getCommitmentFromSignature,
} from '@big-whale-labs/seal-hub-kit'

async function createCommitment() {
  const wallet = Wallet.createRandom()
  const message = getMessage()
  const signature = await wallet.signMessage(message)

  return getCommitmentFromSignature(signature, message)
}
```

### `isCommitmentRegistered(commitment: string | bigint, provider: Provider) => boolean`

Checks for a commitment in the SealHub contract

**Parameters**

- `commitment: string | bigint` — hash generated by `getCommitmentFromSignature`
- `provider: Provider` — abstract Ethereum provider

## Available Scripts

- `yarn start` — development mode, rebuilds on changes
- `yarn build` — builds utils
- `yarn release` — create a release and publish the package
