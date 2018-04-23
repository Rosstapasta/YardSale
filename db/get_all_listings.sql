select * from listing
where price <= ($1) and price >= ($4)
and stateUSA like concat('%',($2),'%') and city ilike concat('%',($3),'%')
and item ilike concat('%',($5),'%')
order by item_id desc;
-- limit 20 offset ($1);