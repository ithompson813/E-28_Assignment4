// using a class

// define menu item object
class Menu_item 
{

    constructor(name, price)
    {
        this.name = name;
        this.price = price;
    }

    write_to_table()
    {
        // track individual item variables for ease of use
        let quantity = document.getElementById(this.name).value;
        let unit_cost = this.price;
        let total_cost = ("$" + unit_cost * quantity);

        // create individual item elements
        var row = document.createElement("tr");
        var data_item = document.createElement("td");
        var data_cost = document.createElement("td");
        var data_quantity = document.createElement("td");
        data_item.innerHTML = this.name[0].toUpperCase() + this.name.substring(1);
        data_quantity.innerHTML = quantity;
        data_cost.innerHTML = total_cost;
        order_total_cost += (unit_cost * quantity);

        // append to order table
        row.append(data_item);
        row.append(data_quantity);
        row.append(data_cost);

        // return prepared row
        return row;
    }


}


// create objects
hotdog = new Menu_item("hotdog", 4);
fries = new Menu_item("fries", 3.5);
soda = new Menu_item("soda", 1.5);
sauerkraut = new Menu_item("sauerkraut", 1);

// add objects to aray for access
menu_items = [hotdog, fries, soda, sauerkraut];


document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("order_button").addEventListener("click", () => {

        // clear current info
        document.getElementById("order_info").innerHTML = "";

        // create table and header elements
        order_table = document.createElement("table");
        header = document.createElement("tr");
        header_item = document.createElement("th");
        header_item.innerHTML = "Item:";
        header_quantity = document.createElement("th");
        header_quantity.innerHTML = "QTY:";
        header_price = document.createElement("th");
        header_price.innerHTML = "Price:";

        // append to order info
        header.append(header_item);
        header.append(header_quantity);
        header.append(header_price);
        order_table.append(header);

        order_total_cost = 0;

        // write each item to table using the write_to_table function to represent each row
        menu_items.forEach((item) => {
            order_table.append(item.write_to_table());
        })

        // write finished table to order info
        document.getElementById("order_info").append(order_table);
        document.getElementById("order_info").append("For a total of: $" + order_total_cost);


    })

})