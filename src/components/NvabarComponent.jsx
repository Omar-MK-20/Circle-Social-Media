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
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/avatar.png';
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";


function NvabarComponent() {
    // const isLoggedIn = !!localStorage.getItem('token');

    const { isLoggedIn , setIsLoggedIn } = useContext(AuthContext);




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
                <Link to={'/'} viewTransition className="font-bold text-inherit">CIRLCE</Link>
            </NavbarBrand>

            <NavbarContent as="div" justify="end">
                {isLoggedIn ?
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger className='cursor-pointer'>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name="Jason Hughes"
                                size="sm"
                                src={avatar}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">zoey@example.com</p>
                            </DropdownItem>
                            <DropdownItem key="settings">My Settings</DropdownItem>
                            <DropdownItem key="team_settings">Team Settings</DropdownItem>
                            <DropdownItem key="analytics">Analytics</DropdownItem>
                            <DropdownItem key="system">System</DropdownItem>
                            <DropdownItem key="configurations">Configurations</DropdownItem>
                            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                            <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    :
                    <>
                        <NavbarItem>
                            <Button onPress={() => { navigate('/login', { viewTransition: true }) }} color='primary' variant="flat">
                                Login
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button onPress={() => { navigate('/register', { viewTransition: true }) }} color="warning" variant="flat">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </>
                }
            </NavbarContent>
        </Navbar>
    );
}


export default NvabarComponent