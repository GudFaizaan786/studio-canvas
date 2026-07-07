import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const GoogleMark = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.4 5.4 2.5 13.2l7.9 6.1C12.2 13.3 17.6 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.4 5.7c4.3-4 6.8-9.9 6.8-17.4z" />
    <path fill="#FBBC05" d="M10.4 28.3c-.5-1.4-.8-2.9-.8-4.3s.3-2.9.8-4.3l-7.9-6.1C.9 16.8 0 20.3 0 24s.9 7.2 2.5 10.4l7.9-6.1z" />
    <path fill="#34A853" d="M24 48c6.2 0 11.5-2 15.3-5.5l-7.4-5.7c-2 1.4-4.7 2.3-7.9 2.3-6.4 0-11.8-3.8-13.6-9.8l-7.9 6.1C6.4 42.6 14.6 48 24 48z" />
  </svg>
);

const AuthPage = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleGoogle = async () => {
    setGoogleBusy(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) {
      toast.error(error.message);
      setGoogleBusy(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { full_name: name, display_name: name },
          },
        });
        if (error) throw error;
        toast.success("Account created — check your email to confirm.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back.");
        navigate("/");
      }
    } catch (err: any) {
      toast.error(err?.message || "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="glass-card p-8 w-full max-w-md">
        <Link to="/" className="text-xl font-display font-bold mb-2 inline-block">
          <span className="text-[hsl(var(--silver))]">GS</span>
          <span className="text-secondary">origins</span>
        </Link>
        <span className="kicker block mt-3">{mode === "login" ? "Welcome back" : "Join us"}</span>
        <h1 className="text-2xl font-bold mt-1 mb-2">
          {mode === "login" ? "Sign in to GSorigins" : "Create your account"}
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          {mode === "login" ? "Pick up where you left off." : "Grow with the GSorigins community."}
        </p>

        <Button type="button" variant="outline" className="w-full gap-2" onClick={handleGoogle} disabled={googleBusy}>
          {googleBusy ? <Loader2 className="animate-spin" size={16} /> : <GoogleMark />}
          Continue with Google
        </Button>

        <div className="flex items-center gap-3 my-5">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground uppercase tracking-wider">or continue with email</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          )}
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>
          <Button type="submit" disabled={busy} className="w-full mt-2">
            {busy && <Loader2 className="animate-spin" size={16} />}
            {mode === "login" ? "Sign in" : "Create account"}
          </Button>
        </form>

        <p className="text-sm text-center text-muted-foreground mt-6">
          {mode === "login" ? "New to GSorigins? " : "Already have an account? "}
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-secondary font-medium hover:underline"
          >
            {mode === "login" ? "Create one" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
