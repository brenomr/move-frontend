import { selectUser } from 'features/user/selectors';
import useLogout from 'hooks/useLogout';
import MainLayout from 'layout/main';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const { email, name } = useSelector(selectUser);
    const logout = useLogout();
    return (
        <MainLayout>
            <div>
                Bem vindo {name} :) <br />
                <small>{email}</small>
                <br />
                <button onClick={logout}>Sair</button>
            </div>
        </MainLayout>

    )
}

export default HomePage