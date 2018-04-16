select count(*)
from likes
where item_id = ($1);