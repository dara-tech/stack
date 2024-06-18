import React from "react";
import { Button, Drawer } from "@mantine/core";
import Switch from "./Switch";
import { useDisclosure } from "@mantine/hooks";
import { BiMenu } from "react-icons/bi";
import useStore from "../store";
import Sidebar from "./Sidebar";
import UserMenu from "./UserMenu";

const MobileDrawer = ({ theme }) => {
  const { user } = useStore();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <Sidebar close={close} />
        <div className="w-fit mt-10 ">
          <UserMenu user={user?.user} theme={theme} />
        </div>
      </Drawer>

      <Button variant="outline" onClick={open}>
        <BiMenu className="" />
      </Button>
    </>
  );
};

export default MobileDrawer;
