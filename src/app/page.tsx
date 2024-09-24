import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SignIn from "./auth/signin/page";

export const metadata: Metadata = {
  title: "TripNest Admin",
  description: "Generated by TripNest Limited",
};

export default function Home() {
  return (
    <>
      {/* <DefaultLayout>
        <ECommerce />
      </DefaultLayout> */}
      <SignIn>
      </SignIn>
    </>
  );
}
