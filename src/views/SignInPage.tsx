import { PageTemplate, SignInForm } from "../components";
import { useAuthApi } from "../hooks";

export function SignInPage() {
  const api = useAuthApi();

  // password: 123456
  // email: amanda-cattelan@tuamaeaquelaursa.com

  return (
    <PageTemplate>
      <h1>Sign In</h1>

      <SignInForm
        onFormSubmit={async (value) => {
          await api.signIn(value);
        }}
      />
    </PageTemplate>
  );
}
