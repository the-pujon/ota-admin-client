import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useRedirectHelper = (targetRoute: string) => {
  const { currentUser } = useAppSelector((state) => state.authUI);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof currentUser === "undefined") {
      return; 
    }
    if (!currentUser) {
      router.push('/');
    } else {
      router.push(targetRoute);
    }

    setLoading(false);
  }, [currentUser, targetRoute, router]);

  return { loading }; 
};

export default useRedirectHelper;

