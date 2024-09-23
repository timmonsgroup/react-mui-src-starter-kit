/**
 * Form model
 * @description - Model for form data using react-hook-form and layout components, slightly modified from the layout models
 *
 */
import { UseFormReturn } from "react-hook-form";
import { LayoutComponent, LayoutDefinition, LayoutField } from "./layout.model";

// FormComponent is a LayoutComponent or a FormField
export type FormComponent = LayoutComponent | FormField;

// force the input property to be true
export type FormField = LayoutField & {
  label?: string;
  input: true;
}

// need a new type that extends the UseFormReturn type with sections
export type UseFormReturnWithSections = {
  sections: Record<string, any>[];
  formProcessing: boolean;
  forceReset: () => void;
  useFormObject: UseFormReturn;
}

// FormDefinition extends LayoutDefinition's components
export type FormDefinition = LayoutDefinition & {
  components: FormComponent[];
}