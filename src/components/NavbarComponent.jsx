import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    addToast,
} from "@heroui/react";
import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContextProvider";


function NavbarComponent() {


    const { isLoggedIn, setIsLoggedIn, userData } = useContext(AuthContext);
    const navigate = useNavigate()


    
    function handelDarkMode() {
        if ('theme' in localStorage) {
            if (localStorage.theme === 'dark') {
                document.documentElement.classList.remove('dark');
                localStorage.theme = 'light';
            }
            else {
                document.documentElement.classList.add('dark');
                localStorage.theme = 'dark';
            }
        }
        else {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                localStorage.theme = 'light';
                document.documentElement.classList.remove('dark');
                console.log(window.matchMedia("(prefers-color-scheme: dark)").matches)
            }
            else {
                localStorage.theme = 'dark';
                document.documentElement.classList.add('dark');
                console.log(window.matchMedia("(prefers-color-scheme: dark)").matches)
            }
        }
    }


    function handleLogout() {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login', { viewTransition: true })
        addToast(
            {
                title: "Successful Logout",
                color: 'success'
            }
        )
    }






    return (
        <Navbar
            shouldHideOnScroll
            className="rounded-b-xl fixed"
        >
            <NavbarBrand>
                <button onClick={handelDarkMode} className='cursor-pointer'><i className="fa-solid fa-circle-half-stroke"></i></button>
            </NavbarBrand>

            <NavbarBrand className='justify-center'>
                <Link to={'/'} viewTransition className="font-bold text-xl">CIRCLE</Link>
            </NavbarBrand>

            <NavbarContent as="div" justify="end">
                {isLoggedIn ?
                    userData &&
                    <Dropdown placement="bottom-end" backdrop='blur'>
                        <DropdownTrigger className='cursor-pointer'>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name="Jason Hughes"
                                size="sm"
                                src={userData.photo}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="shadow">
                            <DropdownItem onPress={() => {navigate(`/profile/${userData._id}`, {viewTransition:true})}} key="profile" className="h-14 gap-2">
                                <p className="font-semibold">{userData.name}</p>
                                <p className="font-semibold">{userData.email}</p>
                            </DropdownItem>
                            <DropdownItem key="team_settings">Profile</DropdownItem>
                            <DropdownItem onPress={() => {navigate('', {viewTransition:true})}} key="settings">Feed Page</DropdownItem>
                            {/* <DropdownItem key="analytics">Analytics</DropdownItem> */}
                            {/* <DropdownItem key="system">System</DropdownItem> */}
                            {/* <DropdownItem key="configurations">Configurations</DropdownItem> */}
                            {/* <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
                            <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    :
                    <>
                        <NavbarItem>
                            <Button onPress={() => { navigate('/login', { viewTransition: true }) }} color='primary' variant="flat" size="sm">
                                Login
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button onPress={() => { navigate('/register', { viewTransition: true }) }} color="warning" variant="flat" size="sm">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </>
                }
            </NavbarContent>
        </Navbar>
    );
}


export default NavbarComponent