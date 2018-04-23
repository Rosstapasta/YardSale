select * from listing
where cat = ($1) and price >= ($5) and price <= ($2)
and stateUSA like concat('%',($3),'%') and city ilike concat('%',($4),'%')
and item ilike concat('%',($6),'%')
order by item_id desc;
