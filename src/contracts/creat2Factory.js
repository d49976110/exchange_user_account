export const creat2Factory = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: '_address',
                type: 'address',
            },
        ],
        name: 'Deploy',
        type: 'event',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_salt',
                type: 'uint256',
            },
        ],
        name: 'deploy',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes',
                name: 'bytecode',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: '_salt',
                type: 'uint256',
            },
        ],
        name: 'getAddress',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_owner',
                type: 'address',
            },
        ],
        name: 'getBytesCode',
        outputs: [
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
        ],
        stateMutability: 'pure',
        type: 'function',
    },
];
