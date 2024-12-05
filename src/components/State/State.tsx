"use client";
import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Menu from "../Menu/Menu";
import { usePathname, useRouter } from "next/navigation";
import Loading from "../Loading/Loading";
import { showAlert } from "../SweetAlert/Alert";
import { clearMessage } from "@/store/slices/messageSlice/messageSilce";
import { setAuthUser } from "@/store/thunks/thunkAuth/thunkAuth";

const State = () => {
  const authUser = useAppSelector((state) => state.authUser);
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
    dispatch(setAuthUser(user?.signInDetails?.loginId || ""));
  }, [user]);

  useEffect(() => {
    if (authUser.user) {
      if (authUser.user.role === "OWNER") {
        const permisions = ["/Zones", "/"];
        if (!permisions.includes(pathname)) {
          router.push("/");
        }
      }
    }
  }, [pathname, authUser.user]);

  return (
    <>
      {authUser.loading && <Loading />}
      <Menu />
    </>
  );
};

export default State;
