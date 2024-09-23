import { type FC, type ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useMutation } from '@tanstack/react-query';
import {
  type CardProps, Button, Card, CardContent, Container, Divider, Typography
} from '@mui/material';
import Grid, { Grid2Props } from '@mui/material/Unstable_Grid2';
import { SubHeader } from '@timmons-group/shared-react-components';
import { useAuth } from '@timmons-group/shared-react-auth';
import PermissionFilter from '@timmons-group/shared-react-permission-filter';

import { appBarHeight } from "@root/muiTheme";
import TheMap from '@components/TheMap';
import { ACLS, AREA_SLUG, mapConfig } from '@constants';
import RecentPlanningAreas from '@features/Landing/RecentPlanningAreas';
import CreatePlanningModal from '@features/Landing/CreateAreaModal';
import MapStoreContextProvider from '@components/MapStoreContextProvider';
import {
  NewPlanningArea, type PlanningArea, createPlanningArea
} from '@services/planningArea.service';

const cardGridProps: Grid2Props = {
  xs: 12,
  sm: 12,
  md: 6,
  lg: 6,
  alignSelf: 'stretch',
}

const MainLanding: FC = () => {
  const { authState: { user } } = useAuth();
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const goTo = useNavigate();
  const createArea = useMutation({
    mutationFn: async (area: NewPlanningArea) => {
      return createPlanningArea(area)
    },
    onSuccess: (madeArea: PlanningArea) => {
      goTo(`/${AREA_SLUG}/${madeArea.id}`);
      enqueueSnackbar('Planning Area created successfully', { variant: 'success' });
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  });

  return (
    <>
      <SubHeader
        title={`Welcome ${user?.name ?? user?.email}`}
        /*
        // @ts-ignore */
        sx={{ top: `${appBarHeight}px` }}
      />
      <Container maxWidth="xl" sx={{ marginTop: "8px" }}>
        <Grid container spacing={2}>
          <Grid {...cardGridProps}>
            <LandingCard title="CWPP Map">
              <MapStoreContextProvider initialConfig={mapConfig}>
                <TheMap configOverrides={mapConfig} />
              </MapStoreContextProvider>
            </LandingCard>
          </Grid>
          <Grid {...cardGridProps}>
            <LandingCard title="Quick Tools" sx={{ height: '100%' }}>
              <div style={{ textAlign: 'center' }}>
                <Button sx={{ width: '100%', maxWidth: '450px' }} onClick={() => setCreateModalOpen(true)} color="progressive">Create New Planning Area</Button>
              </div>
            </LandingCard>
          </Grid>
          <Grid width={'100%'}>
            <LandingCard title="Recent Activity">
              <PermissionFilter permission={ACLS.CAN_VIEW_PLANNING_AREA}>
                <RecentPlanningAreas />
              </PermissionFilter>
            </LandingCard>
          </Grid>
        </Grid>
      </Container>
      <CreatePlanningModal
        open={createModalOpen}
        saving={createArea.isPending}
        onSave={(area: NewPlanningArea) => createArea.mutate(area)}
        onCancel={() => setCreateModalOpen(false)}
      />
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