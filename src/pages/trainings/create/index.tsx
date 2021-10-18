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
import Paper from 'components/Paper';
import { SaveOutlined } from '@material-ui/icons';
import { namings } from 'constants/namings';
import Title from 'components/Title';
import { Autocomplete } from '@material-ui/lab';

interface ParamTypes {
    id: string;
}


function CreateTraining() {
    const [id, setId] = useState('');
    const params = useParams<ParamTypes>();

    const { id: personalId } = useSelector(selectUser);

    const initialState = {
        id: undefined,
        title: '',
        description: '',
        personal: { id: personalId },
        exercises: [] as any[]
    };
    const [state, setState] = useState(initialState);
    const handleChange = (event: React.ChangeEvent<any>) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeExercises = (value: any[]) => {
        setState({
            ...state,
            exercises: value,
        });
    };

    const [exerciseList, setExerciseList] = useState<any[]>([]);


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
                    const response = await api.get(`/${endpoints.trainings}/${id}`);
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
                            history.push(`/${endpoints.trainings}`);
                        });
                    }
                })();
            }
        }
        getIsNew();
        (async () => {
            const response = await api.get(`/${endpoints.exercises}`);
            if (responseCheck(response)) {
                const data = await response.json();
                setExerciseList(data.data);
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: `Não foi possível resgatar a lista de ${namings.exercises.plural}`,
                    text: 'Tente novamente, caso o erro persista contate o suporte técnico.'
                });
            }
        })();
    }, [id, isNew, getIsNew, history]);


    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        try {
            let result;
            setDisableButton(true);

            if (isNew) {
                result = await api.post(`/${endpoints.trainings}`, state);
            }

            else {
                result = await api.put(`/${endpoints.trainings}/${id}`, state);
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
            <Title>{isNew ? 'Cadastrar' : 'Editar'} {namings.trainings.singular}</Title>
            <form onSubmit={handleSubmit}>
                <div className={classes.grid}>
                    <TextField
                        label="Título"
                        variant="outlined"
                        name="title"
                        value={state.title}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Descrição"
                        variant="outlined"
                        required
                        name="description"
                        value={state.description}
                        onChange={handleChange}
                    />

                </div>
                <div className={classes.grid}>
                    <Autocomplete
                        multiple
                        getOptionLabel={(label) => `${label.activity.name}: ${label.repetition} repetições, ${label.serie} séries`}
                        options={exerciseList}
                        value={state.exercises}
                        onChange={(event, value) => handleChangeExercises(value)}
                        renderInput={(params) => <TextField {...params} label="Lista de Exercícios" variant="outlined" />}
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

export default CreateTraining;