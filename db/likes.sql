select * from likes
where login_id = ($1) and item_id = ($2);