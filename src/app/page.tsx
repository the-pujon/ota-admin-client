
import { Metadata } from "next";
import React from 'react';
import SignIn from "./auth/signin/page";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import store, { persistor } from '../redux/store';

export const metadata: Metadata = {
  title: "TripNest Admin",
  description: "Generated by TripNest Limited",
};

export default function Home() {
  return (
    <>
      <SignIn/>
   </>
  );
}
