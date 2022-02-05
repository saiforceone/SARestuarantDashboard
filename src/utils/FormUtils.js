import { API_ENDPOINTS } from "../constants";

export const FIELD_TYPES = {
  FIELD_GROUP: 'field-group',
  SELECT: 'select',
  TEXT: 'text',
  TEXT_ARRAY: 'text-array',
  TEXT_ID: 'text-id',
};

/**
 * @function RestaurantStructure
 * @returns {object}
 * @description constructs and returns a restaurant structure form
 */
export const RestaurantStructure = () => ({
  targetEndpoint: API_ENDPOINTS.LOCATIONS,
  emptyData: {
    locationName: '',
    address: {
        address1: '',
        address2: '',
        geo: []
    },
    seatingCapacity: 0,
    openForBusiness: false,
    servicesAvailable: [],
    contactDetails: {
        primaryPhone: '',
        primaryEmail: '',
        website: ''
    },
    images: []
  },
  formFieldDefs: [
    {
      label: 'Restaurant Id',
      fieldProps: {disabled: true},
      fieldType: FIELD_TYPES.TEXT_ID,
      valueKey: '_id',
      valueType: 'text',
    },
    {
      label: 'Name of Restaurant',
      fieldType: FIELD_TYPES.TEXT,
      valueKey: 'locationName',
      valueType: 'text',
      validations: [],
    },
    {
      label: 'Seating Capacity',
      fieldType: FIELD_TYPES.TEXT,
      valueKey: 'seatingCapacity',
      valueType: 'number',
      validations: [],
    },
    {
      label: 'Address',
      fieldType: FIELD_TYPES.FIELD_GROUP,
      parentValueKey: 'address',
      fields: [
        {
          label: 'Address 1',
          fieldType: FIELD_TYPES.TEXT,
          valueKey: 'address1',
          valueType: 'text',
        },
        {
          label: 'Address 2',
          fieldType: FIELD_TYPES.TEXT,
          valueKey: 'address2',
          valueType: 'text'
        },
      ]
    },
    {
      label: 'Open for Business',
      fieldType: FIELD_TYPES.SELECT,
      valueKey: 'openForBusiness',
      valueType: 'boolean',
      selectValues: [{
        label: 'Yes',
        value: true
      }, {
        label: 'No',
        value: false
      }],
      validations: [],
    },
    {
      label: 'Contact Details',
      fieldType: FIELD_TYPES.FIELD_GROUP,
      parentValueKey: 'contactDetails',
      fields: [
        {
          label: 'Primary Phone',
          fieldType: FIELD_TYPES.TEXT,
          valueKey: 'primaryPhone',
          valueType: 'text',
        },
        {
          label: 'Primary Email',
          fieldType: FIELD_TYPES.TEXT,
          valueKey: 'primaryEmail',
          valueType: 'text',
        },
        {
          label: 'Website',
          fieldType: FIELD_TYPES.TEXT,
          valueKey: 'website',
          valueType: 'text',
        },
      ]
    },
    {
      label: 'Services Available',
      fieldType: FIELD_TYPES.TEXT_ARRAY,
      valueKey: 'servicesAvailable',
      valueType: 'text',
      validations: [],
    }
  ]
});
