insert into listing
(user_id, images)
values
( ($1), array [($2)]);

select * from listing
where user_id = ($1);
