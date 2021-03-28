create table EXAMPLE (
  id char(10) primary key,
  price decimal(10,3),
  qty INTEGER,
  item_name binary(20),
  item_type char(2),
  rate decimal(1,0),
  sold_out boolean not null,
  updatedAt timestamp,
  updateDate date,
  updateTime time,
  constraint unique_name unique (item_name)
);
