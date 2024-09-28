import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useRedirectHelper = (targetRoute:any)=> {
   const { currentUser } = useAppSelector((state) => state.authUI);
    const router = useRouter();
    useEffect(()=>{
       if (typeof currentUser === "undefined") {
      return;  
    }
        if(!currentUser){
          router.push('/')
        }else{
          router.push(targetRoute)
        }
    },[currentUser,targetRoute,router])
}

export default useRedirectHelper;