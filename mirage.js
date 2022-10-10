import { createServer, Model } from "miragejs"
import questions from './fixtures/questions'
import flagsets from './fixtures/flagsets'
import recent from './fixtures/recent'

export function makeServer( {environment = "test"} = {}) {
    let server = createServer({
        environment,
        
        models: {
            option: Model,
            set: Model,
            flagboard: Model,
            question: Model,
        },

        fixtures: {
            questions,
        },

        routes() {
            // this.namespace = "api"

            this.get("/_next/static/development/_devMiddlewareManifest.json", () => {
                return [];
            })
    
            this.get("/_next/static/development/_devPagesManifest.json", () => {
                return {"pages":["/","/../mirage","/../next.config","/_app"]};
            })

            this.get("api/recent", recent)
            
            this.get("/api/questions", questions)

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

            this.get("/api/flags/play/:id", flagsets)

            this.get("/api/flagsets", (schema) => {
                return schema.flagsets.all();
            })

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