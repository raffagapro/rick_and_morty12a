const app = require('../src/app');
const session = require('supertest');
const agent = session(app);

describe('Test de RUTAS', ()=>{
    describe('GET /rickandmorty/character/:id', ()=>{
        it('Responde con status: 200', async ()=>{
            await agent.get('/rickandmorty/character/1').expect(200);
        })

        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async()=>{
            const {body} = await agent.get('/rickandmorty/character/1');
            expect(body).toHaveProperty("id")
            expect(body).toHaveProperty("name")
            expect(body).toHaveProperty("species")
            expect(body).toHaveProperty("gender")
            expect(body).toHaveProperty("status")
            expect(body).toHaveProperty("origin")
            expect(body).toHaveProperty("image")
        })

        it('Si hay un error responde con status: 500', async()=>{
            await agent.get('/rickandmorty/character/1337').expect(500);
        })
    });

    describe('GET /rickandmorty/login', ()=>{
        it('Responde con status: 200', async ()=>{
            await agent.get('/rickandmorty/login').expect(200);
        })

        it('Responde un objeto con la propiedad: "access:true"', async()=>{
            const {body} = await agent.get('/rickandmorty/login/?email=batman@gmail.com&password=robin')
            expect(body.access).toBe(true);
        })

        it('Responde un objeto con la propiedad: "access:false", cuando el password es incorrecto', async()=>{
            const {body} = await agent.get('/rickandmorty/login/?email=batman@gmail.com&password=atonella')
            expect(body.access).toBe(false);
        })
    });

    describe('POST /rickandmorty/fav', ()=>{
        it('Responde con status: 200', async ()=>{
            await agent.post('/rickandmorty/fav').expect(200);
        })

        it('Responde un arreglo con la info que mandamos', async()=>{
            const {body} = await agent.post('/rickandmorty/fav')
            .send({
                id: 1337,
                name: 'Batman Forever',
                status: 'Alive',
                species: 'Human',
                gender: 'Male',
                origin: {
                   name: 'Earth (C-137)',
                   url: 'https://rickandmortyapi.com/api/location/1',
                },
                image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
             })
             console.log('BODY1', body);
            expect(body[1].name).toBe('Batman Forever');
        })

        it('Responde un arreglo con el nuevo personaje', async()=>{
            const {body} = await agent.post('/rickandmorty/fav')
            .send({
                id: 1338,
                name: 'Robin Forever',
                status: 'Alive',
                species: 'Human',
                gender: 'Male',
                origin: {
                   name: 'Earth (C-137)',
                   url: 'https://rickandmortyapi.com/api/location/1',
                },
                image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
             })
             console.log('BODY2', body);
            expect(body[2].name).toBe('Robin Forever');
        })
    });

    describe('DELETE /rickandmorty/fav/:id', ()=>{
        it('Responde con status: 200', async ()=>{
            //primero subimos un character
            await agent.post('/rickandmorty/fav')
            .send({
                id: 1337,
                name: 'Batman Forever',
                status: 'Alive',
                species: 'Human',
                gender: 'Male',
                origin: {
                   name: 'Earth (C-137)',
                   url: 'https://rickandmortyapi.com/api/location/1',
                },
                image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
             })
             //luego lo borramos
            await agent.delete('/rickandmorty/fav/1337').expect(200);
        })

        it('Responde un arreglo con la info que previa si no encuentra un personaje para borrar', async()=>{
            //primero subimos un character
            await agent.post('/rickandmorty/fav')
            .send({
                id: 1337,
                name: 'Batman Forever',
                status: 'Alive',
                species: 'Human',
                gender: 'Male',
                origin: {
                   name: 'Earth (C-137)',
                   url: 'https://rickandmortyapi.com/api/location/1',
                },
                image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
             })

            const {body} = await agent.delete('/rickandmorty/fav/1338');
            expect(body.length).toBe(2);
        })

        it('Responde un arreglo sin el personaje borrado', async()=>{
            //primero subimos un character
            await agent.post('/rickandmorty/fav')
            .send({
                id: 1337,
                name: 'Batman Forever',
                status: 'Alive',
                species: 'Human',
                gender: 'Male',
                origin: {
                   name: 'Earth (C-137)',
                   url: 'https://rickandmortyapi.com/api/location/1',
                },
                image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
             })

            const {body} = await agent.delete('/rickandmorty/fav/1337');
            expect(body.length).toBe(1);
        })
    });
});