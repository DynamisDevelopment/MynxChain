const sha256 = require('crypto-js/sha256')

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.previousHash = previousHash
    this.hash = this.generateHash()
  }
  generateHash() {
    return sha256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString()
  }

  updateHash() {
    this.hash = this.generateHash()
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesis()]
  }

  createGenesis() {
    return new Block(0, new Date(), 'Genesis', '0')
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  addBlock(data) {
    const newBlock = new Block(this.chain.length + 1, new Date(), data)
    newBlock.previousHash = this.getLatestBlock().hash
    newBlock.updateHash()
    this.chain.push(newBlock)
  }
}

let mynxCoin = new Blockchain()
mynxCoin.addBlock({ amount: 5 })

console.log(JSON.stringify(mynxCoin, null, 2))
