import { Session } from "@supabase/supabase-js";
import { User } from "../../types";
import { Client } from "./Api";

type UserSignIn = {
  email: string;
  password: string;
};

type UserSignUp = UserSignIn & { [K in keyof User]: NonNullable<User[K]> };

type SessionWithUser = Session & { user: { user_metadata: User } };

export class AuthApi {
  private client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  async signIn(user: UserSignIn) {
    const res = await this.client.auth.signInWithPassword(user);

    return res;
  }

  async signUp(user: UserSignUp) {
    console.log({ user });
    const res = await this.client.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          username: user.username,
          baby_name: user.babyName,
          baby_weight: user.babyWeight,
          baby_length: user.babyLength,
          baby_birthdate: user.babyBirthdate,
        },
      },
    });

    return res;
  }

  async signOut() {
    const res = await this.client.auth.signOut();

    return res;
  }

  subscribeSession(onSession: (session: SessionWithUser | null) => any) {
    this.client.auth.getSession().then(({ data: { session } }) => {
      onSession(sessionToSessionWithUser(session));
    });

    const {
      data: { subscription },
    } = this.client.auth.onAuthStateChange((_event, session) => {
      onSession(sessionToSessionWithUser(session));
    });

    return subscription;
  }
}

function sessionToSessionWithUser(
  session: Session | null
): SessionWithUser | null {
  if (!session) {
    return null;
  }

  return {
    ...session,
    user: {
      ...session.user,
      user_metadata: {
        email: session.user.user_metadata.email,
        username: session.user.user_metadata.username,
        babyName: session.user.user_metadata.baby_name,
        babyWeight: session.user.user_metadata.baby_weight,
        babyLength: session.user.user_metadata.baby_length,
        babyBirthdate: new Date(session.user.user_metadata.baby_birthdate),
      },
    },
  };
}
