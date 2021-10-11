import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { TextField } from '@material-ui/core';
import Button from 'components/Button';
import BackIcon from '@material-ui/icons/ArrowBack';

import Swal from 'sweetalert2';

import { selectUser } from 'features/user/selectors';
import { useSelector } from 'react-redux';
import { endpoints } from "constants/endpoints"

import useStyles from 'styles/styles';
import api from 'services/api';
import responseCheck from 'utils/responseCheck';
import { EWhoIs } from 'features/user/index.d';
import PasswordAdornment from 'components/PasswordAdornment';
import isValidPhone from 'utils/validatePhone';
import Paper from 'components/Paper';
import { SaveOutlined } from '@material-ui/icons';
import { namings } from 'constants/namings';

interface ParamTypes {
    id: string;
}


function CreateStudent() {
    const [id, setId] = useState('');
    const params = useParams<ParamTypes>();

    const { id: personalId } = useSelector(selectUser);

    const initialState = {
        id: undefined,
        whois: EWhoIs.STUDENT,
        password: '',
        name: '',
        surname: '',
        email: '',
        street: '',
        number: '',
        district: '',
        city: '',
        uf: '',
        complement: '',
        cep: '',
        phone: '',
        nickname: '',
        photo_url: 'https://media.istockphoto.com/vectors/user-profile-icon-vector-avatar-portrait-symbol-flat-shape-person-vector-id1270368615?k=20&m=1270368615&s=170667a&w=0&h=qpvA8Z6L164ZcKfIyOl-E8fKnfmRZ09Tks7WEoiLawA=',
        personals: [{ id: personalId }]
    };
    const [state, setState] = useState(initialState);
    const handleChange = (event: React.ChangeEvent<any>) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    const [showPassword, setShowPassword] = useState(false);

    const [phoneError, setPhoneError] = useState(false);

    const [disableButton, setDisableButton] = useState(false);
    const [isNew, setIsNew] = useState(false);

    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        setPhoneError(!isValidPhone(state.phone));
    }, [state.phone])

    const getIsNew = useCallback(() => {
        if (!id) {
            if (params.id) {
                setId(params.id);
            } else {
                setIsNew(true);
            }
        }
    }, [id, params.id]);

    useEffect(() => {
        if (!isNew) {
            if (id) {
                (async () => {
                    const response = await api.get(`/${endpoints.students}/${id}`);
                    if (responseCheck(response)) {
                        const data = await response.json();
                        setState(data);
                        setId(data.id);
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Erro ao carregar a página',
                            text: 'Verifique se o registro consultado realmente existe, caso o erro persista contate o suporte técnico.'
                        }).then(() => {
                            history.push(`/${endpoints.students}`);
                        });
                    }
                })();
            }
        }
        getIsNew();
    }, [id, isNew, getIsNew, history]);


    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        try {
            let result;
            setDisableButton(true);

            if (isNew) {
                result = await api.post(`/${endpoints.students}`, state);
            }

            else {
                result = await api.put(`/${endpoints.students}/${id}`, state);
            }

            if (!responseCheck(result)) {
                throw Error;
            }
            Swal.fire({
                title: `${namings.trainings.singular} ${isNew ? 'cadastrado' : 'editado'} com sucesso!`,
                icon: 'success',
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: 'Continuar',
                cancelButtonColor: '#418107',
                cancelButtonText: 'Ver Todos'
            }).then((result) => {
                if (result.isConfirmed) {
                    if (isNew)
                        setState(initialState);
                }
                else {
                    history.goBack();
                }
            });
        } catch (error) {
            Swal.fire({
                title: 'Não foi possível salvar',
                text: 'Tente novamente, caso o erro persista contate o suporte técnico.',
                icon: 'error',
            });
        } finally {
            setDisableButton(false);
        }
    }

    return (
        <Paper>
            <h1>{isNew ? 'Cadastrar' : 'Editar'} {namings.students.singular}</h1>
            <form onSubmit={handleSubmit}>
                <div className={classes.grid}>
                    <TextField
                        label="Nome"
                        variant="outlined"
                        required
                        name="name"
                        value={state.name}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Sobrenome"
                        variant="outlined"
                        required
                        name="surname"
                        value={state.surname}
                        onChange={handleChange}
                    />

                </div>
                <div className={classes.grid}>
                    <TextField
                        label="Apelido"
                        variant="outlined"
                        name="nickname"
                        value={state.nickname}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Senha"
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <PasswordAdornment showPassword={showPassword} setShowPassword={setShowPassword} />,
                        }}
                    />
                </div>
                <div className={classes.grid}>
                    <TextField
                        label="Email"
                        required
                        variant="outlined"
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Celular"
                        error={phoneError}
                        helperText={phoneError && "Insira um número válido"}
                        variant="outlined"
                        name="phone"
                        value={state.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className={classes.grid}>
                    <TextField
                        label="CEP"
                        required
                        variant="outlined"
                        name="cep"
                        value={state.cep}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Endereço"
                        required
                        variant="outlined"
                        name="street"
                        value={state.street}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Número"
                        required
                        type="number"
                        variant="outlined"
                        name="number"
                        value={state.number}
                        onChange={handleChange}
                    />
                </div>
                <div className={classes.grid}>
                    <TextField
                        label="Bairro"
                        required
                        variant="outlined"
                        name="district"
                        value={state.district}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Cidade"
                        required
                        variant="outlined"
                        name="city"
                        value={state.city}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Estado"
                        required
                        variant="outlined"
                        name="uf"
                        value={state.uf}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Complemento"
                        variant="outlined"
                        name="complement"
                        value={state.complement}
                        onChange={handleChange}
                    />
                </div>
                <div className={classes.button}>
                    <Button
                        color="secondary"
                        type="button"
                        icon={<BackIcon />}
                        onClick={() => { history.goBack() }}
                    >
                        Voltar
                    </Button>
                    <Button
                        loading={disableButton}
                        icon={<SaveOutlined />}
                        type="submit"
                    >
                        Salvar
                    </Button>
                </div>
            </form>
        </Paper>
    )
}

export default CreateStudent;