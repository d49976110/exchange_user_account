export const eventAbi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'string',
                name: 'name',
                type: 'string',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'age',
                type: 'uint256',
            },
        ],
        name: 'Instructor',
        type: 'event',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '_fName',
                type: 'string',
            },
            {
                internalType: 'uint256',
                name: '_age',
                type: 'uint256',
            },
        ],
        name: 'setInfo',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'get',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
];
