import { useState } from "react";
import { supabase } from "../shared";

export function SignInPage() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Sign In</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const res = await supabase.auth.signInWithPassword({
            email: formValues.email,
            password: formValues.password,
          });

          console.log(res);
        }}
        noValidate
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
// 7K@H3R38ngQjxUy
// amanda-cattelan@tuamaeaquelaursa.com
