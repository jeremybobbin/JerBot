
const Wallet = require("./Wallet.js");
const Inventory = require("./Inventory.js");

module.exports = class Baby {

    constructor(name, inventory, coinCount) {
        this.name = name;
        this.inventory = new Inventory(inventory);
        this.wallet = new Wallet(coinCount);
    }


    logBalance() {
        console.log(`User ${this.name} has ${this.wallet.getAmount()} coins.`);
    }

    spend(amount) {
        this.wallet.spend(amount);
    }

    giveItem(item) {
        this.inventory.addItem(item);
    }

    useItem(item) {
       this.inventory.removeItem(item); 
    }

    giveCoins(count) {
        this.coins += count;
    } 
    
}
