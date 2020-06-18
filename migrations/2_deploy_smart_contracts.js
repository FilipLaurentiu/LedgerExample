const StorageContract = artifacts.require("Storage.sol");

module.exports =  function (deployer) {
     deployer.deploy(StorageContract);
}