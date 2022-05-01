<template>
    <div id="app">
        <!-- <HelloWorld /> -->
        <div>
            <button @click="connect">click</button>
        </div>

        <div>
            <label for="">Address</label>
            <div>
                <label for="">{{ address }}</label>
            </div>
            <label for="">Wallet Balance</label>
            <div>
                <label for="">{{ wallet_balance }}</label>
            </div>
            <label for="">Token_balance</label>
            <div>
                <label for="">{{ token_balance }}</label>
            </div>
        </div>

        <ul>
            <li v-for="(item, key) in datas" :key="key">
                <p>from :{{ item.from }}</p>
                <p>to :{{ item.to }}</p>
                <p>value :{{ item.value }}</p>
            </li>
        </ul>

        <div>
            <!-- <button @click="mint">mint</button> -->
            <button @click="getDepositAddress">getDepositAddress</button>
            <p>{{ depositAddress }}</p>
            <button @click="deploy">deploy</button>
        </div>
    </div>
</template>

<script>
import {ethers} from 'ethers';
// import HelloWorld from './components/HelloWorld.vue';
// import {abi} from './contracts/abi.js';
import {erc20Abi} from './contracts/erc20.js';
import {creat2Factory} from './contracts/creat2Factory.js';

export default {
    name: 'App',
    components: {},
    async created() {
        await window.ethereum.request({method: 'eth_requestAccounts'});
        this.provider = await new ethers.providers.Web3Provider(window.ethereum);
        this.signer = await this.provider.getSigner();

        this.erc20 = await new ethers.Contract(this.USDT_ContractAddress, erc20Abi, this.signer);
        this.creat2Factory = await new ethers.Contract(this.creat2FactoryAddress, creat2Factory, this.signer);
        console.log('this.erc20', this.erc20);
    },
    data() {
        return {
            AlchemyapiKey: 'vTxuzg6GwRxcJnAtv-hdc3cvmpwSMKNk',
            privateKey: 'b5b0c8aba0dd8c1afd7904acc1c8330be10827af8187912db8faad171db0bd90',
            owner: '0xAf94227ADBccAE8f7CDA30Bf84Fe28a85a4e5CD1',
            ownerProvider: {},
            ownerSinger: {},
            ownerErc20: {},
            ownerCreat2Factory: {},
            NFT_Contract: '0xA025E2fd2593B7143b77E33871802B2B591681Cc',
            MRC_Token_Contract: '0xCc95E492F60F5D6B2b45bB483131DA51982Cd945',
            Event_Contract: '0xb0Bd58f2a68254E32249673857eF6D2f57EDd839',
            USDT_ContractAddress: '0xcacE8f13C6C857c8a6a47B7aC0BA53b755237C74',
            creat2FactoryAddress: '0xFfD77e08Be88842C364348c95a165Bf1F9A80fE5',
            creat2Factory: '',
            user_account_contract: '0xc680C717CE4e4BbE9346a20D2BECb3e93Bf8DCaf',
            depositAddress: '',
            salt: {
                '0x9D79756C360bAFb490FFfC55094B6F3D49A899aB': 0,
                '0xa212365e27A3954B4a635da2a689C9E3c3d8Ff24': 1,
                '0xAf94227ADBccAE8f7CDA30Bf84Fe28a85a4e5CD1': 2,
            },
            admin: '',
            address: '',
            wallet_balance: 0,
            token_balance: 0,
            provider: {},
            singer: {},
            erc20: {},
            datas: [],
        };
    },
    computed: {},
    methods: {
        async connect() {
            await window.ethereum.request({method: 'eth_requestAccounts'});
            const wallet_balance = await this.signer.getBalance();

            this.address = await this.signer.getAddress();
            this.wallet_balance = wallet_balance;
            const token_balance = await this.erc20.balanceOf(this.signer.getAddress());

            this.token_balance = ethers.utils.formatUnits(token_balance.toNumber(), 6);
        },
        async mint() {
            const options = {value: ethers.utils.parseEther('0.3')};
            await this.erc20.mintNicMeta(1, options);
        },
        async getDepositAddress() {
            let bytecode = await this.creat2Factory.getBytesCode(this.owner);

            let address = this.address;

            this.depositAddress = await this.creat2Factory.getAddress(bytecode, this.salt[address]);

            await this.listenEvent();
        },
        async listenEvent() {
            this.ownerProvider = await new ethers.providers.AlchemyProvider('maticmum', this.AlchemyapiKey);
            this.ownerSinger = await new ethers.Wallet(this.privateKey, this.ownerProvider);

            this.ownerErc20 = await new ethers.Contract(this.USDT_ContractAddress, erc20Abi, this.ownerSinger);

            this.ownerCreat2Factory = await new ethers.Contract(this.creat2FactoryAddress, creat2Factory, this.ownerSinger);

            let filter = this.ownerErc20.filters.Transfer(null, this.depositAddress);

            this.ownerErc20.on(filter, (from, to, value) => {
                console.log('listening for transfer event');

                this.deploy();
                this.datas.push({
                    from: from,
                    to: to,
                    value: ethers.utils.formatUnits(value, 6),
                });
            });
        },
        async deploy() {
            let address = this.address;
            let tx = await this.ownerCreat2Factory.deploy(this.salt[address]);
            console.log(tx.hash);
        },
    },
};
</script>
