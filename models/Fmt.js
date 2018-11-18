const Discord = require("discord.js");

const User = require("./User.js");

const colors = {
    TEAL: "#2FE0D7",
    RED: "#FF0000"
};


// Returns formatted information strings
module.exports = class Fmt {
    
    // Prints inventory string to console
    static Inventory(name, inv) {

        let invString = "";


        const capitalizeFirst = (word) => word.charAt(0).toUpperCase() + word.slice(1);

        for(let item in inv) {

            let quantity = (inv[item]);

            invString += `**${capitalizeFirst(item)} amount:** ${quantity}\n`;

        }



        return new Discord.RichEmbed()
            .setColor(colors.TEAL)
            .addField(`${name}'s Updated Items:`, invString);


    }


    static Error(message) {

        return new Discord.RichEmbed()
            .setColor(colors.RED)
            .addField(`Error:`, message);
    }




}
