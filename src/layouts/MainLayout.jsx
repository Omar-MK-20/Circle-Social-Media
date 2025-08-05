import { Outlet } from "react-router-dom"
import NvabarComponent from "../components/NvabarComponent"

function MainLayout() {
    return (
        <div>
            <NvabarComponent />
            <h1 className="text-2xl">MainLayout</h1>
            <Outlet />
        </div>
    )
}

export default MainLayout