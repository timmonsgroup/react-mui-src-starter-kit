import type { BaseSyntheticEvent, FC } from "react";
import { type FieldValues, useFormContext } from "react-hook-form";
import { Modal } from "@timmons-group/shared-react-components";
import { ConfigForm } from "@timmons-group/config-form";
import { Box, CircularProgress, type SxProps } from "@mui/material";

import type { FormDefinition, UseFormReturnWithSections } from "@models/form.model";
import { LayoutComponents, type LayoutComponentsOptions } from "@components/LayoutParts";
import { AppButton } from "@components/AppButton";

type FormModalProps = {
  title?: string,
  data?: Record<string, any>,
  formDefinition: FormDefinition,
  open: boolean,
  saving?: boolean,
  onOk?: (evt: FieldValues) => void
  onCancel?: () => void
  cancelLabel?: string
  okLabel?: string
  layoutOptions?: LayoutComponentsOptions,
  parseOptions?: Record<string, any>,
  modalProps?: Record<string, any>
};

export type ModalWithFormProps = FormModalProps & {
  layout: Record<string, any>,
  parseOptions?: Record<string, any>
  formOptions?: Record<string, any>
};

const ModalWithForm: FC<ModalWithFormProps> = ({ layout, parseOptions, data, formOptions, ...props }) => {
  return (
    <ConfigForm formLayout={layout} data={data} parseOptions={parseOptions} formOptions={formOptions}>
      <ModalForm {...props} />
    </ConfigForm>
  );
}


const ModalForm: FC<FormModalProps> = ({ title, formDefinition, open, onOk, onCancel, saving, cancelLabel, okLabel, layoutOptions, modalProps }) => {
  const allContext = useFormContext() as unknown as UseFormReturnWithSections;
  const { sections, formProcessing, useFormObject } = allContext;
  const { handleSubmit, formState } = useFormObject;
  const allFields = sections.map((section: Record<string, any>) => section.fields).flat();
  if (!open) {
    return null;
  }

  if (formProcessing) {
    return <div>Processing...</div>;
  }

  const preSubmit = (evt: BaseSyntheticEvent) => {
    if (formState.isValid && onOk) {
      handleSubmit(onOk)(evt);
    }
  };

  const boxSX = {
    mt: 4,
    textAlign: 'center'
  };

  return (
    <Modal
      title={title || "Form"}
      open={open}
      hideActions={true}
      onCancel={onCancel}
      {...modalProps}
    >
      <>
        <LayoutComponents
          allFields={allFields}
          components={formDefinition.components}
          baseAppearance={formDefinition.baseAppearance}
          options={layoutOptions}
        />
        {saving &&
          <LoadingIndicator />
        }
      </>
      <Box sx={boxSX}>
        <AppButton
          color="regressive"
          sx={{ width: '110px' }}
          onClick={onCancel}
          disabled={formProcessing || saving}
        >{cancelLabel ?? "Cancel"}</AppButton>
        <AppButton
          sx={{ marginLeft: 4, width: '110px' }}
          color="progressive"
          disabled={formProcessing || !formState.isValid || saving}
          onClick={preSubmit}
        >{okLabel ?? "Ok"}</AppButton>
      </Box>
    </Modal>
  );
}

const loadingBoxSX: SxProps = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  backgroundColor: 'black',
  opacity: '0.35',
  overflow: "hidden",
  textAlign: 'center'
};

const LoadingIndicator: FC = () => {
  return (
    <Box sx={loadingBoxSX}>
      <CircularProgress size={100} sx={{ top: '50%', left: '50%' }} />
    </Box>
  );
}
export default ModalWithForm;