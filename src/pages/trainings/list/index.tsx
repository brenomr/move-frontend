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

const TrainingsList = () => {
    const base = endpoints.trainings;
    const [orderBy, setOrderBy] = useState<keyof ICell>('title');
    const [loading, setLoading] = useState(true);
    const [data, setParams, update] = useData(base, setLoading);

    const handleDelete = async (id: string | null) => {

        const result = await Swal.fire({
            title: `Você tem certeza que deseja excluir este ${namings.trainings.singular}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#418107",
            confirmButtonText: "Sim, excluir",
            cancelButtonText: "Cancelar"
        })
        if (result.isConfirmed) {
            try {
                await api.delete(`/${endpoints.trainings}/${id}`);
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
            title={namings.trainings.plural}
            actions={[
                {
                    name: `Cadastrar ${namings.trainings.singular}`,
                    icon: <Add />,
                    link: `${links.trainings}/cadastrar`
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
                    link: `${links.trainings}/`,
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
                    title: value.title,
                    description: value.description
                }
            }}
            cells={[
                { id: 'title', label: 'Título' },
                { id: 'description', label: 'Descrição' },
            ]}
        />
    )
}

export default TrainingsList;