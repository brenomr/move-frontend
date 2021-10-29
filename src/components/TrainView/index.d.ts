export interface ITrainView {
    id: string
    description: string
    endDate: string
    startDate: string
    training: ITraining
}

export interface ITraining {
    id: string
    title: string
    description: string
    exercises: IExercise[]
}

export interface IExercise {
    id: string
    breaktime: string
    repetition: string
    serie: string
    personal: IPersonal
    activity: IActivity
}

export interface IActivity {
    id: string
    category: string
    image_url: string
    name: string
}

export interface IPersonal {
    id: string
    name: string
    surname: string
}