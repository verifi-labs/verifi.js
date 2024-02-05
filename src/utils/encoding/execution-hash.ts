// import { _TypedDataEncoder } from '@ethersproject/hash';
import { encodeAbiParameters, hashTypedData, parseAbiParameters } from 'viem';
import { keccak256 } from 'viem';

export const EIP712_TYPES = {
  Transaction: [
    {
      name: 'to',
      type: 'address'
    },
    {
      name: 'value',
      type: 'uint256'
    },
    {
      name: 'data',
      type: 'bytes'
    },
    {
      name: 'operation',
      type: 'uint8'
    },
    {
      name: 'nonce',
      type: 'uint256'
    }
  ]
};

export interface MetaTransaction {
  to: `0x${string}`;
  value: bigint;
  data: `0x${string}`;
  operation: number;
  salt: bigint;
}

/**
 * Computes an execution hash and a set of transaction hashes for a proposal for L1 execution via the Zodiac Module
 * @param verifyingContract The verifying l1 contract
 * @param txs Array of meta transactions
 * @returns An array of transaction hashes and an overall keccak hash of those hashes
 */
export function createExecutionHash(
  txs: MetaTransaction[],
  verifyingContract: `0x${string}`,
  chainId: number
): {
  executionHash: string;
  txHashes: string[];
} {
  const domain = {
    chainId: chainId,
    verifyingContract: verifyingContract
  };
  // const txHashes = txs.map(tx => _TypedDataEncoder.hash(domain, EIP712_TYPES, tx));
  const txHashes = txs.map(tx =>
    hashTypedData({
      domain,
      types: EIP712_TYPES,
      primaryType: 'Transaction',
      message: tx as any
    })
  );
  const encoded = encodeAbiParameters(parseAbiParameters('bytes32[]'), [
    txHashes
  ]);
  const executionHash = keccak256(encoded);
  return {
    executionHash: executionHash,
    txHashes: txHashes
  };
}
