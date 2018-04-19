update listing
set item = ($1), price = ($2), city = ($3), stateUSA = ($4)
where item_id = ($5);

select * from listing
where item_id = ($5);