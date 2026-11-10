import { useEffect, useState } from "react";
import { getAuth, User } from "firebase/auth";

const auth = getAuth();

interface UseAdminCheckResult {
  isAdmin: boolean;
  loading: boolean;
}

const useAdminCheck = (): UseAdminCheckResult => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (!auth.currentUser) {
        setLoading(false);
        return;
      }

      try {
        const idTokenResult = await auth.currentUser.getIdTokenResult(true);
        setIsAdmin(!!idTokenResult.claims.admin);
        //console.log("Admin hook is being used")
      } catch (error) {
        console.error("Error fetching ID token:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStatus();
  }, []);

  return { isAdmin, loading };
};

export default useAdminCheck;
