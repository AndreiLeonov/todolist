import React from 'react';
import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import {EditSpan} from "../EditSpan";

export default {
    title: 'EditSpan Stories',
    component: EditSpan,
}

export const EditSpanFormBaseExample = (props: any) => {
  return (
      <EditSpan title={'Start Value'} saveNewTitle={action('value change')} />
  );
}