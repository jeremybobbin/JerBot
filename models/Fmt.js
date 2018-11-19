const Discord = require("discord.js");

const User = require("./User.js");

const puppy = ""; 
const spider = "url"; 

const images = {
    PUPPY: "https://s.abcnews.com/images/Lifestyle/puppy-ht-3-er-170907_4x3_992.jpg",
};

const colors = {
    TEAL: "#2FE0D7",
    RED: "#FF0000",
    GREEN: "#00FF00",
    PURPLE: "#8800CC"
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

    static ItemIndex(items) {

        const diff = 14; 


        let string = items.map(({name, price}) => {
            
            return  `**$${price}** - ${name}`; 

            console.log(subString);
            return subString;

        }); 

        return new Discord.RichEmbed()
            .setColor(colors.PURPLE)
            .setImage("")
            .addField(`Store Items:`, string);
    }


    static Error(message) {

        return new Discord.RichEmbed()
            .setColor(colors.RED)
            .addField(`Error:`, message);
    }

    static ItemAdded(name, price) {


        
        return new Discord.RichEmbed()
            .setColor(colors.GREEN)
            .addField(`Item Added:`, `**${Fmt.cap(name)}** can now be purchased from STORE for **${price} coins**.`);
    }

    static cap(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    static whiteSpace(count) {
        let string =  '';
        while(count > 0) {

            string += '=';
            count--;
        }

        return string;
    }





}
