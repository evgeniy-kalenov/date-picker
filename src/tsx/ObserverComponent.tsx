// import React from  "react";
import React = require("react");
import {observer} from "mobx-react";

@observer
export class ObserverComponent<P = {}, S = {}> extends React.Component<P, S> {}