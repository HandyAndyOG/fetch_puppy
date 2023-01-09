import express from 'express';
import { Request, Response, Application } from 'express';
const data = require("./data.json");
const app: Application = express();
const bp = require('body-parser')


interface Data {
  id: number;
  name: string;
  breed: string;
  birthDate: string
}

app.use(function(_, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get('/api/test', (_req: Request, res: Response) => {
  return res.status(200).json({ test: 'is working as it should' });
});
app.get('/api/puppies', (_req: Request, res: Response) => {
  try {
    return res.status(200).send(data.data.puppies);
  } catch (e) {
    return res.status(404).send(e)
  }
});
app.get('/api/puppies/:id', (_req: Request, res: Response) => {
  try {
    const puppyId = Number(_req.params.id)
    const filteredPuppy = data.data.puppies.find((puppy: Data) => puppy.id === puppyId)
    return res.status(200).json(filteredPuppy);
  } catch (e) {
    return res.status(404).send(e)
  }
});
app.post('/api/puppies/', (_req: Request, res: Response) => {
  console.log(_req.body)
  try {
    const newPuppy = {
      id: data.data.puppies.length + 1,
      name: _req.body.name,
      breed: _req.body.breed,
      birthDate: _req.body.birthDate
    }
    data.data.puppies.push(newPuppy);
    return res.status(200).json(newPuppy);
  } catch (e) {
    return res.status(404).send(e)
  }
});
app.put('/api/puppies/:id', (_req: Request, res: Response) => {
  const puppyId = Number(_req.params.id)
  const filteredPuppy = data.data.puppies.find((puppy: Data) => puppy.id === puppyId)
  if(filteredPuppy) {
    filteredPuppy.name = _req.body.name,
    filteredPuppy.breed = _req.body.breed,
    filteredPuppy.birthDate = _req.body.birthDate
    return res.status(200).json(filteredPuppy);
  } else {
    return res.status(404).send('Not found')
  }
});
app.delete('/api/puppies/:id', (_req: Request, res: Response) => {
  try {
    const puppyId = Number(_req.params.id)
    const filteredPuppy = data.data.puppies.find((puppy: Data) => puppy.id === puppyId)
    const indexPuppy = data.data.puppies.indexOf(filteredPuppy)
    data.data.puppies.splice(indexPuppy,1)
    return res.status(200).json();
  } catch (e) {
    return res.status(404).send(e)
  }
});

export default app;
