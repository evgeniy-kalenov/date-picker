import React = require("react");
import "./App.less";
import {observer} from "mobx-react";
import {DatePicker} from "./components/DatePicker/DatePicker";
import {observable} from "mobx";

@observer
export class App extends React.Component {

    @observable
    private date: string;

    render() {
        return (
            <div className={`app`}>
                <DatePicker value={this.date}
                            placeholder={`Дата`}
                            onChange={(date, ev) => {
                                this.date = date;
                            }} />
            </div>
        );
    }
}

export default App;