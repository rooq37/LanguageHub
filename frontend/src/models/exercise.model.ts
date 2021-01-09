import { ExerciseTypesEnum } from "../enums/exercise-types.enum";

export interface IExercise {
    "@type"?: ExerciseTypesEnum,
    name?: string,
    groupName?: String
} 
