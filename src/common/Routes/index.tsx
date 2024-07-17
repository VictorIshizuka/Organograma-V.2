import { Route, Routes as RoutesDomComponents } from "react-router-dom";

import { useAuth } from "@/modules/Auth/hook";

import { SignedRoutes } from "./signed";
import { NotSignedRoutes } from "./not-signed";

export const Routes = (): JSX.Element => {
  const { isSigned } = useAuth();

  return (
    <RoutesDomComponents>
      <Route
        path="/*"
        element={isSigned ? <SignedRoutes /> : <NotSignedRoutes />}
      />
      <Route path="/not-found" element={<p>NOT FOUND</p>} />
    </RoutesDomComponents>
  );
};
