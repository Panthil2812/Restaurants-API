let arr = [
    { "food_id": "1", "variation_id": "1", "qty": "2", "toppings_id": [1,2,3] },
    { "food_id": "2", "variation_id": "48", "qty": "1", "toppings_id": "3,4" }
]
console.log(arr[1].toppings_id[1])