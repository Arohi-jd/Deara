-- Drop existing tables if they exist
drop table if exists public.cart_items;
drop table if exists public.carts;

-- Create carts table
create table public.carts (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create cart_items table
create table public.cart_items (
    id uuid default gen_random_uuid() primary key,
    cart_id uuid references public.carts(id) on delete cascade,
    product_id uuid references public.products(id) on delete cascade,
    quantity integer not null default 1,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(cart_id, product_id)
);

-- Enable Row Level Security
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;

-- Create policies for carts
create policy "Users can view their own cart"
    on public.carts for select
    using (auth.uid() = user_id);

create policy "Users can create their own cart"
    on public.carts for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own cart"
    on public.carts for update
    using (auth.uid() = user_id);

create policy "Users can delete their own cart"
    on public.carts for delete
    using (auth.uid() = user_id);

-- Create policies for cart_items
create policy "Users can view their own cart items"
    on public.cart_items for select
    using (cart_id in (
        select id from public.carts where user_id = auth.uid()
    ));

create policy "Users can add items to their own cart"
    on public.cart_items for insert
    with check (cart_id in (
        select id from public.carts where user_id = auth.uid()
    ));

create policy "Users can update their own cart items"
    on public.cart_items for update
    using (cart_id in (
        select id from public.carts where user_id = auth.uid()
    ));

create policy "Users can delete their own cart items"
    on public.cart_items for delete
    using (cart_id in (
        select id from public.carts where user_id = auth.uid()
    ));

-- Create function to get or create cart
create or replace function public.get_or_create_cart()
returns uuid
language plpgsql
security definer
as $$
declare
    cart_id uuid;
begin
    -- Try to get existing cart
    select id into cart_id
    from public.carts
    where user_id = auth.uid();

    -- If no cart exists, create one
    if cart_id is null then
        insert into public.carts (user_id)
        values (auth.uid())
        returning id into cart_id;
    end if;

    return cart_id;
end;
$$; 