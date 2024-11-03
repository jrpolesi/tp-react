import { supabase } from "../shared";

export function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the Home page!</p>

      <button
        onClick={() => {
          supabase.auth.signOut();
        }}
      >
        Log out
      </button>
    </div>
  );
}
