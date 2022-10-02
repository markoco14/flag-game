import { createServer, Model } from "miragejs"

export function makeServer( {environment = "test"} = {}) {
    let server = createServer({
        environment,
        
        models: {
            option: Model,
            set: Model,
            flagboard: Model,
            question: Model,
        },

        routes() {
            // this.namespace = "api"

            this.get("/_next/static/development/_devMiddlewareManifest.json", () => {
                return [];
            })
    
            this.get("/_next/static/development/_devPagesManifest.json", () => {
                return {"pages":["/","/../mirage","/../next.config","/_app"]};
            })

            this.get("/api/questions", () => ({
                questions: [
                    {
                        id: 1,
                        level: '5',
                        type: 'MC',
                        question: "Why did the chicken cross the road?",
                        answer: "To get to the other side.",
                        options: [
                            "He didn't.", 
                            "Did the chicken cross the road?", 
                            "A wolf was chasing him!", 
                            "He wanted to eat KFC."
                        ],
                    },
                    {
                        id: 2,
                        level: '5',
                        type: 'MC',
                        question: "What is this?",
                        answer: "Kimchi.",
                        options: [
                            "Kimchi", 
                            "Rice", 
                            "Roast Beef", 
                            "KFC"
                        ],
                    },
                    {
                        id: 3,
                        level: '6',
                        type: 'MC',
                        question: "How much wood could a woodchuck chuck....",
                        answer: "Kimchi.",
                        options: [
                            "Kimchi", 
                            "Rice", 
                            "Roast Beef", 
                            "KFC"
                        ],
                    },
                    {
                        id: 4,
                        level: '6',
                        type: 'MC',
                        question: "What type of dog is this?",
                        answer: "Corgi.",
                        options: [
                            "Golden Retriever", 
                            "Corgi", 
                            "Pug", 
                            "German Shepherd"
                        ],
                    },
                    {
                        id: 5,
                        level: '6',
                        type: 'Prompt',
                        question: "Name 5 Taiwanese teachers at Sky.",
                        answer: "n/a",
                        options: "n/a"
                    },
                    {
                        id: 6,
                        level: '6',
                        type: 'Prompt',
                        question: "Do 5 push-ups",
                        answer: "n/a",
                        options: "n/a"
                    },
                    {
                        id: 7,
                        level: '7',
                        type: 'MC',
                        question: "Who is Canada's Prime Minister?",
                        answer: "Justin Trudeau",
                        options: [
                            "Ronald McDonald", 
                            "Justin Timberlake", 
                            "Donald Trump", 
                            "Justin Trudeau"
                        ],
                    },
                    {
                        id: 8,
                        level: '8',
                        type: 'MC',
                        question: "What is Teacher Mario's favorite sport?",
                        answer: "Hockey",
                        options: [
                            "Swimming", 
                            "Hockey", 
                            "Soccer", 
                            "Frisbee"
                        ],
                    },
                ],
            }))

            this.get("/api/flags/play", () => ({
                flagboard: [
                    {
                        image: 'https://flagicons.lipis.dev/flags/4x3/ae.svg',
                        country: 'UAE',
                        id: 1,
                    },
                    {
                        image: 'https://flagicons.lipis.dev/flags/4x3/ch.svg',
                        country: 'Switzerland',
                        id: 2
                    },
                    {
                        image: 'https://flagicons.lipis.dev/flags/4x3/af.svg',
                        country: 'Afghanistan',
                        id: 3
                    },
                    {
                        image: 'https://flagicons.lipis.dev/flags/4x3/ar.svg',
                        country: 'Argentina',
                        id: 4
                    },
                    {
                        image: 'https://flagicons.lipis.dev/flags/4x3/au.svg',
                        country: 'Australia',
                        id: 5
                    },
                    {
                        image: 'https://flagicons.lipis.dev/flags/4x3/az.svg',
                        country: 'Azerbaijan',
                        id: 6
                    },
                    {
                        image: 'https://flagicons.lipis.dev/flags/4x3/ca.svg',
                        country: 'Canada',
                        id: 7
                    },
                    {
                        image: 'https://flagicons.lipis.dev/flags/4x3/bm.svg',
                        country: 'Bermuda',
                        id: 8
                    },
                    {
                        image: 'https://flagicons.lipis.dev/flags/4x3/bo.svg',
                        country: 'Bolivia',
                        id: 9
                    },
                    {
                        image: 'https://flagicons.lipis.dev/flags/4x3/de.svg',
                        country: 'Germany',
                        id: 10
                    }
                ],
            }))

            this.get("/api/flags/create", (schema) => {
                return schema.sets.all();
            })

            this.post("/api/flags/create", (schema, request) => {
                let attrs = JSON.parse(request.requestBody)
              
                return schema.db.sets.insert(attrs)
            })

            this.delete(`/api/flags/create/:id`, (schema, request) => {
                let id = request.params.id

                return schema.sets.find(id).destroy()
            })
        }
    })

    return server
}