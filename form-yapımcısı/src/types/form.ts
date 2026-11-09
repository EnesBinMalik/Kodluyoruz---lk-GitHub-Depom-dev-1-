export type FieldType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'email'
  | 'number'
  | 'checkbox'
  | 'radio'
  | 'date';

export interface SelectOption {
  id: string;
  label: string;
  value: string;
}

export interface ValidationRules {
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  pattern?: string;
  customErrorMsg?: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  helpText?: string;
  required: boolean;
  defaultValue?: string | boolean | string[];
  options?: SelectOption[]; // For select, radio
  rows?: number; // For textarea
  validation?: ValidationRules;
}

export interface FormConfig {
  id: string;
  title: string;
  description: string;
  submitButtonText: string;
  fields: FormField[];
  themeColor: string;
}

export interface ToolboxItemDefinition {
  type: FieldType;
  title: string;
  description: string;
  icon: string;
  defaultLabel: string;
  defaultPlaceholder?: string;
  defaultHelpText?: string;
  category: 'core' | 'advanced';
}
