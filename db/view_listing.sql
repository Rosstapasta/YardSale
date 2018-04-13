select item_id, user_id, price, city, stateusa, item, cat, descript,
img, users.phone, users.first_name, users.last_name from listing
right join users on users.id = listing.user_id
where item_id = ($1);