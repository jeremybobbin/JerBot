module.exports = class Inventory {

    constructor(items) {
   
        this.items = items;

    }



    addItem(item) {
        this.items[item] && this.items[item]++;
    }

    removeItem(item, amountToRemove = 1) {
        const itemCount = this.items[item];

        if(isNaN(itemCount) || itemCount < amountToRemove)
           throw `Tried to remove ${count} ${item} but inventory only had ${this.items[item]}`;
    }


    getItems() {
        return this.items;
    }

    getItemCount(item) {
        return this.items[item];
    }


    purgeItem(item) {
        if(!this.items[item])
            throw `Item ${item} does not exist.`;

        delete this.items[item]'

    }

    purgeItems() { 
        this.items = [];
    }

}
