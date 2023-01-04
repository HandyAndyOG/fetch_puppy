import express from 'express';


import { Request, Response, Application } from 'express';
const data = require("./data.json");

const app: Application = express();

interface Data {
  id: number;
  name: string;
  breed: string;
  birthDate: string
}
app.get('/api/test', (_req: Request, res: Response) => {
  return res.status(200).json({ test: 'is working as it should' });
});
app.get('/api/puppies', (_req: Request, res: Response) => {
  return res.status(200).send(data.data.puppies);
});
app.get('/api/puppies/:id', (_req: Request, res: Response) => {
  const puppyId = Number(_req.params.id)
  const filteredPuppy = data.data.puppies.find((puppy: Data) => puppy.id === puppyId)
  return res.status(200).json(filteredPuppy);
});
app.post('/api/puppies', (_req: Request, res: Response) => {
  const newPuppy = {
    id: 5,
    name: "Brody",
    breed: "German Shepard",
    birthDate: "2023/01/04"
  }
  data.data.puppies.push(newPuppy);
  return res.status(200).json(newPuppy);
});
app.put('/api/puppies/:id', (_req: Request, res: Response) => {
  const puppyId = Number(_req.params.id)
  const filteredPuppy = data.data.puppies.find((puppy: Data) => puppy.id === puppyId)
  const editPuppy = "Siberian Husky"
  filteredPuppy.breed = editPuppy
  return res.status(200).json();
});
app.delete('/api/puppies/:id', (_req: Request, res: Response) => {
  const puppyId = Number(_req.params.id)
  const filteredPuppy = data.data.puppies.find((puppy: Data) => puppy.id === puppyId)
  const indexPuppy = data.data.puppies.indexOf(filteredPuppy)
  data.data.puppies.splice(indexPuppy,1)
  return res.status(200).json();
});

export default app;
