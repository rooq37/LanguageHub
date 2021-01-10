export interface IClosedAnswer {
    answer: string,
    correct: boolean
} 
export const DEFAULT: IClosedAnswer[] = [{ answer: "yes", correct: true }]
export const CA_TRUE_FALSE: IClosedAnswer[] = [{"answer": "true", "correct": true}, {"answer": "false", "correct": false}];
export const CA_A_B_C: IClosedAnswer[] = [{"answer": "a", "correct": false}, {"answer": "b", "correct": true}, {"answer": "c", "correct": false}];
export const CA_A_B_C_D: IClosedAnswer[] = [{"answer": "a", "correct": false}, {"answer": "b", "correct": true}, {"answer": "c", "correct": false}, {"answer": "d", "correct": false}];