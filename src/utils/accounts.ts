import { Address, BigInt } from '@graphprotocol/graph-ts';
import { Account } from '../../generated/schema';

export function getOrCreate(account: Address): Account {
  let id = account.toHexString().toLowerCase();
  let entity = Account.load(id);
  if (entity === null) {
    entity = new Account(id);
    entity.totalRedeemedAmount = BigInt.fromI32(0);
    entity.save()
  }
  return entity;
}

export function redeem(account: Address, amount: BigInt): Account {
  let id = account.toHexString();
  let entity = Account.load(id);
  if (entity === null) {
    entity = new Account(id);
    entity.totalRedeemedAmount = amount;
    entity.save()
  } else {
    entity.totalRedeemedAmount = entity.totalRedeemedAmount.plus(amount);
    entity.save()
  }
  return entity;
}
