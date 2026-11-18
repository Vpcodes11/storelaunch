create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Admins can view all profiles" on public.profiles for select using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'user');
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create table public.stores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  shop_domain text not null unique,
  shop_name text,
  shop_email text,
  currency text default 'USD',
  access_token_encrypted text,
  installed boolean not null default true,
  niche text,
  target_country text,
  audience text,
  price_range text,
  goal text check (goal in ('first_sales', 'brand_awareness', 'seo')),
  has_refund_policy boolean default false,
  has_shipping_policy boolean default false,
  has_privacy_policy boolean default false,
  has_contact_page boolean default false,
  has_favicon boolean default false,
  has_og_image boolean default false,
  readiness_score integer default 0,
  readiness_issues jsonb default '[]'::jsonb,
  plan_tier text not null default 'free' check (plan_tier in ('free', 'launch_kit', 'dfy', 'growth')),
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.stores enable row level security;
create policy "Users can manage own stores" on public.stores for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Admins can view all stores" on public.stores for select using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create table public.products (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  shopify_product_id text not null,
  title text not null,
  handle text not null,
  description_html text,
  description_word_count integer default 0,
  seo_title text,
  seo_description text,
  collections text[] default '{}',
  price_min numeric(12,2) default 0,
  price_max numeric(12,2) default 0,
  currency text default 'USD',
  images jsonb default '[]'::jsonb,
  has_missing_alt boolean default false,
  has_images boolean default true,
  status text default 'ACTIVE',
  updated_at timestamptz not null default now(),
  unique(store_id, shopify_product_id)
);

alter table public.products enable row level security;
create policy "Users can manage own products" on public.products for all using (exists (select 1 from public.stores s where s.id = store_id and s.user_id = auth.uid()));

create table public.channels (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  url text not null,
  tier integer not null check (tier in (1, 2, 3, 4)),
  categories text[] not null default '{}',
  countries text[] not null default '{}',
  is_free boolean not null default true,
  limits jsonb not null default '{}'::jsonb,
  tone_notes text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.channels enable row level security;
create policy "Anyone authenticated can read active channels" on public.channels for select using (auth.role() = 'authenticated' or active = true);
create policy "Only admins can modify channels" on public.channels for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create table public.store_channels (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  channel_id uuid not null references public.channels(id) on delete cascade,
  match_score integer not null check (match_score between 0 and 100),
  reason text not null,
  copy jsonb default '{}'::jsonb,
  status text not null default 'not_started' check (status in ('not_started', 'submitted', 'live', 'rejected')),
  live_url text,
  utm_link text not null,
  updated_at timestamptz not null default now(),
  unique(store_id, channel_id)
);

alter table public.store_channels enable row level security;
create policy "Users can manage own store_channels" on public.store_channels for all using (exists (select 1 from public.stores s where s.id = store_id and s.user_id = auth.uid()));

create table public.launch_tasks (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  day integer not null check (day between 1 and 30),
  week_theme text not null,
  title text not null,
  description text,
  done boolean not null default false,
  created_at timestamptz not null default now(),
  unique(store_id, day, title)
);

alter table public.launch_tasks enable row level security;
create policy "Users can manage own launch_tasks" on public.launch_tasks for all using (exists (select 1 from public.stores s where s.id = store_id and s.user_id = auth.uid()));

create table public.attributed_orders (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  channel_id uuid references public.channels(id) on delete set null,
  shopify_order_id text not null,
  order_name text not null,
  total_price numeric(12,2) not null,
  currency text not null default 'USD',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referring_site text,
  landing_site text,
  ordered_at timestamptz not null,
  created_at timestamptz not null default now(),
  unique(store_id, shopify_order_id)
);

alter table public.attributed_orders enable row level security;
create policy "Users can view own attributed_orders" on public.attributed_orders for select using (exists (select 1 from public.stores s where s.id = store_id and s.user_id = auth.uid()));

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  store_id uuid not null references public.stores(id) on delete cascade,
  provider text not null check (provider in ('razorpay', 'stripe')),
  provider_order_id text not null unique,
  provider_payment_id text,
  plan_tier text not null check (plan_tier in ('launch_kit', 'dfy', 'growth')),
  amount numeric(12,2) not null,
  currency text not null check (currency in ('INR', 'USD')),
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed')),
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

alter table public.orders enable row level security;
create policy "Users can view own billing orders" on public.orders for select using (auth.uid() = user_id);
create policy "Admins can view all billing orders" on public.orders for select using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
