-- Create orders table
create table if not exists public.orders (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete set null,
    first_name text not null,
    last_name text not null,
    email text not null,
    address text not null,
    city text not null,
    state text not null,
    zip_code text not null,
    total_amount decimal(10,2) not null,
    status text not null default 'pending',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create order_items table
create table if not exists public.order_items (
    id uuid default gen_random_uuid() primary key,
    order_id uuid references public.orders(id) on delete cascade,
    product_id uuid references public.products(id) on delete set null,
    quantity integer not null,
    price decimal(10,2) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Create policies for orders
create policy "Users can view their own orders"
    on public.orders for select
    using (auth.uid() = user_id);

create policy "Admins can view all orders"
    on public.orders for select
    using (auth.uid() in (
        select user_id from public.admins
    ));

create policy "Users can create orders"
    on public.orders for insert
    with check (auth.uid() = user_id);

create policy "Admins can update orders"
    on public.orders for update
    using (auth.uid() in (
        select user_id from public.admins
    ));

-- Create policies for order_items
create policy "Users can view their own order items"
    on public.order_items for select
    using (order_id in (
        select id from public.orders where user_id = auth.uid()
    ));

create policy "Admins can view all order items"
    on public.order_items for select
    using (order_id in (
        select id from public.orders
    ));

create policy "Users can create order items"
    on public.order_items for insert
    with check (order_id in (
        select id from public.orders where user_id = auth.uid()
    ));