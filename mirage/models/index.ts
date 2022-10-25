export type FlagSet = {
    id: string,
    title: string,
    level: string,
    week: string,
    // day: string,
    // dayOfWeek: string,
    date: string,
    status: string,
    // teacher_id: string,
    flagSetTiles: FlagSetTile[],
}

export type FlagSetTile = {
    id: string,
    flagset: FlagSet,
    country: Country,
    question: Question,
}

export type Question = {
    id: string,
    type: string,
    question: string,
    answer: string,
    options: Options[],
    reason: string,
}

export type Options = {
    id: number,
    text: string,
}

export type Country = {
    id: string,
    name: string,
    flag: string,
}

export enum QuestionTypeEnum {
    MC,
    Prompt,
    Riddle
}