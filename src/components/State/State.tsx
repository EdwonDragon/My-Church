"use client";
import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect } from "react";
import { setLoading, setUser } from "@/store/slices/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Menu from "../Menu/Menu";
import { usePathname, useRouter } from "next/navigation";
import Loading from "../Loading/Loading";
import { showAlert } from "../SweetAlert/Alert";
import { clearMessage } from "@/store/slices/messageSlice/messageSilce";

const State = () => {
  const globalState = useAppSelector((state) => state.user);
  const message = useAppSelector((state) => state.message);
  const { user } = useAuthenticator();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (message.message) {
      showAlert({
        title: message.title,
        message: message.message,
        type: message.type,
      });
      dispatch(clearMessage());
    }
  }, [message]);

  useEffect(() => {
    if (!globalState.user) {
      dispatch(setLoading());
      dispatch(setUser(user));
    }
  }, [globalState.user]);

  useEffect(() => {
    if (globalState.user?.role) {
      const permisions = ["/Conferences", "/", "/Modules"];
      if (!permisions.includes(pathname)) {
        router.push("/");
      }
    }
  }, [pathname]);

  return (
    <>
      {globalState.isLoading && <Loading />}
      <Menu />
    </>
  );
};

export default State;
