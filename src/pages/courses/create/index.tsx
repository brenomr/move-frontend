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
import { unformatDate } from 'utils/dateUtils';

interface ParamTypes {
    id: string;
}


function CreateCourse() {
    const [id, setId] = useState('');
    const params = useParams<ParamTypes>();

    const initialState = {
        id: undefined,
        description: '',
        startDate: '',
        endDate: '',
        student: null as any,
        training: null as any
    };
    const [state, setState] = useState(initialState);
    const handleChange = (event: React.ChangeEvent<any>) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeStudent = (value: any) => {
        setState({
            ...state,
            student: value,
        });
    };
    const handleChangeTraining = (value: any) => {
        setState({
            ...state,
            training: value,
        });
    };

    const [studentList, setStudentList] = useState<any[]>([]);
    const [trainingList, setTrainingList] = useState<any[]>([]);


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
                    const response = await api.get(`/${endpoints.courses}/${id}`);
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
                            history.push(`/${endpoints.courses}`);
                        });
                    }
                })();
            }
        }
        getIsNew();
        (async () => {
            const response = await api.get(`/${endpoints.students}`);
            if (responseCheck(response)) {
                const data = await response.json();
                setStudentList(data.data);
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: `N??o foi poss??vel resgatar a lista de ${namings.students.plural}`,
                    text: 'Tente novamente, caso o erro persista contate o suporte t??cnico.'
                });
            }
        })();
        (async () => {
            const response = await api.get(`/${endpoints.trainings}`);
            if (responseCheck(response)) {
                const data = await response.json();
                setTrainingList(data.data);
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: `N??o foi poss??vel resgatar a lista de ${namings.trainings.plural}`,
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

            const newState = { ...state, startDate: new Date(state.startDate), endDate: new Date(state.endDate) };

            if (isNew) {
                result = await api.post(`/${endpoints.courses}`, newState);
            }

            else {
                result = await api.put(`/${endpoints.courses}/${id}`, newState);
            }

            if (!responseCheck(result)) {
                throw Error;
            }
            Swal.fire({
                title: `${namings.courses.singular} ${isNew ? 'cadastrado' : 'editado'} com sucesso!`,
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
            <Title>{isNew ? 'Cadastrar' : 'Editar'} {namings.courses.singular}</Title>
            <form onSubmit={handleSubmit}>
                <div className={classes.grid}>
                    <Autocomplete
                        getOptionLabel={(label) => `${label.name} ${label.surname}`}
                        options={studentList}
                        value={state.student}
                        onChange={(event, value) => handleChangeStudent(value)}
                        renderInput={(params) => <TextField {...params} required label="Aluno" variant="outlined" />}
                    />
                    <Autocomplete
                        getOptionLabel={(label) => label.title}
                        options={trainingList}
                        value={state.training}
                        onChange={(event, value) => handleChangeTraining(value)}
                        renderInput={(params) => <TextField {...params} required label="Modelo de Treino" variant="outlined" />}
                    />
                </div>
                <div className={classes.grid}>
                    <TextField
                        label="Descri????o"
                        variant="outlined"
                        placeholder="Exibida apenas para o aluno selecionado. Ex: Realizar diariamente"
                        name="description"
                        value={state.description}
                        onChange={handleChange}
                    />
                </div>
                <div className={classes.grid}>
                    <TextField
                        label="Data de In??cio"
                        variant="outlined"
                        name="startDate"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={unformatDate(state.startDate)}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Data de T??rmino"
                        variant="outlined"
                        name="endDate"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={unformatDate(state.endDate)}
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

export default CreateCourse;