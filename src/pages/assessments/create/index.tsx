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
import { Autocomplete } from '@material-ui/lab';

interface ParamTypes {
    id: string;
}


function CreateAssessment() {
    const [id, setId] = useState('');
    const params = useParams<ParamTypes>();

    const form = useRef();

    const { id: personalId } = useSelector(selectUser);

    const initialState = {
        id: undefined,
        name: '',
        description: '',
        attached_url: '' as any,
        personal: { id: personalId },
        student: null as any
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

    const pickFile = (e) => {
        const formData = new FormData(form.current);

        const file = formData.get('attached_url');

        setState(s => ({
            ...s,
            attached_url: file
        }))

    }

    const [studentList, setStudentList] = useState<any[]>([]);


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
                    const response = await api.get(`/${endpoints.assessments}/${id}`);
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
                            history.push(`/${endpoints.assessments}`);
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
                    title: `Não foi possível resgatar a lista de ${namings.students.plural}`,
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

            const body = new FormData(form.current);
            body.append("personal", JSON.stringify({ id: personalId }));
            body.append("student", JSON.stringify(state.student));

            if (!isNew)
                body.append("id", id);

            if (isNew) {
                result = await api.post(`/${endpoints.assessments}`, body, true);
            }

            else {
                result = await api.put(`/${endpoints.assessments}/${id}`, body, true);
            }

            if (!responseCheck(result)) {
                throw Error;
            }
            Swal.fire({
                title: `${namings.assessments.singular} ${isNew ? 'cadastrado' : 'editado'} com sucesso!`,
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
            <Title>{isNew ? 'Cadastrar' : 'Editar'} {namings.assessments.singular}</Title>
            <form onSubmit={handleSubmit} ref={form}>
                <div className={classes.grid}>
                    <label>Selecione o anexo da avalição em imagem ou pdf (tamanho máximo 3MB):</label>
                </div>
                <div className={classes.grid}>
                    <input
                        accept=".png, .jpg, .jpeg, .pdf, ,.gif"
                        type="file"
                        name="attached_url"
                        onChange={pickFile}
                    />
                </div>
                <div className={classes.grid}>
                    <Autocomplete
                        getOptionLabel={(label) => `${label.name} ${label.surname}`}
                        options={studentList}
                        value={state.student}
                        onChange={(event, value) => handleChangeStudent(value)}
                        renderInput={(params) => <TextField {...params} required label="Aluno" variant="outlined" />}
                    />
                    <TextField
                        label="Nome"
                        variant="outlined"
                        required
                        name="name"
                        value={state.name}
                        onChange={handleChange}
                    />

                </div>
                <div className={classes.grid}>
                    <TextField
                        label="Descrição"
                        variant="outlined"
                        name="description"
                        value={state.description}
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

export default CreateAssessment;