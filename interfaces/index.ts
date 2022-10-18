export type Flag = {
    image: string,
    country: string,
    id: number
}

export type IFlagSet = {
    id: number,
    title: string,
    date: string,
    dayOfWeek: string,
    class: string,
    level: string,
    week: string,
    day: string,
}

export type IFlagsetQuestion = {
    id: number,
    flagset_id: number,
    question_id: number,
    country: string,
    flag: string,
}

export type FlagBoard = {
    flags: Flag[]
}

export type IQuestions = {
    id: number;
    level: string;
    country: string;
    type: string;
    question: string;
    answer: string;
    options: IOptions[];
}

export type IOptions = {
    id: number;
    text: string;
}