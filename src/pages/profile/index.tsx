import React, { useState, useEffect, FormEvent, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { Avatar, TextField } from '@material-ui/core';
import Button from 'components/Button';

import Swal from 'sweetalert2';

import { selectUser } from 'features/user/selectors';
import { useSelector } from 'react-redux';
import { endpoints } from "constants/endpoints"

import useStyles from 'styles/styles';
import api from 'services/api';
import responseCheck from 'utils/responseCheck';
import Paper from 'components/Paper';
import { SaveOutlined } from '@material-ui/icons';
import Title from 'components/Title';
import { EWhoIs } from 'features/user/index.d';
import { XProfileContainer } from './styles';

function Profile() {

    const form = useRef();

    const { id, whois } = useSelector(selectUser);

    const endpoint = whois === EWhoIs.STUDENT ? endpoints.students : endpoints.users;

    const initialState = {
        id: undefined,
        nickname: '',
        photo_url: '' as any,
    };
    const [state, setState] = useState(initialState);
    const handleChange = (event: React.ChangeEvent<any>) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    const [avatar, setAvatar] = useState();

    const pickFile = (e) => {
        const formData = new FormData(form.current);

        const file = formData.get('photo_url');

        setState(s => ({
            ...s,
            photo_url: file
        }))

    }

    const [disableButton, setDisableButton] = useState(false);

    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        if (id) {
            (async () => {
                const response = await api.get(`/${endpoint}/${id}`);

                if (responseCheck(response)) {
                    const data = await response.json();
                    setState(data);
                    setAvatar(data.photo_url);
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro ao carregar a página',
                        text: 'Verifique se o registro consultado realmente existe, caso o erro persista contate o suporte técnico.'
                    }).then(() => {
                        history.push(`/`);
                    });
                }
            })();
        }

    }, [id, history]);


    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        try {
            let result;
            setDisableButton(true);

            const body = new FormData(form.current);

            body.append("id", id);

            result = await api.put(`/${endpoint}/profile/${id}`, body, true);

            if (!responseCheck(result)) {
                throw Error;
            }

            const data = await result.json();
            setAvatar(data.photo_url);

            Swal.fire({
                title: `Perfil salvo com sucesso!`,
                icon: 'success',
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
            <Title>Meu Perfil</Title>
            <form onSubmit={handleSubmit} ref={form}>
                <XProfileContainer >
                    <label>Você pode editar seu apelido e sua imagem de perfil, basta escolher e clicar em SALVAR</label>
                    <input
                        accept="image/*"
                        type="file"
                        name="photo_url"
                        onChange={pickFile}
                    />
                    <Avatar src={avatar} style={{ width: 160, height: 160 }} />
                    <TextField
                        label="Apelido"
                        variant="outlined"
                        required
                        name="nickname"
                        value={state.nickname}
                        onChange={handleChange}
                    />
                    <Button
                        loading={disableButton}
                        icon={<SaveOutlined />}
                        type="submit"
                    >
                        Salvar
                    </Button>
                </XProfileContainer>
            </form>
        </Paper>
    )
}

export default Profile;