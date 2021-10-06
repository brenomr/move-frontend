import Paper from 'components/Paper';
import Title from 'components/Title';
import { selectUser } from 'features/user/selectors';
import { useSelector } from 'react-redux';
import WelcomeImage from 'assets/images/welcome.svg';

const HomePage = () => {
    const { email, name } = useSelector(selectUser);

    return (
        <Paper>
            <Title>
                Bem vindo a Move, {name} :)
            </Title>
            <div>{email}</div>
            <img src={WelcomeImage} alt="Bem-vindo!" style={{height: 500}}/>
        </Paper>
    )
}

export default HomePage