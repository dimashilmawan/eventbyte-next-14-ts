"use client";

import { Button } from "@/components/ui/button";
import { properGetUserById } from "@/lib/actions/proper.action";

export const Form = () => {
  const handleClientAction = async () => {
    const result = await properGetUserById("dwd");
    if (result.error) {
      alert(result.error);
    }
  };
  return (
    <form onSubmit={handleClientAction}>
      <Button type="submit">Click</Button>
    </form>
  );
};
