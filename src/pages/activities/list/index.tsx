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

const ActivitiesList = () => {
    const base = endpoints.activities;
    const [orderBy, setOrderBy] = useState<keyof ICell>('name');
    const [loading, setLoading] = useState(true);
    const [data, setParams, update] = useData(base, setLoading);

    const handleDelete = async (id: string | null) => {

        const result = await Swal.fire({
            title: `Você tem certeza que deseja excluir este ${namings.activities.singular}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#418107",
            confirmButtonText: "Sim, excluir",
            cancelButtonText: "Cancelar"
        })
        if (result.isConfirmed) {
            try {
                await api.delete(`/${endpoints.activities}/${id}`);
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
            title={namings.activities.plural}
            actions={[
                {
                    name: `Cadastrar ${namings.activities.singular}`,
                    icon: <Add />,
                    link: `${links.activities}/cadastrar`
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
                    link: `${links.activities}/`,
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
                    image_url: <img src={value.image_url} alt={value.image_url} />,
                    name: value.name,
                    category: value.category
                }
            }}
            cells={[
                { id: 'image_url', label: 'Imagem' },
                { id: 'name', label: 'Nome' },
                { id: 'category', label: 'Categoria' }
            ]}
        />
    )
}

export default ActivitiesList;