import { selectUser } from 'features/user/selectors';
import MainLayout from 'layout/main';
import HomePage from 'pages/home';
import LoginPage from 'pages/login';
import StudentsList from 'pages/students/list';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFoundImage from 'assets/images/notfound.svg';

const Routes = () => {

    const { signed } = useSelector(selectUser);

    const NotFound = () => <img src={NotFoundImage} alt="Página não econtrada" />
    return (
        <BrowserRouter>
            {signed ?
                <MainLayout>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/alunos" exact component={StudentsList} />
                        <Route component={NotFound} />
                    </Switch>
                </MainLayout>
                :
                <Switch>
                    <Route path="/" exact component={LoginPage} />
                    <Route component={NotFound} />
                </Switch>
            }
        </BrowserRouter>

    )
}
export default Routes
