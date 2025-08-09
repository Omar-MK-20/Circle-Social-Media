import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/avatar.png'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  addToast,
} from "@heroui/react";


function NvabarComponent() {


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

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link to={'/'} className="font-bold text-inherit">CIRLCE</Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
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
      </NavbarContent>
    </Navbar>
  );
}


export default NvabarComponent