// Third party imports
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth, AUTH_STATES } from '@timmons-group/shared-react-auth';
import { ContainerWithCard } from '@timmons-group/shared-react-components';
import PermissionFilter from '@timmons-group/shared-react-permission-filter';

// Local imports
import Layout from './Layout';
import Home from '@pages/Home';
import { ACLS, AREA_SLUG } from '@constants';
import MainLanding from '@pages/Landing/MainLanding';
import ExampleForm from '@pages/ExampleForm/ExampleForm';
import BreweryGrid from '@pages/BreweryGrid';

// Create a generic not found component
const NotFound: FC = () => {
  return (
    <ContainerWithCard>
      <p>Not Found</p>
    </ContainerWithCard>
  );
};

const AppRoutes: FC = () => {
  const { authState } = useAuth();
  const loginStatus = authState?.state;

  if (
    loginStatus === AUTH_STATES.INITIALIZING || loginStatus === AUTH_STATES.LOGGING_IN ||
    loginStatus === AUTH_STATES.ERROR || loginStatus === AUTH_STATES.LOGGED_OUT
  ) {
    return (<PublicRoutes />);
  } else if (loginStatus === AUTH_STATES.LOGGED_IN || loginStatus === AUTH_STATES.TOKEN_STALE || loginStatus === AUTH_STATES.REFRESHING_TOKEN) {
    return (<PrivateRoutes />);
  }

  return (<p>Error: {loginStatus} is an invalid state</p>)
};

const PublicRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path={`/${AREA_SLUG}`} element={
            <ExampleForm />
        } />
        <Route path={`/breweries`} element={
            <BreweryGrid />
        } />
      </Route>
    </Routes>
  )
}

const PrivateRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<MainLanding />} />
        <Route path={`/${AREA_SLUG}`} element={
          <PermissionFilter permission={ACLS.CAN_VIEW_A_FORM}>
            <ExampleForm />
          </PermissionFilter>
        } />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
