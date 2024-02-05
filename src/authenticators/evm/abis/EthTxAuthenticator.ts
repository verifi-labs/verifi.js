export const EthTxAuthenticatorAbi = [
  {
    inputs: [],
    name: 'InvalidFunctionSelector',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidMessageSender',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'target',
        type: 'address'
      },
      {
        internalType: 'bytes4',
        name: 'functionSelector',
        type: 'bytes4'
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes'
      }
    ],
    name: 'authenticate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const;
