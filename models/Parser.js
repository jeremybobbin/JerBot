
module.exports = class Parse {

    static purchase(args) {
        console.log("String to parse:",args);

        let [item, count]  = args;

        if(count === undefined) count = 1;
        else count = parseInt(count);

        return { item, count };
    }

}
