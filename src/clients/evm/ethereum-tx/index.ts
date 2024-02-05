import { getAuthenticator } from '../../../authenticators/evm';
import { getStrategiesWithParams } from '../../../strategies/evm';
import { evmGoerli, evmMainnet } from '../../../networks';
import { SpaceAbi } from './abis/Space';
import type { Vote, Envelope } from '../types';
import type { EvmNetworkConfig } from '../../../types';
import { Client, encodeFunctionData, getContract } from 'viem';
import { EthTxAuthenticatorAbi } from '../../../authenticators/evm/abis/EthTxAuthenticator';

type CallOptions = {
  noWait?: boolean;
};

export class EthereumTx {
  networkConfig: EvmNetworkConfig;

  constructor(opts?: { networkConfig: EvmNetworkConfig }) {
    this.networkConfig = opts?.networkConfig || evmGoerli;
  }

  async vote(
    {
      walletClient,
      envelope
    }: { walletClient: Client; envelope: Envelope<Vote> },
    opts: CallOptions = {}
  ) {
    if (!walletClient || !walletClient.account) {
      return;
    }
    const voterAddress =
      envelope.signatureData?.address || (await walletClient.account.address);

    const userVotingStrategies = await getStrategiesWithParams(
      'vote',
      envelope.data.strategies,
      voterAddress,
      envelope.data,
      evmMainnet
    );

    const functionData = encodeFunctionData({
      abi: SpaceAbi,
      functionName: 'vote',
      args: [
        voterAddress as `0x${string}`,
        BigInt(envelope.data.proposal),
        envelope.data.choice,
        userVotingStrategies,
        envelope.data.metadataUri
      ]
    });

    const selector = functionData.slice(0, 10);
    const calldata = `0x${functionData.slice(10)}` as `0x${string}`;

    const authenticator = getAuthenticator(
      envelope.data.authenticator,
      evmMainnet
    );
    if (!authenticator) {
      throw new Error('Invalid authenticator');
    }

    const authenticatorContract = getContract({
      address: envelope.data.authenticator as `0x${string}`,
      abi: EthTxAuthenticatorAbi,
      walletClient
    });

    const promise = authenticatorContract.write.authenticate(
      [
        envelope.data.space as `0x${string}`,
        selector as `0x${string}`,
        calldata
      ],
      {} as any
    );

    return opts.noWait ? null : promise;
  }
}
