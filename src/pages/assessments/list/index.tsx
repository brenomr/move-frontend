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
import { selectUser } from "features/user/selectors"
import { useSelector } from "react-redux"
import { EWhoIs } from "features/user/index.d"

const AssessmentsList = () => {
    const base = endpoints.assessments;
    const [orderBy, setOrderBy] = useState<keyof ICell>('name');
    const [loading, setLoading] = useState(true);
    const [data, setParams, update] = useData(base, setLoading);

    const { whois } = useSelector(selectUser);

    const isStudent = whois === EWhoIs.STUDENT;

    const handleDelete = async (id: string | null) => {

        const result = await Swal.fire({
            title: `Você tem certeza que deseja excluir este ${namings.assessments.singular}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#418107",
            confirmButtonText: "Sim, excluir",
            cancelButtonText: "Cancelar"
        })
        if (result.isConfirmed) {
            try {
                await api.delete(`/${endpoints.assessments}/${id}`);
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
            title={namings.assessments.plural}
            actions={!isStudent ? [
                {
                    name: `Cadastrar ${namings.assessments.singular}`,
                    icon: <Add />,
                    link: `${links.assessments}/cadastrar`
                }
            ] : []}
            orderBy={orderBy}
            loading={loading}
            rows={data}
            options={!isStudent ? [
                {
                    type: 'link',
                    name: 'Editar',
                    icon: <Edit />,
                    link: `${links.assessments}/`,
                    handle: () => { }
                },
                {
                    type: 'button',
                    name: 'Excluir',
                    icon: <Delete />,
                    handle: handleDelete
                }
            ] : []}
            selectedCells={(value: IRow) => {
                return {
                    id: value.id,
                    student: `${value.student.name} ${value.student.surname}`,
                    name: value.name,
                    description: value.description,
                    attached_url: <a href={value.attached_url} target="_blank">{value.attached_url}</a>
                }
            }}
            cells={[
                { id: 'student', label: 'Aluno' },
                { id: 'name', label: 'Nome' },
                { id: 'description', label: 'Descrição' },
                { id: 'attached_url', label: 'Link do Anexo' }
            ]}
        />
    )
}

export default AssessmentsList;