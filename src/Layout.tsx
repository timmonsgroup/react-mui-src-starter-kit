import { Outlet } from "react-router-dom";

import { Modal } from "@timmons-group/shared-react-components";
import { Box } from "@mui/material";
import { FC, useEffect, useState } from "react";

import { AUTH_STATES, useAuth } from "@timmons-group/shared-react-auth";

import AppBar from "@timmons-group/shared-react-app-bar";
import LCWPPLogo from "./assets/logo.png";
import { ACLS, AREA_SLUG, MobileMenuWidthBreakpoint } from "@constants";

type NavLink = {
  title: string;
  href: string;
  permission?: string;
};

const navLinks: NavLink[] = [
  { title: "Home", href: "/" },
  { title: "A Form", href: AREA_SLUG },
  { title: "Breweries", href: '/breweries' },
  {
    title: "Dashboard",
    href: "/dashboard",
    permission: ACLS.CAN_VIEW_DASHBOARD,
  }
];

interface LayoutProps {
  title?: string;
  rightRender?: FC;
}

type BuildInfo = {
  frontendVersion: string;
  packageVersion: string;
};

const Layout: FC<LayoutProps> = () => {
  const profileUrl = `//${window.location.hostname}/user/organization/`;
  const [buildVersion, setBuildVersion] = useState<BuildInfo>({
    frontendVersion: "",
    packageVersion: "",
  });
  // The useProvideAuth in useAuth.js contains the exposed properties and methods
  const { login, logout, refresh, authState } = useAuth();

  useEffect(() => {
    // I need to fetch buildInfo.json to get the build number
    const fetchBuild = async () => {
      try {
        const response = await fetch("/buildInfo.json");
        const data = await response.json();
        setBuildVersion(data);
      } catch (error) {
        console.warn("Error fetching buildInfo.json", error);
      }
    };
    fetchBuild();
  }, []);

  return (
    <>
      <Box
        component="p"
        className={buildVersion ? "version" : "hidden"}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
      >
        v
        {buildVersion
          ? `${buildVersion.frontendVersion}.${buildVersion.packageVersion}`
          : ""}
      </Box>
      <AppBar
        navLinks={navLinks}
        mobileWidth={MobileMenuWidthBreakpoint}
        onLogin={() => login(`appAfter=lcwpp`)}
        onLogout={() => logout()}
        logoUrl={LCWPPLogo}
        showLoggingIn={authState?.state === AUTH_STATES.LOGGING_IN}
        userLinks={
          [
            {
              title: "Profile",
              href: profileUrl,
            },
          ]
        }
      />
      <Outlet />
      <Modal
        open={authState?.state === AUTH_STATES.TOKEN_STALE}
        okLabel="Continue"
        cancelLabel="Log Out"
        onCancel={logout}
        onOk={refresh}
        okColor="progressive"
      >
        <Box component="p" className="stale-token">
          It looks like your session is idle and your access token has expired.
          Click continue to keep using the system.{" "}
        </Box>
      </Modal>
      <Modal
        open={authState?.state === AUTH_STATES.REFRESHING_TOKEN}
        hideOk={true}
        hideCancel={true}
        okColor="progressive"
      >
        <Box component="p" className="stale-token">
          Refreshing your session...
        </Box>
      </Modal>
    </>
  );
};

export default Layout;
