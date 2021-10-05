import { BottomNavigation, BottomNavigationAction, TextField } from '@material-ui/core';
import Button from 'components/Button';
import Row from 'components/Row';
import user from 'features/user';
import LoginLayout from 'layout/login';
import { useDispatch } from 'react-redux';
import { XForm, XLink } from './styles';
import Logo from 'assets/images/logo.jpg';
import { FitnessCenter, Person } from '@material-ui/icons';
import { useState } from 'react';
import { EWhoIs, TWhoIs } from 'features/user/index.d';
import PasswordAdornment from 'components/PasswordAdornment';


const LoginPage = () => {

    const [tab, setTab] = useState<TWhoIs>(EWhoIs.STUDENT);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(user.actions.update({
            name: "Luca",
            email: fields.email,
            whois: tab,
            signed: true
        }));
    }

    return (
        <LoginLayout>
            <XForm onSubmit={handleSubmit}>
                <img src={Logo} alt="logo" />
                <BottomNavigation
                    showLabels
                    value={tab}
                    onChange={(event, newValue) => {
                        setTab(newValue);
                    }}
                >
                    <BottomNavigationAction label="Aluno" value={EWhoIs.STUDENT} icon={<Person />} />
                    <BottomNavigationAction label="Personal" value={EWhoIs.PERSONAL} icon={<FitnessCenter />} />
                </BottomNavigation>
                <Row>
                    <TextField
                        label="Email"
                        variant="outlined"
                        name="email"
                        onChange={handleChange}
                    />

                </Row>
                <Row>
                    <TextField
                        label="Senha"
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        name="password"
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
                    <Button type="submit" >Entrar</Button>
                </Row>

            </XForm>
        </LoginLayout>
    )
}

export default LoginPage