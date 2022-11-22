# Seal Hub Kit

## Installation

`yarn add @big-whale-labs/seal-hub-kit`

## Usage

```ts
import * as snarkjs from 'snarkjs'
import { providers, Wallet } from 'ethers'
import {
  generateCommitment,
  generateInputs,
  hasCommitment,
} from '@big-whale-labs/seal-hub-kit'

// Connect the provider with the goerli network
const infuraProvider = new providers.InfuraProvider('goerli')

async function createZKProof() {
  // Create a signature for the message `SealHub verification for <address> by signMessage`
  const wallet = Wallet.createRandom()
  const message = `SealHub verification for ${wallet.address}`
  const signature = await wallet.signMessage(message)

  /*
  Use generateCommitment method to generate the commitment and hasCommitment to check that the commitment has been added to the blockchain

  The commitment is currently being created at https://hub.sealcred.xyz
  */
  const commitment = await generateCommitment(signature, message)
  if (!(await hasCommitment(commitment, infuraProvider))) {
    throw new Error(
      `Commitment: ${commitment} not found in SealHub! You can generate a new commitment at https://hub.sealcred.xyz`
    )
  }

  /*
   Pass the signature, message and the provider into generateInputs

   At the output, you will receive an input for generating proof:
   { r, s, U, TPreComputes, pathIndices, siblings }
  */
  const input = await generateInputs(signature, message, infuraProvider)

  /*
  Now you can use input to generate your own zk proofs

  Follow the link to see how you can use this input: https://github.com/BigWhaleLabs/seal-hub-verifier-template
  */

  return snarkjs.groth16.fullProve(
    input,
    '<path/to/NullifierCreator.wasm>',
    '<path/to/NullifierCreator_final.zkey>'
  )
}
```

## Local launch

1. Install dependencies with `yarn`
2. Run the server with `yarn start`

## Available Scripts

- `yarn start` — development mode, rebuilds on changes
- `yarn build` — builds utils
- `yarn release` — create a release and publish the package
- `yarn test` to test error parsers
