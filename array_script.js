// using associative array
menu_items = [];
menu_items["hotdog"] = 4;
menu_items["fries"] = 3.5;
menu_items["soda"] = 1.5;
menu_items["sauerkraut"] = 1;


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

        let order_total_cost = 0;

        for (item in menu_items)
        {
            // track individual item variables for ease of use
            let quantity = document.getElementById(item).value;
            let unit_cost = menu_items[item];
            let total_cost = ("$" + unit_cost * quantity);

            // create individual item elements
            row = document.createElement("tr");
            data_item = document.createElement("td");
            data_cost = document.createElement("td");
            data_quantity = document.createElement("td");
            data_item.innerHTML = item[0].toUpperCase() + item.substring(1);
            data_quantity.innerHTML = quantity;
            data_cost.innerHTML = total_cost;
            order_total_cost += (unit_cost * quantity);

            // append to order table
            row.append(data_item);
            row.append(data_quantity);
            row.append(data_cost);
            order_table.append(row);
        }

        // write finished table to order info
        document.getElementById("order_info").append(order_table);
        document.getElementById("order_info").append("For a total of: $" + order_total_cost);


    })

})