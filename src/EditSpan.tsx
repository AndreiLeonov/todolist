import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditSpanPropsType = {
    title: string
    saveNewTitle: (newTitle: string) => void
}

export const EditSpan = (props: EditSpanPropsType) => {

    let [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(props.title);

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deActivateEditMode = () => {
        setEditMode(false);
        props.saveNewTitle(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);

    }

    return editMode
        ? <TextField
            variant={"outlined"}
            value={title}
            onBlur={deActivateEditMode}
            autoFocus={true}
            onChange={changeTitle}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}