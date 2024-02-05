export const ICompAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'getCurrentVotes',
    outputs: [
      {
        internalType: 'uint96',
        name: '',
        type: 'uint96'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256'
      }
    ],
    name: 'getPriorVotes',
    outputs: [
      {
        internalType: 'uint96',
        name: '',
        type: 'uint96'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
] as const;
