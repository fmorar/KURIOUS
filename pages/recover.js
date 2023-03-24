import { AuthContext } from "../context/authContext";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

function LoginPage({ redirect }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { authData ,setAuthData } = useContext(AuthContext)

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      "https://082130f7-44ca-4ec1-9568-3b923c3b0e5c.mock.pstmn.io/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      setAuthData(data)
      router.push("/dashboard")
    } else {
      // display error message here
      console.error("Wrong username or password");
    }
  };

  return (
    <div className="w-full font-sans p-4 bg-white sm:p-6 md:p-8">
      <div className="flex flex-col justify-center items-center">
      <img className="m-auto" src="/kurious.png" alt="logo"></img>
      <form onSubmit={handleSubmit} className="w-[425px] space-y-6 mt-4" action="#">
        
        <h5 className="text-[28px] font-bold font-sans text-gray-900 text-center">Welcome back!</h5>
        <div>
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-[#EDF2F7] border border-gray-300 text-[#7A828A] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Type your e-mail"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="relative">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Type your password"
            className="bg-[#EDF2F7] border border-gray-300 text-[#7A828A] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <p className="font-semibold text-right text-sm mt-2" onClick={()=> router.push("/recover")}>Forgot your password?</p>
        </div>
        <div>
          <button
            type="submit"
            className="bg-[#00ADFF] m-auto w-full text-white h-[46px]"
          >
            Sign in
          </button>
        </div>
        <div className="flex text-[14px] font-semibold flex-row justify-center items-center space-x-2">
          <p className="text-[#718096]  ">Don´t you have an account?</p>
          <button
            onClick={()=> router.push("/register")}
            className=" text-[#16192C]"
          >
            Sign up
          </button>
        </div>
      </form>
      </div>
     
    </div>
  );
}

export default LoginPage;

export async function getServerSideProps(context) {
  // Check if the user is already authenticated
  const isAuthenticated = false; // Some code to check if the user is authenticated

  // If the user is already authenticated, redirect to the main page
  if (isAuthenticated) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
