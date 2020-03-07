import React = require("react");
import "./DatePicker.less";
import {computed, observable} from "mobx";
import {DateInput} from "../DateInput/DateInput";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {Moment} from "moment";
import moment = require("moment");
import {MouseEvent} from "react";
import * as $ from "jquery";

export interface IDatePickerProps {
    format?: string;
    value?: string;
    label?: string;
    placeholder?: string
    readonly?: boolean;
    invalid?: boolean;
    onChange?: (date: string, event?: MouseEvent) => void;
}

@observer
export class DatePicker extends React.Component<IDatePickerProps, {}> {

    @observable
    private isCalendarOpen: boolean = false;

    @observable
    private calendarDate: Moment;

    private currentDate: Moment = moment();

    @computed
    private get monthsDays(): Array<Moment> {
        const start = moment(this.calendarDate).startOf("month").startOf("isoWeek");
        const end = moment(this.calendarDate).endOf("month").endOf("isoWeek");
        const daysArray = [];
        let d = start;
        while (moment(d).isSameOrBefore(end)) {
            daysArray.push(d);
            d = moment(d).add(1, "day");
        }
        return daysArray;
    }

    private get format(): string {
        return this.props.format || `MM.DD.YYYY`;
    }

    @computed
    private get dateInputValue(): string {
        if (this.props.value) {
            return moment(this.props.value, this.format).format(this.format);
        }
        return ``;
    }

    componentWillMount() {
        this.setCalendarDate();
        document.addEventListener(`click`, this.closeCalendar);
    }

    componentWillReceiveProps(nextProps: IDatePickerProps) {
        if (nextProps.value !== this.props.value) {
            this.setCalendarDate(nextProps.value);
        }
    }

    componentWillUnmount() {
        document.removeEventListener(`click`, this.closeCalendar)
    }

    private setCalendarDate(value: string = this.props.value) {
        if (value) {
            this.calendarDate = moment(value, this.format);
        } else {
            this.calendarDate = moment(new Date(), this.format);
        }
    }

    @autobind
    private toggleCalendar(ev) {
        this.isCalendarOpen = !this.isCalendarOpen;
        ev.stopPropagation();
    }

    @autobind
    private closeCalendar(ev) {
        const $datePicker = $(ev.target).closest(`.date-picker`);
        if ($datePicker.length === 0) {
            this.isCalendarOpen = false;
        }
    }

    @autobind
    private nextMonth() {
        if (this.calendarDate) {
            this.calendarDate = moment(this.calendarDate).add(1, `month`);
        }
    }

    @autobind
    private prevMonth() {
        if (this.calendarDate) {
            this.calendarDate = moment(this.calendarDate).subtract(1, `month`);
        }
    }

    private selectDate(date: Moment, event: MouseEvent) {
        this.props.onChange && this.props.onChange(date.format(this.format), event);
    }

    @autobind
    private changeDateInputValue(ev) {
        const value = ev && ev.target && ev.target.value;
        if (value) {
            const date = moment(value, this.format, true);
            if (date.isValid()) {
                this.selectDate(date, ev);
            }
        } else {
            this.props.onChange && this.props.onChange(``);
        }
    }

    private control(): JSX.Element {
        return (
            <div className={`date-picker__control`}>
                <div className={`date-picker__control__input`}>
                    <DateInput value={this.dateInputValue}
                               readonly={this.props.readonly}
                               placeholder={this.props.placeholder}
                               onFocus={() => this.isCalendarOpen = true}
                               onChange={this.changeDateInputValue} />
                </div>
                <div className={`date-picker__control__calendar-button` + (this.props.readonly ? ` calendar-button_disabled` : ``)}
                     onClick={this.toggleCalendar}>
                    <i className="material-icons">calendar_today</i>
                </div>
            </div>
        );
    }

    private daysTable(): JSX.Element {
        const getWeekRow = (days: Array<Moment>, key: string): JSX.Element => {
            return (
                <tr key={key}>
                    {
                        days.map((day, idx) => {
                            const currentDayClass = this.currentDate.format(this.format) === day.format(this.format) ? `month-table_current-day` : ``;
                            const selectedDayClass = this.props.value && moment(this.props.value, this.format).format(this.format) === day.format(this.format) ? `month-table_selected-day` : ``;
                            return (
                                <td key={`${key}_${idx}`}
                                    className={[selectedDayClass, currentDayClass].filter(el => !!el).join(` `)}
                                    onClick={(ev) => this.selectDate(day, ev)} >
                                    {this.calendarDate.format(`MMM`) === day.format(`MMM`) ? day.format(`DD`) : ``}
                                </td>
                            );
                        })
                    }
                </tr>
            );
        };

        return (
            <table className={`month-table`}>
                <tr>
                    <td>Пн</td>
                    <td>Вт</td>
                    <td>Ср</td>
                    <td>Чт</td>
                    <td>Пт</td>
                    <td>Сб</td>
                    <td>Вс</td>
                </tr>
                {
                    [0, 7, 14, 21, 28, 35].map(start => getWeekRow(this.monthsDays.slice(start, start + 7), `${start}-${start+7}`))
                }
            </table>
        );
    }

    private calendar(): JSX.Element {
        return !this.props. readonly && this.isCalendarOpen && (
            <div className={`date-picker__calendar`}>
                <div className={`calendar__header`}>
                    <div className={`calendar__header__title`}>
                        {this.calendarDate.locale(`ru`).format(`MMMM YYYY`).split(``).map((letter, idx) => {
                            if (idx === 0) {
                                return letter.toUpperCase();
                            }
                            return letter;
                        })}
                    </div>
                    <div className={`calendar__header__buttons`}>
                        <div onClick={this.nextMonth}>
                            <i className="material-icons">keyboard_arrow_down</i>
                        </div>
                        <div onClick={this.prevMonth}>
                            <i className="material-icons">keyboard_arrow_up</i>
                        </div>
                    </div>
                </div>
                <div className={`calendar__main`}>
                    {this.daysTable()}
                </div>
                <div className={`calendar__footer`}>
                    <span onClick={(ev) => this.selectDate(this.currentDate, ev)}>
                        Сегодня {this.currentDate.format(this.format)}
                    </span>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className={`date-picker`}>
                <div className={`date-picker__label`}>
                    {this.props.label || `Дата`}
                </div>
                {this.control()}
                {this.calendar()}
            </div>
        );
    }

}