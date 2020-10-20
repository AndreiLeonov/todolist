import React from 'react';
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";

export default {
    title: 'Task Stories',
    component: Task
}


const removeTaskHandler = action('remove after click');
const changeTaskStatus = action('change status after click');
const changeTaskTitle = action('change title after click');

export const TaskBaseExample = (props: any) => {
  return (
      <div>
          <Task
              task={{ id:'1', isDone: true, title:'JS'}}
              todolistId={'todolistId1'}
          />
      </div>
  )
};