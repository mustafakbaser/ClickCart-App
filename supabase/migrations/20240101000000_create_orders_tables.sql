-- Create orders table
create table if not exists public.orders (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users on delete cascade not null,
    total decimal(10,2) not null,
    status text check (status in ('pending', 'processing', 'shipped', 'delivered')) not null default 'pending',
    created_at timestamptz default timezone('utc'::text, now()) not null,
    updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Create order_items table with proper foreign key relationship
create table if not exists public.order_items (
    id uuid default gen_random_uuid() primary key,
    order_id uuid references public.orders(id) on delete cascade not null,
    product_id text not null,
    quantity integer not null check (quantity > 0),
    price decimal(10,2) not null,
    created_at timestamptz default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Create policies for orders
create policy "Users can view their own orders"
    on orders for select
    using (auth.uid() = user_id);

create policy "Users can insert their own orders"
    on orders for insert
    with check (auth.uid() = user_id);

-- Create policies for order_items
create policy "Users can view their order items"
    on order_items for select
    using (
        exists (
            select 1 from orders
            where orders.id = order_items.order_id
            and orders.user_id = auth.uid()
        )
    );

create policy "Users can insert their order items"
    on order_items for insert
    with check (
        exists (
            select 1 from orders
            where orders.id = order_items.order_id
            and orders.user_id = auth.uid()
        )
    );

-- Create indexes
create index orders_user_id_idx on orders(user_id);
create index order_items_order_id_idx on order_items(order_id);

-- Set up triggers for updated_at
create trigger orders_updated_at
    before update on orders
    for each row
    execute procedure public.handle_updated_at();