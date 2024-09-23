import { type FC } from 'react';
import { Help } from '@mui/icons-material';
import { currencyFormatter, SubHeader } from '@timmons-group/shared-react-components';

import { Box, Typography } from '@mui/material';
import DataPanel from '@components/DataPanel';
import AFakeForm from '@components/AFakeForm';
import { VFA_FORM_LAYOUT, VFAFormDef } from '@configs/form.demo.config';
import { useFormContext } from 'react-hook-form';
import { UseFormReturnWithSections } from '@models/form.model';
import { LayoutComponentRenderMethod, LayoutComponentsOptions } from '@components/LayoutParts';
import { decimalCurrencyNumber } from '@helpers/helpers';

const HelpIcon: FC = () => {
  return (
    <Help sx={{ fontSize: '18px', marginRight: '8px', position: 'relative', top: '4px' }} />
  );
}

const FormDataPasser: FC<any> = ({ component }) => {
  const allContext = useFormContext() as unknown as UseFormReturnWithSections;
  const { watch } = allContext.useFormObject

  // We create three watches so that our preview updates when the user types in the form
  const acres = watch("acres");
  const cost = watch("costPerAcre");

  if (!acres || !cost) {
    return null;
  }

  return (
    <Box >
      <Typography variant='sectionHeader'>
        {component.appearance.meta.title}
      </Typography>
      <Typography>
        Total Cost: {currencyFormatter(decimalCurrencyNumber(acres * cost).toString())}
      </Typography>
    </Box>
  );
}

const ExampleForm: FC = () => {
  const customComponentRenderer: LayoutComponentRenderMethod = (component) => {
    // console.log('customComponentRenderer', component);
    return <FormDataPasser component={component} />;
  }

  const layoutOptions: LayoutComponentsOptions = {
    renderers: {
      types: {
        customComponent: customComponentRenderer
      }
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <SubHeader
        title="A Form demonstration"
        /*
          // @ts-ignore */
        sx={{ top: '160px' }}
      />
      <>
        <DataPanel title="About This Form thing" expandable={true} headerProps={{ icon: <HelpIcon /> }}>
          <Typography>
            Just showing how we do forms
          </Typography>
        </DataPanel>
        <DataPanel title="Collaborators" expandable={true} style={{ marginTop: '16px' }}>
          <AFakeForm layout={VFA_FORM_LAYOUT} formDefinition={VFAFormDef} layoutOptions={layoutOptions}/>
        </DataPanel>
      </>

    </div>
  );
};

export default ExampleForm;