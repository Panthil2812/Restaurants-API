let jsonArray = [
    { "food_id": "1", "variation_id": "1", "qty": "2", "toppings_id": "2,34" },
    { "food_id": "2", "variation_id": "48", "qty": "1", "toppings_id": "3,4" }
];
var feed = {created_at: "2017-03-14T01:00:32Z", entry_id: 33358, field1: "4", field2: "4", field3: "0"};

var data = [];
jsonArray.push(feed);
console.log(jsonArray)