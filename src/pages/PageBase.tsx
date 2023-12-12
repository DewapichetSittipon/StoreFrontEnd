import { Outlet, useLocation } from "react-router-dom";
import { useState, Dispatch, SetStateAction, useMemo, createContext } from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import NavbarUser from "../components/NavbarUser";
import { Loading } from "../components";

type SigninContext = {
  showLoading: boolean;
  setShowLoading: Dispatch<SetStateAction<boolean>>;
};

export const PageBaseContext = createContext({} as SigninContext);

export default function PageBase() {
  const [showLoading, setShowLoading] = useState(false);
  const currentPath = useLocation();

  const contextValue = useMemo(() => {
    return {
      showLoading,
      setShowLoading,
    }
  }, [showLoading, setShowLoading]);

  return (
    <>
      <PageBaseContext.Provider value={contextValue}>
        {currentPath.pathname.includes('admin') ? <NavbarAdmin /> : <NavbarUser />}
        <Loading show={showLoading} />
        <Outlet />
      </PageBaseContext.Provider>
    </>
  );
}