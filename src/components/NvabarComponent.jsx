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
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContextProvider";
import { userApi } from "../services/userService";


function NvabarComponent() {
    // const isLoggedIn = !!localStorage.getItem('token');

    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const [ user, setUser ] = useState(null);


    async function handleUserData() {
        const data = await userApi.getUserProfile();
        if (data.error) {
            setUser({
                name: "",
                email: "Retry again",
                photo: "https://linked-posts.routemisr.com/uploads/default-profile.png",
            })
            return
        }
        setUser(data.user);
    }


    useEffect( () => 
    {
        if (isLoggedIn)
        {
            console.log("🚀 ~ NvabarComponent ~ isLoggedIn:", isLoggedIn);
            handleUserData()
        }

    }, [isLoggedIn])


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
                <Link to={'/'} viewTransition className="font-bold text-xl">CIRLCE</Link>
            </NavbarBrand>

            <NavbarContent as="div" justify="end">
                {isLoggedIn ?
                    user && 
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger className='cursor-pointer'>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name="Jason Hughes"
                                size="sm"
                                src={user.photo}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">{user.name}</p>
                                <p className="font-semibold">{user.email}</p>
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


export default NvabarComponent