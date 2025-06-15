
-- 1. Create a user profiles table linked to auth.users
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  email text not null,
  full_name text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 2. Add RLS (users only access their own profile)
alter table public.profiles enable row level security;

create policy "Users can view their profiles"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert their profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 3. Automatically add a row to profiles when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
