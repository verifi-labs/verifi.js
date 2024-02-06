import { ICompAbi } from './abis/IComp';

import { getContract } from 'viem';
import type { Strategy } from '../../clients/evm/types';

export default function createCompStrategy(): Strategy {
  return {
    type: 'comp',
    async getParams(): Promise<string> {
      return '0x00';
    },
    async getVotingPower({
      strategyAddress,
      voterAddress,
      block,
      publicClient
    }): Promise<bigint> {
      const compContract = getContract({
        address: strategyAddress,
        abi: ICompAbi,
        publicClient
      });

      const votingPower = await compContract.read.getCurrentVotes(
        [voterAddress],
        { blockNumber: block }
      );

      return BigInt(votingPower.toString());
    }
  };
}
