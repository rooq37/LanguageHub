import { LanguageCodesEnum } from "../enums/language-codes.enum";

export interface TranslateRequest {
    sourceLanguageCode: LanguageCodesEnum;
    targetLanguageCode: LanguageCodesEnum;
    text: string;
} 