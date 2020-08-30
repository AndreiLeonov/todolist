import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {Button, IconButton, TextField} from "@material-ui/core";
import {Add, Delete, AddCircleOutline} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    const [ItemName, setItemName] = useState("");
    const [error, setError] = useState<string | null>(null);

    const newItemNameChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setItemName(e.currentTarget.value);
        setError(null);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }

    const addItem = () => {
        if (ItemName.trim() !== "") {
            props.addItem(ItemName.trim());
            setItemName("");
        } else {
            setError("Title is required!")
        }
    };

    return (
        <div>
            <TextField
                size="small"
                error={!!error}
                variant="outlined"
                value={ItemName}
                onChange={newItemNameChanged}
                onKeyPress={onKeyPressHandler}
                label='Add task name'
                helperText={error}


            />
            <IconButton onClick={addItem}>
                <AddCircleOutline/>
            </IconButton>
        </div>
    );
}
