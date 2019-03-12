import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'
import React from 'react'
import {
    Home,
    NotFound
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
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Routes;
