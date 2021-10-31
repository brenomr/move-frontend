import React, { useState, useEffect, FormEvent, useCallback, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
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
import Title from 'components/Title';
import { maskPhoneNumber, maskCEP } from 'masks/masks';
import { removeMask } from 'masks/removeMask';
import { brazilStates } from 'constants/brazilStates';

interface ParamTypes {
    id: string;
}


function CreateUser() {
    const [id, setId] = useState('');
    const params = useParams<ParamTypes>();

    const form = useRef();

    const initialState = {
        id: undefined,
        whois: EWhoIs.PERSONAL,
        password: '',
        name: '',
        surname: '',
        email: '',
        cref: '',
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
    };
    const [state, setState] = useState(initialState);
    const handleChange = (event: React.ChangeEvent<any>) => {
        let value = event.target.value;
        switch (event.target.name) {
            case 'phone': value = maskPhoneNumber(value);
                break;
            case 'cep': value = maskCEP(value);
                break;
        }
        setState({
            ...state,
            [event.target.name]: value,
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
                    const response = await api.get(`/${endpoints.users}/${id}`);
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
                            history.push(`/${endpoints.users}`);
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

            const body = new FormData(form.current);

            if (!isNew)
                body.append("id", id);

            body.set("phone", removeMask(state.phone));

            if (isNew) {
                result = await api.post(`/${endpoints.users}`, body, true);
            }

            else {
                result = await api.put(`/${endpoints.users}/${id}`, body, true);
            }

            if (!responseCheck(result)) {
                throw Error;
            }
            Swal.fire({
                title: `${namings.users.singular} ${isNew ? 'cadastrado' : 'editado'} com sucesso!`,
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
            <Title>{isNew ? 'Cadastrar' : 'Editar'} {namings.users.singular}</Title>
            <form onSubmit={handleSubmit} ref={form}>
                <div className={classes.grid}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel>Tipo</InputLabel>
                        <Select
                            required
                            name="whois"
                            value={state.whois}
                            onChange={handleChange}
                            label="Tipo"
                        >
                            <MenuItem value=""><em>Selecione uma opção</em></MenuItem>
                            <MenuItem value={EWhoIs.PERSONAL} >Personal</MenuItem>
                            <MenuItem value={EWhoIs.ADMIN} >Admin</MenuItem>
                        </Select>

                    </FormControl>
                    <TextField
                        label="CREF"
                        variant="outlined"
                        required
                        placeholder="Exemplo: CREF123456PSP"
                        name="cref"
                        value={state.cref}
                        onChange={handleChange}
                    />
                </div>
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
                        required
                        name="nickname"
                        value={state.nickname}
                        onChange={handleChange}
                    />
                    {isNew &&
                        <TextField
                            label="Senha"
                            variant="outlined"
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={state.password}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: <PasswordAdornment showPassword={showPassword} setShowPassword={setShowPassword} />,
                            }}
                        />
                    }
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
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel>Estado</InputLabel>
                        <Select
                            required
                            name="uf"
                            value={state.uf}
                            onChange={handleChange}
                            label="Estado"
                        >
                            {brazilStates.map(state => <MenuItem value={state.value}>{state.label}</MenuItem>)}
                        </Select>
                    </FormControl>
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

export default CreateUser;