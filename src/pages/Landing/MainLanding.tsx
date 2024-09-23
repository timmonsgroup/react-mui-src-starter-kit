import { type FC, type ReactNode } from 'react';
import {
  type CardProps, Card, CardContent, Container, Divider, Typography
} from '@mui/material';
import { SubHeader } from '@timmons-group/shared-react-components';
import { useAuth } from '@timmons-group/shared-react-auth';
import PermissionFilter from '@timmons-group/shared-react-permission-filter';

import { appBarHeight } from "@root/muiTheme";
import { ACLS } from '@constants';
import PeopleGrid from '@components/MRTGrid';

const MainLanding: FC = () => {
  const { authState: { user } } = useAuth();

  return (
    <>
      <SubHeader
        title={`Welcome ${user?.name ?? user?.email}`}
        /*
        // @ts-ignore */
        sx={{ top: `${appBarHeight}px` }}
      />
      <Container maxWidth="xl" sx={{ marginTop: "8px" }}>
        <LandingCard title="A Grid of People">
          <PermissionFilter permission={ACLS.CAN_VIEW_GRID}>
            <PeopleGrid />
          </PermissionFilter>
        </LandingCard>
      </Container>
    </>
  );
};

interface LandingCardProps extends CardProps {
  title: string;
  children: ReactNode;
}

const LandingCard: FC<LandingCardProps> = ({ title, children, ...props }) => {
  return (
    <Card {...props}>
      <CardContent>
        <Typography variant='subHeader'>{title}</Typography>
      </CardContent>
      <Divider />
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

export default MainLanding;