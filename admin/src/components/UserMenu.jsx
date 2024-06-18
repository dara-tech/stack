import React from "react";
import { Menu, Button, rem } from "@mantine/core";
import { AiOutlineLogout } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { IconTrash } from "@tabler/icons-react";
import useStore from "../store";

function UserMenu({ user, theme }) {
  const { signOut } = useStore();

  const handleSignOut = () => {
    localStorage.removeItem("user");
    signOut();
  };

  return (
    <Menu>
      <Menu.Target>
        <Button
          variant="subtle"
          className={`flex items-center ${theme ? "text-gray-400" : "text-black"}`}
        >
          <img src={user?.image} alt="Profile" className="w-8 h-8 rounded-md" />
          <div className="flex flex-col items-start ml-2">
            <p className="font-medium">{user?.name}</p>
            <span className="text-sm font-light">{user?.accountType}</span>
          </div>
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item icon={<FaUser style={{ width: rem(14), height: rem(14) }} />}>
          Profile
        </Menu.Item>
        <Menu.Item
          icon={<AiOutlineLogout style={{ width: rem(14), height: rem(14) }} />}
          onClick={handleSignOut}
        >
          Logout
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger Zone</Menu.Label>
        <Menu.Item
          color="red"
          icon={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
        >
          Delete account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default UserMenu;
