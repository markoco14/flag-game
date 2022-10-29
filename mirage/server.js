import { belongsTo, hasMany, createServer, Model, RestSerializer  } from "miragejs"
// import questions from './fixtures/old/questions'
import game from './fixtures/old/game'
import gameCopy from './fixtures/old/gameCopy'

import questions from'./fixtures/questions'
import countries from './fixtures/countries'
import flagSets from './fixtures/flagSets'
import flagSetTiles from './fixtures/flagSetTiles'

export function makeServer( {environment = "test"} = {}) {
    let server = createServer({
        environment,

        serializers: {
            application: RestSerializer,
            flagSet: RestSerializer.extend({
                include: ["flagSetTile"],
                embed: true,
            }),
            flagSetTile: RestSerializer.extend({
                include: ["question", "country"],
                embed: true,
            }),
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
                country: belongsTo(),
            }),
            question: Model.extend({}),
            country: Model.extend({}),
        },

        fixtures: {
            questions,
            flagSets,
            countries,
            flagSetTiles
        },

        routes() {
            // this.namespace = "api"
            this.passthrough();

            // flags home API endpoints
            
            
            this.get("/api/flags/flagsets", (schema) => {
                return schema.flagSets.all();
            },
            { timing: 2000 }
            );
            
            // create page API endpoints

            this.get("/api/flags/countries", countries)
            
            this.post("/api/flags/flagSet/create", (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
                
                return schema.db.flagSets.insert(attrs);
            })

            this.patch("/api/flags/flagSet/updateTiles", (schema, request) => {
                let id = Number(request.params.id);
                let attrs = JSON.parse(request.requestBody);

                return schema.flagSets.find(id).update(attrs);
            })

            this.post("/api/flags/flagSetTile/create", (schema, request) => {
                let attrs = JSON.parse(request.requestBody);

                return schema.db.flagSetTiles.insert(attrs);
            })

            this.delete("/api/flags/flagSetTile/delete/:id", (schema, request) => {
                let id = request.params.id;
                
                return schema.flagSetTiles.find(id).destroy();
            })
            
            // edit page API endpoints
            
            // get flag set by id
            this.get("/api/flags/flagsets/:id", (schema, request) => {
                console.log(server.db.dump());
                return schema.flagSets.find(request.params.id);
            })

            // delete flag set by id
            this.delete(`/api/flagsets/delete/:id`, (schema, request) => {
                let id = request.params.id;

                return schema.flagSets.find(id).destroy();
            })

            /this.post("/api/question/create", (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
                
                return schema.db.questions.insert(attrs);
            })

            this.post("/api/flagSetTile/create", (schema, request) => {
                let attrs = JSON.parse(request.requestBody);

                return schema.db.flagSetTiles.insert(attrs.tileDetails);
            })

            this.put("/api/flagSet/updateTiles/:id", (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
                let flagSet = schema.flagSets.find(request.params.id);
                flagSet.update({flagSetTileIds: attrs.tileId});

                return schema.flagSets.find(request.params.id);
            })
         
            // play page API endpoints

            this.get("/api/flags/play", game);

            this.get("/api/flags/play/:id", gameCopy);
        }
    })

    return server;
}