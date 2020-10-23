const sha256 = require('./node_modules/crypto-js/sha256');

class Block{
    constructor(index,timestamp, data,  previosHash=''){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previosHash=previosHash;
        this.hash=this.calculateHash();
    }
    calculateHash(){    //It will take the property of the block run through them hash function and return hash
return sha256(this.index + this.previosHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
       this.chain=[this.createGenesisBlock()]; 
    }
    createGenesisBlock(){
        return new Block (0, '23/10/20','genesis block', '0');
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock){
        newBlock.previosHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    isChainValid(){
        for(let i=1; i<this.chain.length; i++){
            const currentBlock=this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash != currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previosHash != previousBlock.hash){
                return false;
            }
        }
        return true;
    }

}

let coin = new Blockchain();
coin.addBlock(new Block(1, '23/10/20',{amount : 4}));
coin.addBlock(new Block(1, '24/10/20',{amount : 10}));
console.log(JSON.stringify(coin,null,4));
console.log('Is blockchain valid- ' + coin.isChainValid());