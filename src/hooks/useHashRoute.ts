import { useEffect, useState } from "react";

/** The admin page lives at  /#admin  */
export function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(() => location.hash === "#admin");

  useEffect(() => {
    const onHash = () => setIsAdmin(location.hash === "#admin");
    addEventListener("hashchange", onHash);
    return () => removeEventListener("hashchange", onHash);
  }, []);

  return isAdmin;
}
