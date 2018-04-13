select * from listing
where cat = ($1) and price <= ($2)
and stateUSA like concat('%',($3),'%') and city like concat('%',($4),'%');
