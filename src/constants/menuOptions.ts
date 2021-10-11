import { AccountCircle, DirectionsRun, FitnessCenter, Group, Home, LibraryBooks } from "@material-ui/icons";
import { ISideMenuCategory } from "components/SideMenu/index.d";

const menuOptions: ISideMenuCategory[] = [
    {
        label: '',
        key: 'user',
        options: [
            { icon: Home, label: 'Home', link: '/' },
            { icon: AccountCircle, label: 'Meu Perfil', link: '/perfil' },
        ]
    },
    {
        label: 'Personal',
        key: 'personal',
        options: [
            { icon: Group, label: 'Alunos', link: '/alunos' },
            { icon: FitnessCenter, label: 'Treinos', link: '/treinos' },
            { icon: DirectionsRun, label: 'Exercícios', link: '/exercicios' },
            { icon: LibraryBooks, label: 'Avaliações', link: '/avaliacoes' }
        ]
    },
    {
        label: 'Admin',
        key: 'admin',
        options: [
            { icon: AccountCircle, label: 'Personal', link: '/personal' },
            { icon: DirectionsRun, label: 'Atividades', link: '/atividades' }
        ]
    },
    {
        label: 'Aluno',
        key: 'student',
        options: [
            { icon: FitnessCenter, label: 'Consultar Treino', link: '/consultar-treino' },
            { icon: DirectionsRun, label: 'Realizar Exercícios', link: '/realizar-exercicio' },
            { icon: LibraryBooks, label: 'Consultar Avaliação', link: '/consultar-avaliacao' }
        ]
    }

]

export default menuOptions;