import React from 'react';
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconGauge,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import {
  Stack,
  Tooltip,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { BsPencilSquare } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import LangSwitch from './langSwitch';
import { useTranslation } from 'react-i18next';

const NavbarLink = ({ icon: Icon, label, active, onClick }) => {
  return (
    <Tooltip label={label} position='right' transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={clsx(
          "flex items-center gap-2 px-4 py-1.5 rounded-md",
          active ? "bg-black text-white" : ""
        )}
        data-active={active || undefined}
      >
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
        {label}
      </UnstyledButton>
    </Tooltip>
  );
};

const Sidebar = ({ close = () => {} }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname?.slice(1);

  const mockdata = [
    { icon: IconGauge, label: t("Dashboard"), to: "dashboard" },
    { icon: IconDeviceDesktopAnalytics, label: t("Analytics"), to: "analytics" },
    { icon: IconCalendarStats, label: t("Content"), to: "contents" },
    { icon: IconUser, label: t("Followers"), to: "followers" },
    { icon: BsPencilSquare, label: t("Create Post"), to: "write" },
    { icon: IconSettings, label: t("Settings") },
  ];

  const handleClick = (to) => {
    close();
    navigate(to);
  };

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={index}
      active={link.to === path}
      onClick={() => handleClick(link.to)}
    />
  ));

  return (
    <nav className='h-full w-full ms-1 flex flex-col gap-5 px-6 2xl:px-14 relative'>
      <p className='w-full flex flex-col py-2 px-12 bg-slate-600 rounded-md '>{t('MENU')}</p>
      <LangSwitch className="absolute top-2 right-20" />
      <Stack justify='center' gap={10}>
        {links}
      </Stack>
    </nav>
  );
};

export default Sidebar;
