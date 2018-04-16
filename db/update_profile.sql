update users
set first_name = ($1), last_name = ($2), phone = ($3)
where id = ($4);