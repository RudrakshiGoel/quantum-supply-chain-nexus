
-- 1. Enable Google and GitHub OAuth providers in Supabase UI
-- This can only be done in Supabase dashboard here: https://supabase.com/dashboard/project/gwdxcabvqhhyvqkgcshf/auth/providers

-- 2. Announcements table for storing posts from users
CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Allow anyone to read all announcements, authenticated users can insert/delete their own
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Anyone (even not logged in) can read
CREATE POLICY "Public can read announcements"
  ON public.announcements FOR SELECT
  USING (true);

-- Users can insert their own announcements
CREATE POLICY "Users can create announcements"
  ON public.announcements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own announcements
CREATE POLICY "Users can delete their announcements"
  ON public.announcements FOR DELETE
  USING (auth.uid() = user_id);

