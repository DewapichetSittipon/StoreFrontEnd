import { Outlet } from "react-router-dom";
import { useState, Dispatch, SetStateAction, useMemo, createContext } from "react";
import Navbar from "../components/NavbarAdmin";

type SigninContext = {
  showLoading: boolean;
  setShowLoading: Dispatch<SetStateAction<boolean>>;
};

export const PageBaseContext = createContext({} as SigninContext);

export default function PageBase() {
  const [showLoading, setShowLoading] = useState(false);

  const contextValue = useMemo(() => {
    return {
      showLoading,
      setShowLoading,
    }
  }, [showLoading, setShowLoading]);

  return (
    <>
      <PageBaseContext.Provider value={contextValue}>
        <Navbar />
        <Outlet />
      </PageBaseContext.Provider>
    </>
  );
}