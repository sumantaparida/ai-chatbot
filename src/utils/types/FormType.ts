export type FIELD_TEXT_TYPE = 'singleLine' | 'multiLine';
export type FIELD_SELECT_TYPE = 'boolean' | 'singleCheck' | 'multiCheck';
export type FIELD_LINK_TYPE = 'link';
export type FIELD_TYPE = 'file' | 'multiFile';

export type FieldOption = {
  id?: string;
  value: string | boolean;
  label: string;
};

// export type FieldOption[] = [
//   { value: 'option1', label: 'Option 1' },
//   { value: true, label: 'Option 2' },
//   { value: 'option3', label: 'Option 3' },
//   { value: false, label: 'Option 4' },
// ];

export type _T_formField = {
  id: string;
  name: string;
  type: FIELD_TEXT_TYPE | FIELD_SELECT_TYPE | FIELD_LINK_TYPE | FIELD_TYPE;
  defaultValue?: any;
  localized?: boolean;
  required: boolean;
  validations: any[];
  disabled: boolean;
  options?: FieldOption[];
  linkType?: string;
  error?: boolean;
};

export type _T_inValues = {
  [key: string]: any;
};

export type _T_validate = {
  length: number;
  hasOwnProperty?: any;
};
