import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/authContext";

function Dashboard({ redirect }) {
  const { authData } = useContext(AuthContext);

  return (
    <div className="w-full font-sans p-4 bg-white sm:p-6 md:p-8">
      <p>You are logged in!!</p>
      {JSON.stringify(authData)}
    </div>
  );
}

export default Dashboard;
