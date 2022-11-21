# Seal Hub Kit

## Installation

`yarn add @big-whale-labs/seal-hub-kit`

```
import { generateInputs } from '@big-whale-labs/seal-hub-kit

const inputs = await generateInputs(signatureStringFromMetamaskOrEthers, merkleTreeElements)
```

## Local launch

1. Install dependencies with `yarn`
2. Run the server with `yarn start`

## Available Scripts

- `yarn start` — development mode, rebuilds on changes
- `yarn build` — builds utils
- `yarn release` — create a release and publish the package
- `yarn test` to test error parsers
