import { useIsAdmin } from "./hooks/useHashRoute";
import { useSiteData } from "./hooks/useSiteData";
import { useAuth } from "./hooks/useAuth";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import PublicPage from "./pages/PublicPage";

export default function App() {
  const { data, setData, loading } = useSiteData();
  const isAdmin = useIsAdmin();
  const { user, ready } = useAuth();

  if (isAdmin) {
    if (!ready) return <p className="app-loading">Loading…</p>;
    if (!user) return <LoginPage />;
    return (
      <AdminPage
        data={data}
        onChange={setData}
        onPreview={() => (location.hash = "")}
        userEmail={user.email ?? ""}
      />
    );
  }

  if (loading) return <p className="app-loading">Loading…</p>;
  return <PublicPage data={data} />;
}
