import React = require("react");
import "./App.less";
import {observer} from "mobx-react";
import {DatePicker} from "./components/DatePicker/DatePicker";

@observer
export class App extends React.Component {

    render() {
        return (
            <div className={`app`}>
                <DatePicker format={""} onChange={() => {}} />
            </div>
        );
    }
}

export default App;