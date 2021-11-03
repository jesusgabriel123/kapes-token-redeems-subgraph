import { Address, BigInt, Bytes, ethereum, log } from '@graphprotocol/graph-ts';
import { Redeem } from '../../generated/schema';
import * as accountsLibrary from './accounts';

export function handleRedeem(
  internalId: BigInt,
  contract: Address,
  accountAddress: Address,
  signerAddress: Address,
  nonce: BigInt,
  amount: BigInt,
  signature: Bytes,
  transaction: ethereum.Transaction,
  block: ethereum.Block
): Redeem {
  let id = internalId.toString().toLowerCase();
  let account = accountsLibrary.getOrCreate(accountAddress);
  let signer = accountsLibrary.getOrCreate(signerAddress);
  let redeem = Redeem.load(id);
  if (redeem === null) {
    redeem = new Redeem(id);
    redeem.contract = contract;
    redeem.account = account.id;
    redeem.signer = signer.id;
    redeem.nonce = nonce;
    redeem.amount = amount;
    redeem.signature = signature;
    redeem.txHash = transaction.hash.toHexString();
    redeem.timestamp = block.timestamp.times(BigInt.fromI32(1000));
    redeem.blockNumber = block.number;
    redeem.save();

    accountsLibrary.redeem(accountAddress, amount);
  } else {
    log.warning(
      "Redeem {} found in txHash {}. New redeem in txHash",
      [
        id,
        transaction.hash.toHexString(),
        redeem.txHash
      ]
    );
  }
  return redeem;
}
