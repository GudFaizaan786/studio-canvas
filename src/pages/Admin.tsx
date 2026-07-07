import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit, LogOut, ArrowLeft, Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { usePosts, Post } from "@/hooks/use-posts";

const CATEGORIES = ["health", "technology", "motivation", "lifestyle", "sustainability", "general"];
const TYPES = ["blog", "resource", "download", "infographic", "video"];

const empty = {
  title: "",
  excerpt: "",
  content: "",
  category: "sustainability",
  type: "blog",
  image_url: "",
  external_url: "",
  read_time: "",
};

const AdminPage = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const { posts, refetch } = usePosts();
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground">Only administrators can access this panel.</p>
        <Link to="/"><Button variant="outline"><ArrowLeft size={16} /> Back to site</Button></Link>
      </div>
    );

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${user.id}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("post-images").upload(path, file);
      if (error) throw error;
      const { data } = supabase.storage.from("post-images").getPublicUrl(path);
      setForm((f) => ({ ...f, image_url: data.publicUrl }));
      toast.success("Image uploaded");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    setBusy(true);
    try {
      const payload = {
        ...form,
        excerpt: form.excerpt || null,
        content: form.content || null,
        image_url: form.image_url || null,
        external_url: form.external_url || null,
        read_time: form.read_time || null,
        author_id: user.id,
      };
      if (editingId) {
        const { error } = await supabase.from("posts").update(payload).eq("id", editingId);
        if (error) throw error;
        toast.success("Post updated");
      } else {
        const { error } = await supabase.from("posts").insert(payload);
        if (error) throw error;
        toast.success("Post published");
      }
      setForm(empty);
      setEditingId(null);
      refetch();
    } catch (err: any) {
      toast.error(err.message || "Save failed");
    } finally {
      setBusy(false);
    }
  };

  const handleEdit = (p: Post) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      excerpt: p.excerpt || "",
      content: p.content || "",
      category: p.category,
      type: p.type,
      image_url: p.image_url || "",
      external_url: p.external_url || "",
      read_time: p.read_time || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    refetch();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/90 backdrop-blur z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground"><ArrowLeft size={20} /></Link>
            <h1 className="text-xl font-display font-bold">
              <span className="text-[hsl(var(--silver))]">GS</span>
              <span className="text-secondary">origins</span> Admin
            </h1>
          </div>
          <Button variant="ghost" size="sm" onClick={signOut}><LogOut size={16} /> Sign out</Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
          <h2 className="font-bold text-lg mb-4">{editingId ? "Edit Post" : "New Post"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {TYPES.map((t) => <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Title *</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>

            <div className="space-y-2">
              <Label>Excerpt</Label>
              <Textarea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea rows={6} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
            </div>

            <div className="space-y-2">
              <Label>Cover Image</Label>
              <div className="flex gap-2 items-center">
                <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                {uploading && <span className="text-xs text-muted-foreground">Uploading...</span>}
              </div>
              {form.image_url && (
                <div className="mt-2 relative rounded-lg overflow-hidden border border-border">
                  <img src={form.image_url} alt="" className="w-full h-32 object-cover" />
                </div>
              )}
              <Input
                placeholder="...or paste image URL"
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>External URL</Label>
                <Input value={form.external_url} onChange={(e) => setForm({ ...form, external_url: e.target.value })} placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label>Read time / size</Label>
                <Input value={form.read_time} onChange={(e) => setForm({ ...form, read_time: e.target.value })} placeholder="5 min" />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={busy} className="flex-1">
                <Plus size={16} /> {editingId ? "Update Post" : "Publish Post"}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={() => { setEditingId(null); setForm(empty); }}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Posts list */}
        <div>
          <h2 className="font-bold text-lg mb-4">All Posts ({posts.length})</h2>
          <div className="space-y-3 max-h-[80vh] overflow-y-auto pr-2">
            {posts.length === 0 && (
              <p className="text-sm text-muted-foreground">No posts yet. Create your first post.</p>
            )}
            {posts.map((p) => (
              <div key={p.id} className="glass-card p-4 flex gap-3">
                <div className="w-16 h-16 shrink-0 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                  {p.image_url ? (
                    <img src={p.image_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon size={20} className="text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex gap-2 text-xs text-muted-foreground mb-1">
                    <span className="capitalize text-secondary font-medium">{p.type}</span>
                    <span>·</span>
                    <span className="capitalize">{p.category}</span>
                  </div>
                  <h3 className="font-semibold truncate">{p.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{p.excerpt}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(p)}><Edit size={14} /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(p.id)}><Trash2 size={14} /></Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
