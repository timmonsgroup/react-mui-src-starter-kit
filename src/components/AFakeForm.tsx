import { BaseSyntheticEvent, type FC } from 'react'
import { LayoutComponents, LayoutComponentsOptions } from '@components/LayoutParts'
import { Button } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { FormDefinition, UseFormReturnWithSections } from '@models/form.model';
import { ConfigForm } from '@timmons-group/config-form';


type TheFormProps = {
  formDefinition: FormDefinition,
  layoutOptions?: LayoutComponentsOptions,
};

export type AFakeFormProps = TheFormProps & {
  data?: Record<string, any>,
  layout: Record<string, any>,
  parseOptions?: Record<string, any>
};

const AFakeForm: FC<AFakeFormProps> = ({ layout, parseOptions, data, ...props }) => {
  return (
    <ConfigForm formLayout={layout} data={data} parseOptions={parseOptions}>
      <TheForm {...props} />
    </ConfigForm>
  );
}

const TheForm: FC<TheFormProps> = ({ formDefinition, layoutOptions }) => {
  const allContext = useFormContext() as unknown as UseFormReturnWithSections;
  const { sections, formProcessing, useFormObject } = allContext;
  const { handleSubmit, formState } = useFormObject;
  const allFields = sections.map((section: Record<string, any>) => section.fields).flat();

  const onOk = (data: Record<string, any>) => {
    console.log('onOk', data);
  }

  const preSubmit = (evt: BaseSyntheticEvent) => {
    if (formState.isValid) {
      handleSubmit(onOk)(evt);
    }
  };

  return (
    <>
      <LayoutComponents
        allFields={allFields}
        components={formDefinition.components}
        baseAppearance={formDefinition.baseAppearance}
        options={layoutOptions}
      />
      <Button disabled={formProcessing} color="progressive" onClick={preSubmit}>SAVE</Button>
    </>
  )
}

export default AFakeForm;