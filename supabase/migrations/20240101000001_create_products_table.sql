-- Create products table
create table if not exists public.products (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    description text not null,
    price decimal(10,2) not null check (price >= 0),
    image_url text not null,
    category text not null,
    stock integer not null check (stock >= 0),
    featured boolean default false,
    created_at timestamptz default timezone('utc'::text, now()) not null,
    updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.products enable row level security;

-- Create policies
create policy "Products are viewable by everyone"
    on products for select
    using ( true );

create policy "Only authenticated users can create products"
    on products for insert
    with check ( auth.role() = 'authenticated' );

create policy "Only authenticated users can update products"
    on products for update
    using ( auth.role() = 'authenticated' );

-- Create indexes
create index products_category_idx on products(category);
create index products_featured_idx on products(featured);

-- Insert sample products
insert into public.products (title, description, price, image_url, category, stock, featured) values
-- Electronics
('Sony WH-1000XM4 Wireless Headphones', 
 'Industry-leading noise canceling with Dual Noise Sensor technology. Next-level music with Edge-AI, co-developed with Sony Music Studios Tokyo',
 349.99,
 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
 'Electronics',
 50,
 true),

('MacBook Pro M2', 
 'Apple M2 Pro chip with 10‑core CPU and 16‑core GPU, 16GB Unified Memory, 512GB SSD Storage',
 1999.99,
 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
 'Electronics',
 25,
 true),

('DJI Mini 3 Pro Drone', 
 'Lightweight and portable drone with 4K/60fps video, 48MP photos, and advanced obstacle avoidance',
 759.99,
 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500',
 'Electronics',
 15,
 false),

-- Fashion
('Premium Leather Jacket', 
 'Handcrafted genuine leather jacket with quilted lining and premium YKK zippers',
 299.99,
 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
 'Fashion',
 30,
 true),

('Ray-Ban Aviator Classic', 
 'Classic aviator sunglasses with gold frame and polarized lenses',
 154.99,
 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500',
 'Fashion',
 45,
 false),

('Swiss Automatic Watch', 
 'Luxury automatic watch with sapphire crystal and genuine leather strap',
 1299.99,
 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500',
 'Fashion',
 10,
 true),

-- Home & Living
('Smart Home Security System', 
 'Complete home security system with 4K cameras, motion sensors, and mobile app control',
 449.99,
 'https://images.unsplash.com/photo-1558002038-bb4237b54c7f?w=500',
 'Home & Living',
 20,
 true),

('Herman Miller Aeron Chair', 
 'Ergonomic office chair with PostureFit SL and adjustable arms',
 1495.99,
 'https://images.unsplash.com/photo-1505797149-0f7d06f0d90c?w=500',
 'Home & Living',
 15,
 false),

('Philips Smart Coffee Maker', 
 'WiFi-enabled 12-cup coffee maker with mobile app control and scheduling',
 199.99,
 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500',
 'Home & Living',
 40,
 false),

-- Sports & Outdoors
('Carbon Fiber Mountain Bike', 
 'Professional-grade mountain bike with SRAM Eagle drivetrain and FOX suspension',
 2899.99,
 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500',
 'Sports & Outdoors',
 8,
 true),

('North Face Camping Tent', 
 '4-person waterproof tent with aluminum poles and built-in LED lighting',
 349.99,
 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500',
 'Sports & Outdoors',
 25,
 false),

('Garmin Fenix 7 Pro', 
 'Premium multisport GPS watch with advanced training features and solar charging',
 799.99,
 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500',
 'Sports & Outdoors',
 30,
 true);