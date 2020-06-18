
const LedgerWalletProvider = require('@ledgerhq/web3-subprovider');
const createLedgerSubprovider = LedgerWalletProvider.default;
const TransportNodeHid = require('@ledgerhq/hw-transport-node-hid').default;
const ProviderEngine = require('web3-provider-engine');
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc');

const getTransport = () => TransportNodeHid.create();
const ledger = createLedgerSubprovider(getTransport, {
    networkId: 3, paths: ["44'/1'/0'/0/0"], askConfirm: false,
});

const engine = new ProviderEngine();
engine.addProvider(ledger)
engine.addProvider(new RpcSubprovider({ rpcUrl: "https://ropsten.infura.io/v3/!!!InsertKeyOrLocalNode!!!!" })); // TODO
engine.start();

module.exports = {
  networks: {
    ropsten: {
      provider: () => engine,
      network_id: 3,
    }
  },
  compilers: {
    solc: {
      version: "0.6.10",
      settings: {
        optimizer: {
          enabled: true
        }
      }
    }
  }
};