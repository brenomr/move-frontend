import { IExercise } from "./index.d";
import { XContainer, XExercise, XImage, XInfo } from "./styles";

export const Exercise = (props: IExercise) => {
    return (
        <XExercise key={props.id}>
            <XImage>
                <img src={props.activity.image_url} alt="exercise" />
            </XImage>
            <XInfo>
                <div><strong>Categoria:</strong> {props.activity.category}</div>
                <div><strong>Nome:</strong> {props.activity.name}</div>
                <br />
                <small>
                    <div><strong>Repetições:</strong> {props.repetition}</div>
                    <div><strong>Série:</strong> {props.serie}</div>
                    <div><strong>Intervalo (segundos):</strong> {props.breaktime}</div>
                </small>
            </XInfo>
        </XExercise>
    )
}