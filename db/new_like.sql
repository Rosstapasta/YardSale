insert into likes
(login_id, item_id)
values
(($1), ($2));

update listing
set likes = likes + 1
where item_id = ($2);

select * from likes
where login_id = ($1) and item_id = ($2);