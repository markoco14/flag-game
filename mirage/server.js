import { belongsTo, hasMany, createServer, Model, RestSerializer  } from "miragejs"
import questions from './fixtures/questions'
import game from './fixtures/game'
import gameCopy from './fixtures/gameCopy'
import flagSets from './fixtures/flagSets'
import availableFlags from './fixtures/availableFlags'
import flagsetQuestions from './fixtures/flagsetQuestions'

export function makeServer( {environment = "test"} = {}) {
    let server = createServer({
        environment,

        serializers: {
            application: RestSerializer,
            flagset: RestSerializer.extend({
                include: ["flagsetQuestions"],
                embed: true,
            })
        },
        
        models: {
            teacher: Model.extend({
                flagset: hasMany(),
            }),
            flagSet: Model.extend({
                teacher: belongsTo(),
                flagSetTile: hasMany(),
            }),
            flagSetTile: Model.extend({
                flagSet: belongsTo(),
                question: belongsTo(),
            }),
            question: Model.extend({
                flagSetTile: hasMany(),
            }),
        },

        fixtures: {
            questions,
            flagSets,
            availableFlags,
            flagsetQuestions
        },

        routes() {
            // this.namespace = "api"
            this.passthrough();

            // flags home API endpoints
            
            
            this.get("/api/flags/flagsets", (schema) => {
                return schema.flagSets.all();
            })
            
            // create page API endpoints
            this.get("/api/questions", questions)

            this.get("/api/flags/availableFlags", availableFlags)
            
            this.post("/api/flags/create", (schema, request) => {
                let attrs = JSON.parse(request.requestBody)
                
                return schema.db.flagSets.insert(attrs)
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

                // return list.reminders
                return schema.flagSets.find(request.params.id);
            })

            this.delete(`/api/flagsets/delete/:id`, (schema, request) => {
                let id = request.params.id

                return schema.flagSets.find(id).destroy()
            })

            // play page API endpoints

            this.get("/api/flags/play", game)

            this.get("/api/flags/play/:id", gameCopy)
        }
    })

    return server
}