create table public.memberships
(
    id          text    not null
        constraint memberships_pk primary key,
    user_id     uuid    not null,
    date        date    not null,
    amount      integer not null,
    receipt_url text    not null,


    foreign key (user_id) references public.profiles (id)
);