const questions = [
    {
        level: '5',
        type: 'MC',
        question: "Why did the chicken cross the road?",
        answer: "To get to the other side.",
        options: [
            {id: 1, text: "He didn't."}, 
            {id: 2, text: "Did the chicken cross the road?"}, 
            {id: 3, text: "A wolf was chasing him!"},
        ],
    },
    {
        level: '8',
        type: 'Prompt',
        question: "20 Pushups!",
        answer: null,
        options: null,
    },
    {
        level: '6',
        type: 'MC',
        question: "How many hot dogs can your teacher eat?",
        answer: "100",
        options: [
            {id: 1, text: "A lot."}, 
            {id: 2, text: "A lot."}, 
            {id: 3, text: "A lot."},
        ],
    },
    {
        level: '11',
        type: 'MC',
        question: "Why is the sky blue?",
        answer: "becuase",
        options: [
            {id: 1, text: "It just is."}, 
            {id: 2, text: "It just is."}, 
            {id: 3, text: "It just is."},
        ],
    },
];

export default questions;