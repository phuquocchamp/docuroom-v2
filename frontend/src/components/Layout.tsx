import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"

function Layout() {
  return (
    <div>
        <div className="flex">
            <Sidebar/>
        </div>
        <div className="ml-16 md:ml-56">
        <Header/>
        <Outlet/>
        </div>
    </div>
  )
}

export default Layout