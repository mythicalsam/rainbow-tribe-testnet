const hre = require('hardhat')
const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')
const whitelist = require('./whitelist.js')

async function main() {
  const nftFactory = await hre.ethers.getContractFactory('TheRainbowTribe')
  const nftContract = await nftFactory.attach(
    '0xFeF77Bc311891e4c1F1Eb5ba7b04F277FC1Eba6A'
    
  )

    // Calculate merkle root from the whitelist array
    const leafNodes = whitelist.map((addr) => keccak256(addr))
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
    const root = merkleTree.getRoot().toString('hex')
  
  
  
    console.log('Whitelist root set to:', root)
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })