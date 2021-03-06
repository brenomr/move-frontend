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
import Title from 'components/Title';
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
                            title: 'Erro ao carregar a p??gina',
                            text: 'Verifique se o registro consultado realmente existe, caso o erro persista contate o suporte t??cnico.'
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
                    title: `N??o foi poss??vel resgatar a lista de ${namings.activities.plural}`,
                    text: 'Tente novamente, caso o erro persista contate o suporte t??cnico.'
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
                title: 'N??o foi poss??vel salvar',
                text: 'Tente novamente, caso o erro persista contate o suporte t??cnico.',
                icon: 'error',
            });
        } finally {
            setDisableButton(false);
        }
    }

    return (
        <Paper>
            <Title>{isNew ? 'Cadastrar' : 'Editar'} {namings.exercises.singular}</Title>
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
                        label="Repeti????o"
                        variant="outlined"
                        required
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        helperText="Informe apenas n??meros"
                        name="repetition"
                        value={state.repetition}
                        onChange={handleChange}
                    />

                </div>
                <div className={classes.grid}>
                    <TextField
                        label="S??rie"
                        variant="outlined"
                        required
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        helperText="Informe apenas n??meros"
                        name="serie"
                        value={state.serie}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Intervalo (segundos)"
                        variant="outlined"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        helperText="Informe apenas n??meros"
                        required
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