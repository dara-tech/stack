import React from "react";
import { useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

const Switch = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <div
      className={`switch ${isDarkMode ? "light" : "dark"}flex flex-col item-center p-1 h-8 w-8 ring-2 rounded-full`}
      onClick={toggleColorScheme}
    >
      <div className={`ball ${isDarkMode ? "dark" : "light"}  `}></div>
      {isDarkMode ? <IconSun stroke={1.5} /> : <IconMoon stroke={1.5} />}
    </div>
  );
};

export default Switch;
