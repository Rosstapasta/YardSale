insert into users
(auth_id)
values ($1);
select * from users
where auth_id = ($1);