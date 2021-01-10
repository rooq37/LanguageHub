import { ExerciseTypesEnum } from "../enums/exercise-types.enum";
import { IPupilInfo } from "./pupil-info.model";

export interface IExercise {
    "@type"?: ExerciseTypesEnum,
    name?: string,
    author?: string,
    pupils?: IPupilInfo[]
} 
