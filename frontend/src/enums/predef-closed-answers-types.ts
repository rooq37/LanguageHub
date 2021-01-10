import { CA_A_B_C, CA_A_B_C_D, CA_TRUE_FALSE, DEFAULT, IClosedAnswer } from "../models/closed-answer.model";

export class PredefClosedAnswersEnum {
    public static readonly TRUE_FALSE = new PredefClosedAnswersEnum("True/false", CA_TRUE_FALSE);
    public static readonly A_B_C = new PredefClosedAnswersEnum("A, B, C", CA_A_B_C);
    public static readonly A_B_C_D = new PredefClosedAnswersEnum("A, B, C, D", CA_A_B_C_D);
    public static readonly CUSTOM = new PredefClosedAnswersEnum("CUSTOM", DEFAULT);
    public static readonly keys = [PredefClosedAnswersEnum.TRUE_FALSE, PredefClosedAnswersEnum.A_B_C, PredefClosedAnswersEnum.A_B_C_D, PredefClosedAnswersEnum.CUSTOM];
    private constructor(public readonly variable: string, public readonly value: IClosedAnswer[]) {
    }
  }