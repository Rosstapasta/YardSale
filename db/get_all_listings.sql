select * from listing
where price <= ($1)
and stateUSA like concat('%',($2),'%') and city like concat('%',($3),'%')
order by item_id desc;
-- limit 20 offset ($1);