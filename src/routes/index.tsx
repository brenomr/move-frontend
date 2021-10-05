import { selectUser } from 'features/user/selectors';
import HomePage from 'pages/home';
import LoginPage from 'pages/login';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Routes = () => {

    const { signed } = useSelector(selectUser);

    return (
        <BrowserRouter>
            {signed ?
                <>
                    <Route path="/" exact component={HomePage} />
                </>
                :
                <Switch>
                    <Route path="/" exact component={LoginPage} />
                </Switch>
            }
        </BrowserRouter>

    )
}
export default Routes
