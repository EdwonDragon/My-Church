"use client";
import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect } from "react";
import { setLoading, setUser } from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Menu from "../Menu/Menu";
import { usePathname, useRouter } from "next/navigation";
import Loading from "../Loading/Loading";

const State = () => {
  const globalState = useAppSelector((state) => state.user);
  const { user } = useAuthenticator();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (!globalState.user) {
      dispatch(setLoading());
      dispatch(setUser(user));
    }
  }, []);

  useEffect(() => {
    const permisions = ["/Conferences", "/", "/Modules"];
    // Aquí verificamos si el userId es el que estamos buscando
    if (!permisions.includes(pathname)) {
      router.push("/");
    }
  }, [pathname]); // Dependencia para que el efecto se ejecute cuando cambie userId o pathname

  return (
    <>
      {globalState.isLoading && <Loading />}
      <Menu />
    </>
  );
};

export default State;
