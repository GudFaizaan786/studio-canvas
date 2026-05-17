import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Post {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  category: string;
  type: string;
  image_url: string | null;
  external_url: string | null;
  read_time: string | null;
  author_id: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

interface Filters {
  type?: string;
  category?: string;
}

export const usePosts = (filters: Filters = {}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    let q = supabase.from("posts").select("*").order("created_at", { ascending: false });
    if (filters.type) q = q.eq("type", filters.type);
    if (filters.category) q = q.eq("category", filters.category);
    const { data, error } = await q;
    if (!error && data) setPosts(data as Post[]);
    setLoading(false);
  }, [filters.type, filters.category]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, refetch: fetchPosts };
};
