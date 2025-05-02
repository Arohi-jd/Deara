-- Add created_by column to products table
ALTER TABLE products
ADD COLUMN created_by UUID REFERENCES auth.users(id);

-- Add RLS policy for products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to insert products
CREATE POLICY "Users can insert their own products"
ON products
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = created_by);

-- Create policy to allow users to update their own products
CREATE POLICY "Users can update their own products"
ON products
FOR UPDATE
TO authenticated
USING (auth.uid() = created_by);

-- Create policy to allow users to delete their own products
CREATE POLICY "Users can delete their own products"
ON products
FOR DELETE
TO authenticated
USING (auth.uid() = created_by);

-- Create policy to allow public read access
CREATE POLICY "Public can view products"
ON products
FOR SELECT
TO public
USING (true); 