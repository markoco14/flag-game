export type Flag = {
    image: string,
    country: string,
    id: number
}

export type FlagBoard = {
    flags: Flag[]
}

export type IQuestions = {
    id: number;
    level: string;
    type: string;
    question: string;
    answer: string;
    options: string | string[];
}