import { belongsTo, hasMany, createServer, Model } from "miragejs"
import questions from './fixtures/questions'
import game from './fixtures/game'
import gameCopy from './fixtures/gameCopy'
import flagsets from './fixtures/flagsets'
import availableFlags from './fixtures/availableFlags'

export function makeServer( {environment = "test"} = {}) {
    let server = createServer({
        environment,
        
        models: {
            teacher: Model,
            option: Model,
            flagset: Model.extend({
                flagsetQuestions: hasMany(),
            }),
            flagsetQuestion: Model.extend({
                flagset: belongsTo(),
            }),
            flagboard: Model,
            question: Model,
        },

        fixtures: {
            questions,
            flagsets,
            availableFlags,
        },

        seeds(server) {
            server.loadFixtures()

            // server.create()

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

            // flags home API endpoints
            
            
            this.get("/api/flags/flagsets", (schema) => {
                return schema.flagsets.all();
            })
            
            // create page API endpoints
            this.get("/api/questions", questions)

            this.get("/api/flags/availableFlags", availableFlags)
            
            this.post("/api/flags/create", (schema, request) => {
                let attrs = JSON.parse(request.requestBody)
                
                return schema.db.flagsets.insert(attrs)
            })

            this.post("/api/flags/flagsetQuestion/create", (schema, request) => {
                let attrs = JSON.parse(request.requestBody)
                
                return schema.db.flagsetQuestions.insert(attrs)
            })

            this.delete("/api/flags/flagsetQuestion/delete/:id", (schema, request) => {
                let id = request.params.id
                
                return schema.flagsetQuestions.find(id).destroy()
            })
            
            // edit page API endpoints
            this.get("/api/flags/flagsets/:id", (schema, request) => {
                return schema.flagsets.find(request.params.id);
            })

            this.delete(`/api/flagsets/delete/:id`, (schema, request) => {
                let id = request.params.id

                return schema.flagsets.find(id).destroy()
            })

            // play page API endpoints

            this.get("/api/flags/play", game)

            this.get("/api/flags/play/:id", gameCopy)
        }
    })

    return server
}