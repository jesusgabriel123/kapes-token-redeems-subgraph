import {
  RedeemCall,
} from '../../generated/RedeemTokensSigner/RedeemTokensSigner';
import { log } from '@graphprotocol/graph-ts';
import * as redeemLibrary from '../utils/redeem';

export function handleRedeem(call: RedeemCall): void {
  log.info(
    "Handle redeem call in tx hash {} with internal id {}",
    [
      call.transaction.hash.toHexString(),
      call.inputs.internalId.toString(),
    ]
  );
  redeemLibrary.handleRedeem(
    call.inputs.internalId,
    call.to,
    call.transaction.from,
    call.inputs.signer,
    call.inputs.nonce,
    call.inputs.amount,
    call.inputs.signature,
    call.transaction,
    call.block
  );
}
