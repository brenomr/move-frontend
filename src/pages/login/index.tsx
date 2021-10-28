import { BottomNavigation, BottomNavigationAction, TextField } from '@material-ui/core';
import Button from 'components/Button';
import Row from 'components/Row';
import user from 'features/user';
import LoginLayout from 'layout/login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { XForm, XLink } from './styles';
import Logo from 'assets/images/logo.jpg';
import { FitnessCenter, Person } from '@material-ui/icons';
import { useState } from 'react';
import { EWhoIs, TWhoIs } from 'features/user/index.d';
import PasswordAdornment from 'components/PasswordAdornment';
import api from 'services/api';
import responseCheck from 'utils/responseCheck';
import Swal from 'sweetalert2';
import jwt from 'jsonwebtoken';

const LoginPage = () => {

    const [tab, setTab] = useState();

    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const initialState = {
        email: '',
        password: ''
    }
    const [fields, setFields] = useState(initialState);

    const handleChange = (event: React.ChangeEvent<any>) => {
        let value = event.target.value;
        setFields({
            ...fields,
            [event.target.name]: value,
        });
    };

    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await api.post(`/auth/login`, {
                email: fields.email,
                password: fields.password,
                tag: tab
            });

            if (!responseCheck(response))
                throw Error

            const { access_token: token } = await response.json();

            const payload = jwt.decode(token);

            if (!payload.sub)
                throw Error

            localStorage.setItem('token', token);

            history.push("/");

            dispatch(user.actions.update({
                id: payload.sub,
                email: fields.email,
                name: payload.username,
                whois: payload.whois,
                signed: true
            }));
        }
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Não foi possível realizar o login',
                text: 'Confira seu email e sua senha e tente novamente'
            });
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <LoginLayout>
            <XForm onSubmit={handleSubmit}>
                <img src={Logo} alt="logo" />
                <p>Escolha como você deseja entrar no sistema:</p>
                <BottomNavigation
                    showLabels
                    value={tab}
                    onChange={(event, newValue) => {
                        setTab(newValue);
                    }}
                >
                    <BottomNavigationAction label="Aluno" value={EWhoIs.STUDENT} icon={<Person fontSize="large" />} />
                    <BottomNavigationAction label="Personal" value={EWhoIs.PERSONAL} icon={<FitnessCenter fontSize="large" />} />
                </BottomNavigation>
                {
                    tab &&
                    <>
                        <Row>
                            <TextField
                                label="Email"
                                variant="outlined"
                                name="email"
                                value={fields.email}
                                onChange={handleChange}
                            />

                        </Row>
                        <Row>
                            <TextField
                                label="Senha"
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={fields.password}
                                onChange={handleChange}
                                InputProps={{
                                    endAdornment: <PasswordAdornment showPassword={showPassword} setShowPassword={setShowPassword} />,
                                }}
                            />
                        </Row>
                        <Row>
                            <XLink href="/">Esqueceu sua senha?</XLink>
                        </Row>
                        <Row>
                            <Button type="submit" loading={loading}>Entrar</Button>
                        </Row>
                    </>
                }
            </XForm>
        </LoginLayout>
    )
}

export default LoginPage