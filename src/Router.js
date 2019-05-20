import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'
import React from 'react'
import {
    Home,
    NotFound,
    Editor
} from './LoadComponent'

const PublicRoute = ({ component: Component, ...rest }) => {
    return (
        <div>
            <Route
                {...rest}
                render={props => (
                    <div>
                        {/*<Header />*/}
                        <Component {...props} />
                        {/*<Footer />*/}
                    </div>
                )} />
        </div>
    )
}

class Routes extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Switch>
                            <PublicRoute exact path="/" component={Home} />
                            <PublicRoute exact path="/editor/:id" component={Editor} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Routes;
