# CustomDirectiveAngular
Create custom directive APIs with controllers and reference passing "&"

it's about using directive APIs, i used "https://davids-restaurant.herokuapp.com/menu_items.json" we read the items that contain the sentence mentioned by the user and display them all. and give him the option of deleting items he's interesting in till he finally finds the most convenient meal.

Deleting is done in the directive scope "expression executed" but the item removed from the parent context as menu list was passed by reference on remove.
