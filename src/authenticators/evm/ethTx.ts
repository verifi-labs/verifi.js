import { EthTxAuthenticatorAbi } from './abis/EthTxAuthenticator';
import type {
  Authenticator,
  Envelope,
  Propose,
  UpdateProposal,
  Vote,
  Call
} from '../../clients/evm/types';

interface EthTxCall extends Call {
  abi: typeof EthTxAuthenticatorAbi;
}

interface EthTxAuthenticator extends Authenticator {
  createCall(
    envelope: Envelope<Vote>,
    selector: string,
    calldata: string[]
  ): EthTxCall;
}
export default function createEthTxAuthenticator(): EthTxAuthenticator {
  return {
    type: 'ethTx',
    createCall(
      envelope: Envelope<Propose | UpdateProposal | Vote>,
      selector: string,
      calldata: string[]
    ): EthTxCall {
      const { space } = envelope.data;

      return {
        abi: EthTxAuthenticatorAbi,
        args: [space, selector, ...calldata]
      };
    }
  };
}
