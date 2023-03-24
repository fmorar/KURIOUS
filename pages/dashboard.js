import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/authContext";
import axios from "axios";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { MessagesIcon, NotesIcon, Files, Chatbot, Truck, Board } from "@/public/svgs";
import {Customer, Dashboard, Documents, Jenny, Messages, Notes} from "./components"


function Homepage({ redirect }) {
  const router = useRouter();
  const { authData } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dashboardPage, setDashboardPage] = useState("dashboard")


  
    useEffect(() => {
      const fetchUserData = async () => {
        const response = await axios.get(
          `https://082130f7-44ca-4ec1-9568-3b923c3b0e5c.mock.pstmn.io/users/${authData.id}`
        );
        setUserData(response.data);
      };
      typeof window !== 'undefined' &&  fetchUserData();
    }, []);
  

  

  return (
    <div>
      <header>
        <nav
          className="
          font-sans
          flex flex-wrap
          items-center
          justify-between
          border border-b-[#EDF2F7]
          w-full
          py-4
          md:py-0
          px-4
          text-lg text-gray-700
          bg-white
        "
        >
          <div>
            <a href="#">
              <img src="/kurious.png" width={156} height={57} />
            </a>
          </div>
          <div className="flex md:items-center w-auto" id="menu">
            <ul
              className="
              pt-0
              text-base text-gray-700
              flex
              justify-between items-center"
            >
              <li className="relative">
                <button
                  className="p-4 py-2 flex flex-row font-sans justify-center items-center space-x-2 text-[#16192C]"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img src="/profile.png" />
                  <p>Chasen</p>
                  {dropdownOpen ? <AiOutlineUp /> : <AiOutlineDown />}
                </button>
                {dropdownOpen && (
                  <div className="absolute bg-white z-10 shadow-md w-[214px] h-[142px] flex flex-col justify-around">
                    <button className="text-sm text-left px-4">Account</button>
                    <button className="text-sm text-left px-4">Pricing</button>
                    <button
                      onClick={() => router.push("/")}
                      className="text-sm text-[#DF4A40] text-left px-4"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </nav>
        <nav className="border px-8 border-b-[#EDF2F7]  space-x-8 h-[50px] items-center flex">
          <button onClick={()=> setDashboardPage("dashboard")} className="text-[#16192C] hover:text-[#20B7FF] flex flex-row space-x-2 items-center">
            <Board/>
            <p>Dashboard</p>
          </button>
          <button onClick={()=> setDashboardPage("jenny")} className="text-[#16192C] hover:text-[#20B7FF] flex flex-row space-x-2 items-center">
            <Chatbot />
            <p>Jenny</p>
          </button>
          <button onClick={()=> setDashboardPage("messages")} className="text-[#16192C] hover:text-[#20B7FF] flex flex-row space-x-2 items-center">
            <MessagesIcon />
            <p>Messages</p>
          </button>
          <button onClick={()=> setDashboardPage("notes")} className="text-[#16192C] hover:text-[#20B7FF] flex flex-row space-x-2 items-center">
            <NotesIcon />
            <p>Notes</p>
          </button>
          <button onClick={()=> setDashboardPage("documents")} className="text-[#16192C] hover:text-[#20B7FF] flex flex-row space-x-2 items-center">
            <Files />
            <p>Documents</p>
          </button>
          <button onClick={()=> setDashboardPage("customer")} className="text-[#16192C] hover:text-[#20B7FF] flex flex-row space-x-2 items-center">
            <Truck />
            <p>Customer</p>
          </button>
        </nav>
      </header>
      {(() => {
        switch (dashboardPage) {
          case 'dashboard':
            return <Dashboard />
          case 'jenny':
            return <Jenny/>
          case 'messages':
            return <Messages />
          case 'notes':
            return <Notes />
          case 'documents':
            return <Documents />
          case 'customer':
            return <Customer />
          default:
            return null
        }
      })()}
    </div>
  );
}

export default Homepage;
