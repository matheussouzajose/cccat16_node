drop schema if exists cccat16_testing cascade;
create schema cccat16_testing;
create table cccat16_testing.account (
	account_id uuid primary key,
	name text not null,
	email text not null,
	cpf text not null,
	car_plate text null,
	is_passenger boolean not null default false,
	is_driver boolean not null default false,
	created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp
);

create table cccat16_testing.ride (
	ride_id uuid,
	passenger_id uuid,
	driver_id uuid,
	status text,
	fare numeric,
	distance numeric,
	from_lat numeric,
	from_long numeric,
	to_lat numeric,
	to_long numeric,
	date timestamp,
	last_lat numeric,
	last_long numeric,
	created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp
);

create table cccat16_testing.position (
	position_id uuid,
	ride_id uuid,
	lat numeric,
	long numeric,
	date timestamp,
	created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp
);
