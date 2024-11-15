import { useState } from "react";
import { useAuthApi } from "../hooks";

export function SignUpPage() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    username: "",
  });

  const api = useAuthApi();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Sign Up</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const res = await api.signUp({
            ...formValues,
            babyName: "baby",
            babyWeight: 3.5,
            babyLength: 50,
            babyBirthdate: new Date(),
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

        <div>
          <label htmlFor="email">Username</label>
          <input
            id="username"
            type="username"
            name="username"
            value={formValues.username}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
