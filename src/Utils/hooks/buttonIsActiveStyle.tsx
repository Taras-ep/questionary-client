import React, { useState, useEffect } from "react";

export function useButtonIsActiveStyle(inputRef: React.RefObject<HTMLInputElement> | React.RefObject<HTMLInputElement>[]) {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (Array.isArray(inputRef)) {
            const hasEmptyInput = inputRef.some(element => element.current?.value === '');
            if (hasEmptyInput && isActive) {
                setIsActive(false);
            }
        } else {
            if (inputRef.current?.value === '' && isActive) {
                setIsActive(false);
            }
        }
    }, [inputRef, isActive]);

    return { isActive, setIsActive };
}