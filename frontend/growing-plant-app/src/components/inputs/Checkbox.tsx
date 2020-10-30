import React from 'react';
import { FormControlLabel, Checkbox as Check } from '@material-ui/core';
import { Trans } from 'react-i18next';

type Color = 'primary' | 'secondary' | 'default';
interface CheckboxProps {
    color: Color;
    labelI18Key: string;
    value: boolean;
    id?: string;
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
    color,
    labelI18Key,
    value,
    id,
    name,
    onChange
}) => {

    return (
        <FormControlLabel
        control={ <Check
            id={ id }
            name={ name }
            checked={ value }
            color={ color }
            onChange={ onChange }
            /> }
        label={<Trans i18nKey={ labelI18Key }/>}
        />
    );
};

export default Checkbox;