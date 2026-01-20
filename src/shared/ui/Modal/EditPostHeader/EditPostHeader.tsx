import React from 'react';

type Props = {
    onCancel: () => void,
}

export const EditPostHeader = ({onCancel}: Props) => {
    return (
        <div>
            <p>Edit Post</p>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};
