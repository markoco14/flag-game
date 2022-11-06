export type FlagSet = {
    id: string,
    title: string,
    level: string,
    week: string,
    day: string,
    dayOfWeek: string,
    class: string,
    date: string,
    status: string,
    // teacher_id: string,
    flagSetTile: FlagSetTile[],
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
    image: string,
    question: string,
    answer: string,
    options: Option[],
    reason: string,
}

export type Option = {
    id: number,
    text: string,
}

export type Country = {
    id: string,
    name: string,
    flag: string,
}

export type SearchImage = {
    image: string,
}

export enum QuestionTypeEnum {
    MC,
    Prompt,
    Riddle
}