import { API_ENDPOINTS } from "../constants";

export const FIELD_TYPES = {
  CHECKBOX_SELECT: 'checkbox-select',
  FIELD_GROUP: 'field-group',
  SELECT: 'select',
  TEXT: 'text',
  TEXT_ARRAY: 'text-array',
  TEXT_ID: 'text-id',
};

/**
 * @function MenuitemStructure
 * @returns {object}
 * @description Returns a menu item structure that can be used to render a menu item form
 */
export const MenuItemStructure = () => ({
  targetEndpoint: API_ENDPOINTS.MENU_ITEMS,
  emptyData: {
    itemName: '',
    description: '',
    baseCost: 0,
    mainImage: '',
    averageRating: 0
  },
  formFieldDefs: [
    {
      label: 'Item Id',
      fieldType: FIELD_TYPES.TEXT_ID,
      valueKey: '_id',
      valueType: 'text'
    },
    {
      label: 'Item Name',
      fieldType: FIELD_TYPES.TEXT,
      valueKey: 'itemName',
      valueType: 'text'
    },
    {
      label: 'Description',
      fieldType: FIELD_TYPES.TEXT,
      valueKey: 'description',
      valueType: 'text',
    },
    {
      label: 'Item Cost',
      fieldType: FIELD_TYPES.TEXT,
      valueKey: 'baseCost',
      valueType: 'number',
    },
    {
      label: 'Main Image URL',
      fieldType: FIELD_TYPES.TEXT,
      valueKey: 'mainImage',
      valueType: 'text'
    },
    {
      label: 'Average Rating (read only)',
      fieldType: FIELD_TYPES.TEXT_ID,
      valueKey: 'averageRating',
      valueType: 'number',
    },
  ],
});

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
