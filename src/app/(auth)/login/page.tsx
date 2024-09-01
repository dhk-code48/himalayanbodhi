import React from "react";
import { signIn } from "@/auth";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/Icons";

const AuthLoginPage = () => {
  return (
    <form
      className="my-10 flex size-full flex-col items-center justify-center space-y-3"
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <h1 className="text-xl font-bold">Himalayan Bodhi</h1>
      <h3>Login to Get Shopping with Himalayan Bodhi</h3>
      <Button type="submit">
        <Icons.google className="text-primary-foreground" />
        Continue with Google
      </Button>
    </form>
  );
};

export default AuthLoginPage;
