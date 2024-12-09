-- Create cart table
create table if not exists public.carts (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users on delete cascade not null unique,
    created_at timestamptz default timezone('utc'::text, now()) not null,
    updated_at timestamptz default timezone('utc'::text, now()) not null,
    last_active timestamptz default timezone('utc'::text, now()) not null
);

-- Create cart_items table
create table if not exists public.cart_items (
    id uuid default gen_random_uuid() primary key,
    cart_id uuid references public.carts(id) on delete cascade not null,
    product_id uuid references public.products(id) on delete cascade not null,
    quantity integer not null check (quantity > 0),
    created_at timestamptz default timezone('utc'::text, now()) not null,
    updated_at timestamptz default timezone('utc'::text, now()) not null,
    unique(cart_id, product_id)
);

-- Enable RLS
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;

-- Create policies for carts
create policy "Users can view their own cart"
    on carts for select
    using (auth.uid() = user_id);

create policy "Users can insert their own cart"
    on carts for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own cart"
    on carts for update
    using (auth.uid() = user_id);

-- Create policies for cart_items
create policy "Users can view their own cart items"
    on cart_items for select
    using (
        exists (
            select 1 from carts
            where carts.id = cart_items.cart_id
            and carts.user_id = auth.uid()
        )
    );

create policy "Users can insert their own cart items"
    on cart_items for insert
    with check (
        exists (
            select 1 from carts
            where carts.id = cart_items.cart_id
            and carts.user_id = auth.uid()
        )
    );

create policy "Users can update their own cart items"
    on cart_items for update
    using (
        exists (
            select 1 from carts
            where carts.id = cart_items.cart_id
            and carts.user_id = auth.uid()
        )
    );

create policy "Users can delete their own cart items"
    on cart_items for delete
    using (
        exists (
            select 1 from carts
            where carts.id = cart_items.cart_id
            and carts.user_id = auth.uid()
        )
    );

-- Create indexes
create index cart_user_id_idx on carts(user_id);
create index cart_items_cart_id_idx on cart_items(cart_id);
create index cart_items_product_id_idx on cart_items(product_id);

-- Set up triggers for updated_at
create trigger handle_cart_updated_at
    before update on carts
    for each row
    execute function public.handle_updated_at();

create trigger handle_cart_items_updated_at
    before update on cart_items
    for each row
    execute function public.handle_updated_at();

-- Function to update cart last_active
create or replace function public.handle_cart_last_active()
returns trigger as $$
begin
    update carts
    set last_active = now()
    where id = new.cart_id;
    return new;
end;
$$ language plpgsql;

-- Trigger to update cart last_active
create trigger update_cart_last_active
    after insert or update on cart_items
    for each row
    execute function public.handle_cart_last_active();

-- Function to automatically create cart for new users
create or replace function public.handle_new_user_cart()
returns trigger as $$
begin
    insert into public.carts (user_id)
    values (new.id);
    return new;
end;
$$ language plpgsql;

-- Trigger to create cart for new users
create trigger create_cart_for_new_user
    after insert on auth.users
    for each row
    execute function public.handle_new_user_cart();