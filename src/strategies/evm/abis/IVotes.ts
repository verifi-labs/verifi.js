export const IVotesAbi = [
  {
    type: 'event',
    name: 'DelegateChanged',
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'delegator',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'fromDelegate',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'toDelegate',
        type: 'address'
      }
    ]
  },
  {
    type: 'event',
    name: 'DelegateVotesChanged',
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'delegate',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'previousBalance',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newBalance',
        type: 'uint256'
      }
    ]
  },
  {
    type: 'function',
    name: 'delegate',
    inputs: [{ internalType: 'address', name: 'delegatee', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'delegateBySig',
    inputs: [
      { internalType: 'address', name: 'delegatee', type: 'address' },
      { internalType: 'uint256', name: 'nonce', type: 'uint256' },
      { internalType: 'uint256', name: 'expiry', type: 'uint256' },
      { internalType: 'uint8', name: 'v', type: 'uint8' },
      { internalType: 'bytes32', name: 'r', type: 'bytes32' },
      { internalType: 'bytes32', name: 's', type: 'bytes32' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'delegates',
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getPastTotalSupply',
    inputs: [{ internalType: 'uint256', name: 'blockNumber', type: 'uint256' }],
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getPastVotes',
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'uint256', name: 'blockNumber', type: 'uint256' }
    ],
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getVotes',
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view'
  }
] as const;
