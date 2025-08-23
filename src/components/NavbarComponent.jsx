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
    Switch,
    addToast,
} from "@heroui/react";
import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContextProvider";




export const MoonIcon = (props) => {
    return (
        <svg
            aria-hidden="true"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
                fill="currentColor"
            />
        </svg>
    );
};

export const SunIcon = (props) => {
    return (
        <svg
            aria-hidden="true"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <g fill="currentColor">
                <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
                <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
            </g>
        </svg>
    );
};




function NavbarComponent() {

    const [isLightMode, setIsLightMode] = useState(localStorage.theme ? localStorage.theme === 'light' : !window.matchMedia("(prefers-color-scheme: dark)").matches)


    const { isLoggedIn, setIsLoggedIn, userData } = useContext(AuthContext);
    const navigate = useNavigate()



    function handelDarkMode() {
        if ('theme' in localStorage) {
            if (localStorage.theme === 'dark') {
                document.documentElement.classList.remove('dark');
                localStorage.theme = 'light';
                setIsLightMode(true)
            }
            else {
                document.documentElement.classList.add('dark');
                localStorage.theme = 'dark';
                setIsLightMode(false);
            }
        }
        else {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                document.documentElement.classList.remove('dark');
                localStorage.theme = 'light';
                setIsLightMode(true)
                // console.log(window.matchMedia("(prefers-color-scheme: dark)").matches)
            }
            else {
                document.documentElement.classList.add('dark');
                localStorage.theme = 'dark';
                setIsLightMode(false);
                // console.log(window.matchMedia("(prefers-color-scheme: dark)").matches)
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
                <Switch
                    defaultSelected
                    color="secondary"
                    size="sm"
                    thumbIcon={({ isSelected, className }) =>
                        isSelected ? <SunIcon className={className} /> : <MoonIcon className={className} />
                    }
                    isSelected={isLightMode}
                    onChange={handelDarkMode}
                >
                </Switch>
            </NavbarBrand>

            <NavbarBrand className='justify-center'>
                <Link to={'/'} viewTransition className="font-bold text-xl font-serif">LoopIn</Link>
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
                            <DropdownItem onPress={() => navigate('/settings', { viewTransition: true })} key="profile" className="h-14 gap-2">
                                <p className="font-semibold">{userData.name}</p>
                                <p className="font-semibold">{userData.email}</p>
                            </DropdownItem>
                            <DropdownItem onPress={() => { navigate(`/profile/${userData._id}`, { viewTransition: true }) }} key="settings">My Posts</DropdownItem>
                            <DropdownItem onPress={() => { navigate('', { viewTransition: true }) }} key="feedPage">Feed Page</DropdownItem>
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