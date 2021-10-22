import { Check } from "@material-ui/icons";
import Button from "components/Button";
import { endpoints } from "constants/endpoints";
import { id } from "date-fns/locale";
import { useState } from "react";
import api from "services/api";
import Swal from "sweetalert2";
import { dateToString } from "utils/dateUtils";
import responseCheck from "utils/responseCheck";
import { Exercise } from "./exercise";
import { ITrainView } from "./index.d"
import { XContainer, XExerciseContainer } from "./styles";

const TrainView = (props: ITrainView) => {

    const [disableButton, setDisableButton] = useState(false);

    const checkTrain = async () => {
        try {
            setDisableButton(true);

            const body = {
                presencedate: new Date(),
                course: {
                    id: props.id
                }
            }
            const result = await api.post(`/${endpoints.presences}`, body);

            if (!responseCheck(result)) {
                throw Error;
            }
            Swal.fire({
                title: `Presença marcada!`,
                icon: 'success',
            });
        } catch (error) {
            Swal.fire({
                title: 'Não foi possível finalizar o treino',
                text: 'Tente novamente, caso o erro persista contate o suporte técnico.',
                icon: 'error',
            });
        } finally {
            setDisableButton(false);
        }
    }

    if (!props.id)
        return (<></>)

    return (
        <XContainer>
            <h2>{props.description}</h2>
            <div>{props.training.title}: {props.training.description}</div>
            <small>Começa em: <strong>{dateToString(props.startDate)}</strong> / Acaba em: <strong>{dateToString(props.endDate)}</strong></small>
            <XContainer style={{ marginTop: 30 }}>
                <Button variant="outlined" color="secondary" icon={<Check />} loading={disableButton} onClick={checkTrain}>
                    Marcar Presença
                </Button>
            </XContainer>
            <XExerciseContainer>
                {props.training.exercises.map(Exercise)}
            </XExerciseContainer>
        </XContainer>
    )
}

export { TrainView };