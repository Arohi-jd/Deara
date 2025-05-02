-- Enable storage
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Drop existing policies if they exist
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Authenticated users can upload images" on storage.objects;
drop policy if exists "Users can update their own uploads" on storage.objects;
drop policy if exists "Users can delete their own uploads" on storage.objects;

-- Set up storage policies for product-images bucket
-- Allow public read access
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'product-images' );

-- Allow authenticated users to upload images
create policy "Authenticated users can upload images"
on storage.objects for insert
with check (
  bucket_id = 'product-images' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = 'products' AND
  (storage.extension(name) = 'jpg' OR
   storage.extension(name) = 'jpeg' OR
   storage.extension(name) = 'png' OR
   storage.extension(name) = 'gif')
);

-- Allow users to update their own uploads
create policy "Users can update their own uploads"
on storage.objects for update
using (
  bucket_id = 'product-images' AND
  auth.uid() = owner
);

-- Allow users to delete their own uploads
create policy "Users can delete their own uploads"
on storage.objects for delete
using (
  bucket_id = 'product-images' AND
  auth.uid() = owner
); 