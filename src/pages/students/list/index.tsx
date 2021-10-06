import { Add, Delete, Edit } from "@material-ui/icons"
import { IRow } from "components/EnhancedTable/index.d"
import { Table } from "components/EnhancedTable"
import { ICell } from "components/EnhancedTable/Header/index.d"
import Paper from "components/Paper"
import Title from "components/Title"
import { endpoints } from "constants/endpoints"
import { links } from "constants/links"
import { namings } from "constants/namings"
import useData from "hooks/useData"
import { useState } from "react"
import api from "services/api"
import Swal from "sweetalert2"

const StudentsList = () => {
    const base = endpoints.students;
    const [orderBy, setOrderBy] = useState<keyof ICell>('name');
    const [loading, setLoading] = useState(true);
    // const [data, setParams, update] = useData(base, setLoading);
    const data = [
        {id: '1', name: 'Mia Gomes'},
        {id: '2', name: 'Gorila Roxo'},
        {id: '3', name: 'Cleber Machado'},
        {id: '4', name: 'Tobias Amarelo'}
    ]

    const handleDelete = async (id: string | null) => {

        const result = await Swal.fire({
            title: `Você tem certeza que deseja excluir este ${namings.students.singular}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#418107",
            confirmButtonText: "Sim, excluir",
            cancelButtonText: "Cancelar"
        })
        if (result.isConfirmed) {
            try {
                await api.delete(`/${endpoints.students}/${id}`);
                // update();
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
            title='Alunos'
            actions={[
                {
                    name: 'Cadastrar Aluno',
                    icon: <Add />,
                    link: `${links.students}/cadastrar`
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
                    link: `${links.students}/`,
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
                    name: value.name
                }
            }}
            cells={[
                { id: 'name', label: 'Nome' }
            ]}
        />
    )
}

export default StudentsList;