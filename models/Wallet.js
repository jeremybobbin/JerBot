module.exports = class Wallet {

    constructor(amount) {
        this.total = amount;
    }

    spend(amount) {
        if(amount > this.total) 
            throw `Tried to spend ${amount} but there is only ${this.total}`;

        
    }


    add(amount) {
        if(amount < 0)
            throw `Cannot add a negetive amount of cash`;
    }

    getAmount() {
        return this.amount;
    }



}
