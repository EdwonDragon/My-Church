"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect } from "react";
import { setLoading, setUser } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/hooks";
import Home from "./home/page";

export default function HomePage() {
  const { user } = useAuthenticator();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoading());
    dispatch(setUser(user));
  }, []);

  return (
    <main>
      <Home />
    </main>
  );
}
