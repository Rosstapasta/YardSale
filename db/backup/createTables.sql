create table if not exists users
(id serial primary key, auth_id text, phone bigint, first_name varchar(80), last_name varchar(80));

create table if not exists listing
(item_id serial primary key, user_id integer, price integer,
city varchar(80), stateUSA varchar(80), item varchar(80),
cat varchar(80), descript varchar(200), img varchar(80), likes bigint);

create table if not exists likes
(login_id integer, item_id bigint);


-- test
insert into listing 
(images)
VALUES ( array [1,2,3]);