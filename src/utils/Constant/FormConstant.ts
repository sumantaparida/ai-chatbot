import type { _T_formField } from '@/utils/types/FormType';

export const formFields: _T_formField[] = [
  {
    id: 'title',
    name: 'Title',
    type: 'singleLine',
    defaultValue: 'Dynamic Title',
    required: true,
    validations: [
      {
        regexp: {
          pattern: /^[A-Za-z ]*$/,
          erMsg: 'Only alphabetic characters are allowed',
        },
      },
    ],
    disabled: false,
  },
  {
    id: 'multiLine',
    name: 'Multi Line',
    type: 'multiLine',
    required: true,
    validations: [],
    disabled: false,
  },
  {
    id: 'url',
    name: 'URL',
    type: 'link',
    required: true,
    validations: [
      {
        regexp: {
          pattern: /^[A-Za-z ]*$/,
          erMsg: 'Invalid URL',
        },
      },
    ],
    disabled: false,
    linkType: 'Asset',
  },
  {
    id: 'display',
    name: 'Display',
    type: 'boolean',
    required: true,
    validations: [],
    disabled: false,
    options: [
      { id: 'displaytrue', label: 'True', value: 'true' },
      { id: 'displayfalse', label: 'False', value: 'false' },
    ],
  },
  {
    id: 'gender',
    name: 'Gender',
    type: 'singleCheck',
    defaultValue: 'male',
    required: false,
    validations: [],
    disabled: false,
    options: [
      { id: 'male', value: 'male', label: 'Male' },
      { id: 'female', value: 'female', label: 'Female' },
    ],
  },
  {
    id: 'file',
    name: 'File',
    type: 'file',
    localized: false,
    required: false,
    validations: [],
    disabled: false,
  },
];
