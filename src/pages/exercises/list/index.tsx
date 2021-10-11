import { Add, Delete, Edit } from "@material-ui/icons"
import { IRow } from "components/EnhancedTable/index.d"
import { Table } from "components/EnhancedTable"
import { ICell } from "components/EnhancedTable/Header/index.d"
import { endpoints } from "constants/endpoints"
import { links } from "constants/links"
import { namings } from "constants/namings"
import useData from "hooks/useData"
import { useState } from "react"
import api from "services/api"
import Swal from "sweetalert2"

const ExercisesList = () => {
    const base = endpoints.exercises;
    const [orderBy, setOrderBy] = useState<keyof ICell>('activity');
    const [loading, setLoading] = useState(true);
    const [data, setParams, update] = useData(base, setLoading);

    const handleDelete = async (id: string | null) => {

        const result = await Swal.fire({
            title: `Você tem certeza que deseja excluir este ${namings.exercises.singular}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#418107",
            confirmButtonText: "Sim, excluir",
            cancelButtonText: "Cancelar"
        })
        if (result.isConfirmed) {
            try {
                await api.delete(`/${endpoints.exercises}/${id}`);
                update();
            } catch (error) {
                Swal.fire({
                    title: 'Não foi possível excluir',
                    text: 'Tente novamente, caso o erro persista contate o suporte técnico.',
                    icon: 'error',
                });
            }
        }
    }

    return (
        <Table
            title={namings.exercises.plural}
            actions={[
                {
                    name: `Cadastrar ${namings.exercises.singular}`,
                    icon: <Add />,
                    link: `${links.exercises}/cadastrar`
                }
            ]}
            orderBy={orderBy}
            loading={loading}
            rows={data}
            options={[
                {
                    type: 'link',
                    name: 'Editar',
                    icon: <Edit />,
                    link: `${links.exercises}/`,
                    handle: () => { }
                },
                {
                    type: 'button',
                    name: 'Excluir',
                    icon: <Delete />,
                    handle: handleDelete
                }
            ]}
            selectedCells={(value: IRow) => {
                return {
                    id: value.id,
                    activity: value.activity.name,
                    repetition: value.repetition,
                    serie: value.serie,
                    breaktime: value.breaktime
                }
            }}
            cells={[
                { id: 'activity', label: 'Atividade' },
                { id: 'repetition', label: 'Repetição' },
                { id: 'serie', label: 'Série' },
                { id: 'breaktime', label: 'Intervalo' },
            ]}
        />
    )
}

export default ExercisesList;