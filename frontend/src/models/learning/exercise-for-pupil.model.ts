import { ExerciseTypesEnum } from "../../enums/exercise-types.enum";

export interface IExerciseForPupil {
    "@type"?: ExerciseTypesEnum,
    name?: string,
    author?: string,
    solved?: boolean,
    percentageScore: number
} 
