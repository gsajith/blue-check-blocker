import styled from 'styled-components'
import React, {ReactElement} from 'react'

const Switch = styled.div`
    position: relative;
    width: 60px;
    height: 28px;
    background: rgb(179, 179, 179);
    border-radius: 32px;
    padding: 4px;
    transition: 300ms all;

    &:before {
        transition: 300ms all;
        content: "";
        position: absolute;
        width: 28px;
        height: 28px;
        border-radius: 35px;
        top: 50%;
        left: 4px;
        background: rgb(255, 255, 255);
        transform: translate(0, -50%);
    }
`;

const Input = styled.input`
    display: none;

    &:checked + ${Switch} {
        background: rgb(0, 128, 0);

        &:before {
            transform: translate(32px, -50%);
        }
    }
`;

const Label = styled.label`
    display: flex;
    align-items: center;
    gap: 10px; // TODO: Test removing this; incompatible with IE 11
    cursor: pointer;
`;

interface ToggleSwitchProps {
    onText: string
    offText: string
    handleChecked: (checked: boolean) => void
    checked?: boolean
}

const ToggleSwitch = ({onText, offText, handleChecked, checked}: ToggleSwitchProps): ReactElement | null => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        handleChecked(e.target.checked)
    };

    return (
        <Label>
            <Input checked={checked} type="checkbox" onChange={handleChange}/>
            <Switch/>
            <span>{(checked ?? false) ? onText : offText}</span>
        </Label>
    )
};

export default ToggleSwitch
