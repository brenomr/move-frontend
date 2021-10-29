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
import { Avatar } from "@material-ui/core"

const UsersList = () => {
    const base = endpoints.users;
    const [orderBy, setOrderBy] = useState<keyof ICell>('name');
    const [loading, setLoading] = useState(true);
    const [data, setParams, update] = useData(base, setLoading);

    const handleDelete = async (id: string | null) => {

        const result = await Swal.fire({
            title: `Você tem certeza que deseja excluir este ${namings.users.singular}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#418107",
            confirmButtonText: "Sim, excluir",
            cancelButtonText: "Cancelar"
        })
        if (result.isConfirmed) {
            try {
                await api.delete(`/${endpoints.users}/${id}`);
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
            title={namings.users.plural}
            actions={[
                {
                    name: `Cadastrar ${namings.users.singular}`,
                    icon: <Add />,
                    link: `${links.users}/cadastrar`
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
                    link: `${links.users}/`,
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
                    photo_url: <Avatar src={value.photo_url} style={{ width: 80, height: 80 }} />,
                    name: value.name,
                    email: value.email,
                    phone: value.phone,
                    cref: value.cref
                }
            }}
            cells={[
                { id: 'photo_url', label: 'Avatar' },
                { id: 'name', label: 'Nome' },
                { id: 'email', label: 'Email' },
                { id: 'phone', label: 'Celular' },
                { id: 'cref', label: 'CREF' },
            ]}
        />
    )
}

export default UsersList;