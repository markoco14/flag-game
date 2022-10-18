export type FlagSet = {
    id: string,
    level: string,
    week: string,
    date: string,
    status: string,
    teacher_id: string,
}

export type FlagSetTile = {
    id: string,
    flagset: FlagSet,
    country: Country
    question: Question
}

export type Question = {
    id: string,
    type: string,
    question: string,
    answer: string,
    wrong: string[],
    reason: string,
}

export type Country = {
    id: string,
    name: string,
    image: string,
}

enum QuestionTypeEnum {
    MC,
    Prompt,
    Riddle
}