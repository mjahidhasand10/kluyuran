"use client";
import { FC, useEffect } from "react";
import { Provider as ReduxProvider, useDispatch } from "react-redux";
import { store } from "@/lib";
import { IChildren } from "@/types";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "@/features";

// This inner component listens to auth changes and updates Redux
const FirebaseAuthListener: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
};

export const Providers: FC<IChildren> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <FirebaseAuthListener />
      {children}
    </ReduxProvider>
  );
};
