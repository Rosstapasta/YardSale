select * from listing join likes on listing.item_id = likes.item_id
where likes.login_id =($1);