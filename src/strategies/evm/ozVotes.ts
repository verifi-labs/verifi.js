import { IVotesAbi } from './abis/IVotes';

import type { Strategy } from '../../clients/evm/types';
import { getContract } from 'viem';

export default function createOzVotesStrategy(): Strategy {
  return {
    type: 'ozVotes',
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
        abi: IVotesAbi,
        publicClient
      });

      const votingPower = await compContract.read.getVotes([voterAddress], {
        blockTag: block
      });

      return BigInt(votingPower.toString());
    }
  };
}
