const Discord = require("discord.js");
const Item = require("../models/Item.js");
const Fmt = require("../models/Fmt.js");

const subCommands = {

    async add(args) {
        let [name, price] = args;

        if(name === undefined || price === undefined)
            throw `The add subcommand requires a name and a price.`;

        price = parseInt(price);
        console.log(price);

        let response = '', error;

        try { 
            await new Item({ name, price }).save();
            return Fmt.ItemAdded(name, price);
        } catch (err) {
            throw `Item **${Fmt.cap(name)}** already exists.`;
        }

    },

    async remove(args) {
    
        let [name] = args;
        console.log(name);

        const item = await Item.findOne({ name })

        if(item === null)
            throw `Item **${Fmt.cap(name)}** does not exist.`;

        await item.remove().exec;

        return `Item ${Fmt.cap(name)} removed.`;
    },


    async list(args) {

        let [name] = args;
        let queryObj = {};

        if(name) queryObj.name = name;

        items = await Item.find(queryObj);


        if(!items.length && name)
            throw `Item ${name} was not found.`;



        return Fmt.ItemIndex(items);
    }
        
}; 

module.exports.run = async (bot, message, args) => {

    const subCommand = args.shift();

    if(subCommand === undefined)
        throw `The store command requires a sub-command`;

    if(!subCommands.hasOwnProperty(subCommand))
        throw `Invalid SubCommand: '${subCommand}'`;


    return await subCommands[subCommand](args);

};


module.exports.help = {
    name: "store"
}
