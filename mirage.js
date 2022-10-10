import { createServer, Model } from "miragejs"
import questions from './fixtures/questions'
import game from './fixtures/game'
import gameCopy from './fixtures/gameCopy'
// import flagsets from './fixtures/flagsets'

export function makeServer( {environment = "test"} = {}) {
    let server = createServer({
        environment,
        
        models: {
            option: Model,
            flagset: Model,
            flagboard: Model,
            question: Model,
        },

        fixtures: {
            questions,
            // flagsets
        },

        seeds(server) {
            // server.loadFixtures()

            // flagsets.forEach((flagset) => {
            //     server.create('flagset', {
            //         title: flagset.title,
            //         class: flagset.class,
            //         dayOfWeek: flagset.dayOfWeek,
            //         date: flagset.date,
            //     });
            // })
        }, 

        routes() {
            // this.namespace = "api"

            this.passthrough();

            this.get("/_next/static/development/_devMiddlewareManifest.json", () => {
                return [];
            })
    
            this.get("/_next/static/development/_devPagesManifest.json", () => {
                return {"pages":["/","/../mirage","/../next.config","/_app"]};
            })

            // flags home API endpoints

            this.get("api/recent", (schema) => {
                return schema.flagsets.all();
            })
            
            this.get("/api/questions", questions)

            // create page API endpoints

            this.post("/api/flags/create", (schema, request) => {
                let attrs = JSON.parse(request.requestBody)
              
                return schema.db.flagsets.insert(attrs)
            })

            this.get("/api/flags/flagsets", (schema) => {
                return schema.flagsets.all();
            })

            // edit page API endpoints

            this.delete(`/api/flags/create/:id`, (schema, request) => {
                let id = request.params.id

                return schema.sets.find(id).destroy()
            })

            // play page API endpoints

            this.get("/api/flags/play", game)

            this.get("/api/flags/play/:id", gameCopy)
        }
    })

    return server
}