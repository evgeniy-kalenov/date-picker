import React = require("react");
import "./DateInput.less";
import MaskedInput from "react-text-mask";
import {observer} from "mobx-react";
import {getDateMask} from "../helpers";

export interface IDateInputProps {
    value?: string;
    format?: string;
    placeholder?: string;
    readonly?: boolean;
    onFocus?: () => void;
    onChange?: (ev) => void;
    onBlur?: () => void;
}

export type DateMask = Array<string | RegExp>;

@observer
export class DateInput extends React.Component<IDateInputProps, {}> {

    private static getDefaultMask(): DateMask {
        const lang: string = "ru";
        switch (lang) {
            case "en":
                return [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];
            default: {
                return getDateMask();
            }
        }
    }

    private get mask(): DateMask {
        return DateInput.getDefaultMask();
    }

    render() {
        return (
            <div className={`date-input`}>
                <MaskedInput value={this.props.value}
                             mask={this.mask}
                             placeholder={this.props.placeholder}
                             disabled={this.props.readonly}
                             onFocus={this.props.onFocus}
                             onChange={this.props.onChange}
                             onBlur={this.props.onBlur} />
            </div>
        );
    }

}