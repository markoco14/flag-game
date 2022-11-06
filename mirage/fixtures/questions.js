const questions = [
    {
        level: '5',
        type: 'MC',
        image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*',
        question: "Why did the chicken cross the road?",
        answer: 1,
        options: [
            {id: 1, text: "He didn't.", image: null}, 
            {id: 2, text: "Did the chicken cross the road?", image: null}, 
            {id: 3, text: "A wolf was chasing him!", image: null},
            {id: 4, text: "He was hungry!", image: null},
        ],
    },
    {
        level: '8',
        type: 'Prompt',
        image: 'https://paradepets.com/.image/t_share/MTkxMzY1Nzg4NDEyMjI1MTIy/samoyed.jpg',
        question: "20 Pushups!",
        answer: null,
        options: null,
    },
    {
        level: '6',
        type: 'MC',
        image: 'http://cdn.akc.org/content/article-body-image/cavkingcharlessmalldogs.jpg',
        question: "How many hot dogs can your teacher eat?",
        answer: 1,
        options: [
            {id: 1, text: "A lot.", image: null}, 
            {id: 2, text: "A lot.", image: null}, 
            {id: 3, text: "A lot.", image: null},
            {id: 4, text: "A lot.", image: null},
        ],
    },
    {
        level: '11',
        type: 'MC',
        image: 'https://www.thesprucepets.com/thmb/WLe1HKPVTt7LMg9mVV1aRfVzd5g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cute-dog-breeds-we-can-t-get-enough-of-4589340-14-4cdb2f10e1654a468f13cd95ff880834.jpg',
        question: "Why is the sky blue?",
        answer: 1,
        options: [
            {id: 1, text: "It just is.", image: null}, 
            {id: 2, text: "It just is.", image: null}, 
            {id: 3, text: "It just is.", image: null},
            {id: 4, text: "It just is.", image: null},
        ],
    },
    {
        level: '11',
        type: 'Image MC',
        image: null,
        question: "1 Out",
        answer: 1,
        options: [
            {
                id: 1, 
                text: "This one!", 
                image: 'http://cdn.akc.org/content/article-body-image/cavkingcharlessmalldogs.jpg'
            }, 
            {
                id: 2, 
                text: "This one!", 
                image: 'http://cdn.akc.org/content/article-body-image/cavkingcharlessmalldogs.jpg'
            }, 
            {
                id: 3, 
                text: "This one!", 
                image: 'http://cdn.akc.org/content/article-body-image/cavkingcharlessmalldogs.jpg'
            },
            {
                id: 4, 
                text: "This one!", 
                image: 'http://cdn.akc.org/content/article-body-image/cavkingcharlessmalldogs.jpg'
            },
        ],
    },
];

export default questions;