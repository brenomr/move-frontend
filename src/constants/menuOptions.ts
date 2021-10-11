import { AccountCircle, DirectionsRun, FitnessCenter, Group, Home, LibraryBooks } from "@material-ui/icons";
import { ISideMenuCategory } from "components/SideMenu/index.d";

const menuOptions: ISideMenuCategory[] = [
    {
        label: '',
        options: [
            { icon: Home, label: 'Home', link: '/' },
            { icon: AccountCircle, label: 'Meu Perfil', link: '/perfil' },
        ]
    },
    {
        label: 'Personal',
        options: [
            { icon: AccountCircle, label: 'Meu Perfil', link: '/perfil' },
            { icon: Group, label: 'Alunos', link: '/alunos' },
            { icon: FitnessCenter, label: 'Treinos', link: '/treinos' },
            { icon: LibraryBooks, label: 'Avaliações', link: '/avaliacoes' }
        ]
    },
    {
        label: 'Admin',
        options: [
            { icon: AccountCircle, label: 'Personal', link: '/personal' },
            { icon: DirectionsRun, label: 'Atividades', link: '/atividades' }
        ]
    },
    {
        label: 'Aluno',
        options: [
            { icon: FitnessCenter, label: 'Consultar Treino', link: '/consultar-treino' },
            { icon: DirectionsRun, label: 'Realizar Exercícios', link: '/realizar-exercicio' },
            { icon: LibraryBooks, label: 'Consultar Avaliação', link: '/consultar-avaliacao' }
        ]
    }

]

export default menuOptions;