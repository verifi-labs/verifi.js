export const OzVotesVotingStrategyAbi = [
  {
    type: 'error',
    name: 'InvalidByteArray',
    inputs: []
  },
  {
    type: 'function',
    name: 'getVotingPower',
    inputs: [
      { internalType: 'uint32', name: 'blockNumber', type: 'uint32' },
      { internalType: 'address', name: 'voter', type: 'address' },
      { internalType: 'bytes', name: 'params', type: 'bytes' },
      { internalType: 'bytes', name: '', type: 'bytes' }
    ],
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view'
  }
] as const;
