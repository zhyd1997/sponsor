export const faucetABI = [
  {
    inputs: [
      { internalType: "contract ISuperToken", name: "_token", type: "address" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "tapFaucet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      { internalType: "contract ISuperToken", name: "", type: "address" }
    ],
    stateMutability: "view",
    type: "function"
  }
];

export const faucetGoerliAddress = "0x04e77c3a4D46BA60fcd2cb48a2FDA6d117E65e69";
