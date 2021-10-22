import Paper from 'components/Paper';
import Title from 'components/Title';
import { selectUser } from 'features/user/selectors';
import { useSelector } from 'react-redux';
import WelcomeImage from 'assets/images/welcome.svg';
import { EWhoIs } from 'features/user/index.d';
import { TrainView } from 'components/TrainView';
import { ITrainView } from 'components/TrainView/index.d';
import { useEffect, useState } from 'react';
import { endpoints } from 'constants/endpoints';
import Swal from 'sweetalert2';
import api from 'services/api';
import responseCheck from 'utils/responseCheck';

const HomePage = () => {
    const { email, name, whois, id } = useSelector(selectUser);

    const [course, setCourse] = useState<ITrainView>();

    useEffect(() => {
        (async () => {
            const response = await api.get(`/${endpoints.courses}?student=${id}`);
            if (responseCheck(response)) {
                const data = await response.json();
                setCourse(data?.data[0]);
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao carregar a página',
                    text: 'Verifique se o registro consultado realmente existe, caso o erro persista contate o suporte técnico.'
                });
            }
        })();
    }, [])

    const isStudent = whois === EWhoIs.STUDENT;
    return (
        <Paper>
            <Title>
                Bem vindo a Move, {name} :)
            </Title>
            {isStudent ?
                <TrainView {...course} />
                :
                <>
                    <div>{email}</div>
                    <img src={WelcomeImage} alt="Bem-vindo!" style={{ height: 500 }} />
                </>
            }
        </Paper>
    )
}

export default HomePage