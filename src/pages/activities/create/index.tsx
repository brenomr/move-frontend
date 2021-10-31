import React, { useState, useEffect, FormEvent, useCallback, useRef } from 'react';
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
import Paper from 'components/Paper';
import { SaveOutlined } from '@material-ui/icons';
import { namings } from 'constants/namings';
import Title from 'components/Title';
import { XImage } from 'components/TrainView/styles';

interface ParamTypes {
    id: string;
}


function CreateActivity() {
    const [id, setId] = useState('');
    const params = useParams<ParamTypes>();

    const form = useRef();

    const { id: personalId } = useSelector(selectUser);

    const initialState = {
        id: undefined,
        name: '',
        category: '',
        image_url: null,
        user: { id: personalId }
    };
    const [state, setState] = useState(initialState);
    const handleChange = (event: React.ChangeEvent<any>) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };


    const pickFile = (e) => {
        const formData = new FormData(form.current);

        const file = formData.get('image_url');

        setState(s => ({
            ...s,
            image_url: file
        }))

    }

    const [disableButton, setDisableButton] = useState(false);
    const [isNew, setIsNew] = useState(false);

    const classes = useStyles();
    const history = useHistory();

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
                    const response = await api.get(`/${endpoints.activities}/${id}`);
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
                            history.push(`/${endpoints.activities}`);
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
            body.append("user", JSON.stringify({ id: personalId }));

            if (!isNew)
                body.append("id", id);

            if (isNew) {
                result = await api.post(`/${endpoints.activities}`, body, true);
            }

            else {
                result = await api.put(`/${endpoints.activities}/${id}`, body, true);
            }

            if (!responseCheck(result)) {
                throw Error;
            }
            Swal.fire({
                title: `${namings.activities.singular} ${isNew ? 'cadastrado' : 'editado'} com sucesso!`,
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
            <Title>{isNew ? 'Cadastrar' : 'Editar'} {namings.activities.singular}</Title>
            <form onSubmit={handleSubmit} ref={form}>
                <div className={classes.grid}>
                    <label>Selecione uma imagem ou gif para ilustrar a atividade (tamanho máximo 1MB):</label>
                </div>
                <div className={classes.grid}>
                    <input
                        accept="image/*"
                        type="file"
                        name="image_url"
                        onChange={pickFile}
                        required
                        style={{ width: 300 }}
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
                        label="Categoria"
                        variant="outlined"
                        required
                        name="category"
                        value={state.category}
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

export default CreateActivity;