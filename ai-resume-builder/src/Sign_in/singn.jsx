import { SignIn, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SignInPage() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isSignedIn) {
      const redirectPath = location.state?.redirectTo || "/app/dashboard";
      navigate(redirectPath);
    }
  }, [isSignedIn, navigate, location]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <SignIn appearance={{ baseTheme: "light" }} />
    </div>
  );
}
