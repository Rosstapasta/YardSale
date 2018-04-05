create table if not exists users
(id serial primary key, auth_id text, email varchar(80), first_name varchar(80), last_name varchar(80));

create table if not exists listing
(item_id serial primary key, user_id integer, price integer,
city varchar(80), state varchar(80), item_name varchar(80),
images text []);


-- test
insert into listing 
(images)
VALUES ( array [1,2,3]);