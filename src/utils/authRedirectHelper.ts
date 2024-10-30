// import { useAppSelector } from "@/redux/hooks";
// import { useRouter } from "next/navigation";
// import { useEffect,useState } from "react";

// const useRedirectHelper = (targetRoute:string)=> {
//    const { currentUser } = useAppSelector((state) => state.authUI);
//     const router = useRouter();
//     const [loading, setLoading] = useState(true);
//      useEffect(()=>{
//        if (typeof currentUser === "undefined") {
//           return;  
//         }
//         if(!currentUser){
//           router.push('/')
//         }else{
//           router.push(targetRoute)
//         }
//     setLoading(true);
//   }, [currentUser, targetRoute, router]);
 

// }

// export default useRedirectHelper;

import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useRedirectHelper = (targetRoute: string) => {
  const { currentUser } = useAppSelector((state) => state.authUI);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the code is running on the client side
    if (typeof window === "undefined") return;

    // Ensure `currentUser` is defined before performing any navigation
    if (typeof currentUser === "undefined") {
      return; // Wait until currentUser is loaded
    }

    // Perform navigation based on the currentUser state
    if (!currentUser) {
      router.push('/');
    } else {
      router.push(targetRoute);
    }

    // Set loading to false once navigation logic has run
    setLoading(false);
  }, [currentUser, targetRoute, router]);

  return { loading }; // Return the loading state for use in the component if needed
};

export default useRedirectHelper;

