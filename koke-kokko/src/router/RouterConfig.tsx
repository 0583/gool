import * as React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, HashRouter
} from "react-router-dom";
import App from "../App"
import Login from "../views/Signup"


export default class RouterConfig extends React.Component{
    public render(){
        return(
            <HashRouter>
                <Switch>
                    <Route path={'/'} exact component={Login}/>
                    <Route path={'/app'} exact={true} component={App}/>
                </Switch>
            </HashRouter>
        )
    }
}



