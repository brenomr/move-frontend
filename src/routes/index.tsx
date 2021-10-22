import { selectUser } from 'features/user/selectors';
import MainLayout from 'layout/main';
import HomePage from 'pages/home';
import LoginPage from 'pages/login';
import StudentsList from 'pages/students/list';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFoundImage from 'assets/images/notfound.svg';
import CreateStudent from 'pages/students/create';
import ActivitiesList from 'pages/activities/list';
import CreateActivity from 'pages/activities/create';
import ExercisesList from 'pages/exercises/list';
import CreateExercise from 'pages/exercises/create';
import TrainingsList from 'pages/trainings/list';
import CreateTraining from 'pages/trainings/create';
import AssessmentsList from 'pages/assessments/list';
import CreateAssessment from 'pages/assessments/create';
import CoursesList from 'pages/courses/list';
import CreateCourse from 'pages/courses/create';
import UsersList from 'pages/users/list';
import CreateUser from 'pages/users/create';
import CheckTrain from 'pages/checktrain';

const Routes = () => {

    const { signed } = useSelector(selectUser);

    const NotFound = () => <img src={NotFoundImage} alt="Página não econtrada" />
    return (
        <BrowserRouter>
            {signed ?
                <MainLayout>
                    <Switch>
                        <Route path="/" exact component={HomePage} />

                        <Route path="/alunos" exact component={StudentsList} />
                        <Route path="/alunos/cadastrar" exact component={CreateStudent} />
                        <Route path="/alunos/:id" exact component={CreateStudent} />

                        <Route path="/atividades" exact component={ActivitiesList} />
                        <Route path="/atividades/cadastrar" exact component={CreateActivity} />
                        <Route path="/atividades/:id" exact component={CreateActivity} />

                        <Route path="/exercicios" exact component={ExercisesList} />
                        <Route path="/exercicios/cadastrar" exact component={CreateExercise} />
                        <Route path="/exercicios/:id" exact component={CreateExercise} />

                        <Route path="/modelos" exact component={TrainingsList} />
                        <Route path="/modelos/cadastrar" exact component={CreateTraining} />
                        <Route path="/modelos/:id" exact component={CreateTraining} />

                        <Route path="/avaliacoes" exact component={AssessmentsList} />
                        <Route path="/avaliacoes/cadastrar" exact component={CreateAssessment} />
                        <Route path="/avaliacoes/:id" exact component={CreateAssessment} />

                        <Route path="/treinos" exact component={CoursesList} />
                        <Route path="/treinos/cadastrar" exact component={CreateCourse} />
                        <Route path="/treinos/:id" exact component={CreateCourse} />

                        <Route path="/usuarios" exact component={UsersList} />
                        <Route path="/usuarios/cadastrar" exact component={CreateUser} />
                        <Route path="/usuarios/:id" exact component={CreateUser} />

                        <Route path="/consultar-treino" exact component={CheckTrain} />

                        <Route path="/consultar-avaliacao" exact component={AssessmentsList} />

                        <Route component={NotFound} />
                    </Switch>
                </MainLayout>
                :
                <Switch>
                    <Route path="/" exact component={LoginPage} />
                    <Route component={NotFound} />
                </Switch>
            }
        </BrowserRouter>

    )
}
export default Routes
