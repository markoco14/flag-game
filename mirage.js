import { createServer, Model } from "miragejs"
import questions from './fixtures/questions'
import game from './fixtures/game'
import gameCopy from './fixtures/gameCopy'
import flagsets from './fixtures/flagsets'

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
            flagsets
        },

        routes() {
            // this.namespace = "api"

            this.get("/_next/static/development/_devMiddlewareManifest.json", () => {
                return [];
            })
    
            this.get("/_next/static/development/_devPagesManifest.json", () => {
                return {"pages":["/","/../mirage","/../next.config","/_app"]};
            })

            this.get("api/recent", flagsets)
            
            this.get("/api/questions", questions)

            this.get("/api/flags/play", game)

            this.get("/api/flags/play/:id", gameCopy)

            this.get("/api/flagsets", (schema) => {
                return schema.flagsets.all();
            })

            this.post("/api/flags/create", (schema, request) => {
                let attrs = JSON.parse(request.requestBody)
              
                return schema.db.sets.insert(attrs)
            })

            this.get("/api/flags/flagsets", (schema) => {
                return schema.sets.all();
            })

            this.delete(`/api/flags/create/:id`, (schema, request) => {
                let id = request.params.id

                return schema.sets.find(id).destroy()
            })
        }
    })

    return server
}