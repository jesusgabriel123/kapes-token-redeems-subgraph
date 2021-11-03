# Subgraph

This is the subgraph to store all the redeem transactions executed in the platform.

## Entities

### Redeem

This entity contains an item per each redeem executed successfully. The ID for each redeem is the internal ID generated in the backend.

If this entity has an item, it means the redeem associated to the internal id was executed successfully, and the tokens were transferred to the user account.

### Account

This entity represents an Ethereum account. Each user account or signer will exist in the entity.

Each time an user redeems the tokens successfully, the total redeemed amount will be increased, and the redeems list will be updated.

## Deploy Subgraph

First of all, connect your Github account in the The Graph website [here](https://thegraph.com/hosted-service/).

Then, create a new subgraph following the steps described in the website. After creating the subgraph, update the subgraph name in the scripts (in file `package.json`):

Examples:

- gh_username/subgraph_name-ropsten
- gh_username/subgraph_name-rinkeby
- gh_username/subgraph_name-mainnet

Finally, update the configuration file located in the folder `config` based on the network where you deployed the RedeemTokensSigner contract (and block number).

Execute the CLI:

`yarn thegraph:deploy:NETWORK --access-token ACCESS_TOKEN`

where:

- NETWORK: select the network where you deployed the new contract.
- ACCESS_TOKEN: copy/paste the access token provided in the TheGraph website after creating the subgraph.

After deploying the subgraph, refresh the website, and it will display the syncing page.
