import React from "react";
import '../styles/delete-button.scss'

interface DeleteButtonProps {
    onDelete: () => void
}

const DeleteButton = (props:DeleteButtonProps) => {
    return (
        <button
            aria-label="delete-question"
            type="button"
            className="button-delete"
            onClick={props.onDelete}
        >
            <img src="./icons/trashbin_icon.svg" alt="delete" />
        </button>
    )
}

export default DeleteButton