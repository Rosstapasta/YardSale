insert into likes
(login_id, item_id)
values
(($1), ($2));

select * from likes
where login_id = ($1) and item_id = ($2);