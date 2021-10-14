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
import { Autocomplete } from '@material-ui/lab';

interface ParamTypes {
    id: string;
}


function CreateExercise() {
    const [id, setId] = useState('');
    const params = useParams<ParamTypes>();

    const { id: personalId } = useSelector(selectUser);

    const initialState = {
        id: undefined,
        repetition: '',
        serie: '',
        breaktime: '',
        personal: { id: personalId },
        activity: null as any
    };
    const [state, setState] = useState(initialState);
    const handleChange = (event: React.ChangeEvent<any>) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeActivity = (value: any) => {
        setState({
            ...state,
            activity: value,
        });
    };

    const [activityList, setActivityList] = useState<any[]>([]);


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
                    const response = await api.get(`/${endpoints.exercises}/${id}`);
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
                            history.push(`/${endpoints.exercises}`);
                        });
                    }
                })();
            }
        }
        getIsNew();
        (async () => {
            const response = await api.get(`/${endpoints.activities}`);
            if (responseCheck(response)) {
                const data = await response.json();
                setActivityList(data.data);
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: `Não foi possível resgatar a lista de ${namings.activities.plural}`,
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
                result = await api.post(`/${endpoints.exercises}`, state);
            }

            else {
                result = await api.put(`/${endpoints.exercises}/${id}`, state);
            }

            if (!responseCheck(result)) {
                throw Error;
            }
            Swal.fire({
                title: `${namings.exercises.singular} ${isNew ? 'cadastrado' : 'editado'} com sucesso!`,
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
            <h1>{isNew ? 'Cadastrar' : 'Editar'} {namings.exercises.singular}</h1>
            <form onSubmit={handleSubmit}>
                <div className={classes.grid}>
                    <Autocomplete
                        getOptionLabel={(label) => label.name}
                        options={activityList}
                        value={state.activity}
                        onChange={(event, value) => handleChangeActivity(value)}
                        renderInput={(params) => <TextField {...params} required label="Atividades" variant="outlined" />}
                    />
                    <TextField
                        label="Repetição"
                        variant="outlined"
                        required
                        type="number"
                        name="repetition"
                        value={state.repetition}
                        onChange={handleChange}
                    />

                </div>
                <div className={classes.grid}>
                    <TextField
                        label="Série"
                        variant="outlined"
                        type="number"
                        name="serie"
                        value={state.serie}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Intervalo"
                        variant="outlined"
                        type="number"
                        name="breaktime"
                        value={state.breaktime}
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

export default CreateExercise;