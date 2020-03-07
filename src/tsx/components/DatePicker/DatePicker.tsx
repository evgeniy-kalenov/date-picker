import React = require("react");
import "./DatePicker.less";
import {ObserverComponent} from "../../ObserverComponent";

export interface IDatePickerProps {
    format: any;
    value?: string;
    label?: string;
    placeholder?: string
    disabled?: boolean;
    invalid?: boolean;
    onChange: (value: string) => void;
}

export class DatePicker extends ObserverComponent<IDatePickerProps> {

    render() {
        return (
            <div className={`date-picker`}>
                <h1>work</h1>
            </div>
        );
    }

}