import express from 'express';
import { Request, Response, Application } from 'express';
const dataFile = "data.json";
const app: Application = express();
const bp = require('body-parser')
const fs = require('fs')


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
    fs.readFile(dataFile, 'utf8', (err: string, data: string) => {
      if (err) {
        return res.status(404).send('Error reading data file')
      } else {
      return res.status(200).json(JSON.parse(data));
      }
    })
});
app.get('/api/puppies/:id', (_req: Request, res: Response) => {
    fs.readFile(dataFile, 'utf8', (err: string, data: string) => {
      if (err) {
        return res.status(404).send('Error reading data file')
      } else {
      const puppyId = Number(_req.params.id)
      const puppyData = JSON.parse(data)
      const filteredPuppy = puppyData.data.puppies.find((puppy: Data) => puppy.id === puppyId)
      return res.status(200).send(filteredPuppy);
      }
    })
});
app.post('/api/puppies/', (_req: Request, res: Response) => {
  fs.readFile(dataFile, 'utf8', (err: string, data: string) => {
    if (err) {
      return res.status(404).send('Error reading data file')
    } else {
      const puppyData = JSON.parse(data)
      const newPuppy = {
        id: puppyData.data.puppies.length + 1,
        name: _req.body.name,
        breed: _req.body.breed,
        birthDate: _req.body.birthDate
    }
    puppyData.data.puppies.push(newPuppy);
    let addPuppy = JSON.stringify(puppyData)
    fs.writeFile(dataFile, addPuppy, 'utf-8', (err: string) => {
      if (err) {
        res.status(404).send('Failed to update the database')
        return
      }
      return res.status(200).send(newPuppy.id.toString())
    })
    }
    return
  })
});
app.put('/api/puppies/:id', (_req: Request, res: Response) => {
  fs.readFile(dataFile, 'utf8', (err: string, data: string) => {
    if (err) {
      return res.status(404).send('Error reading data file')
    } else {
      const puppyData = JSON.parse(data)
      const puppyId = Number(_req.params.id)
      const filteredPuppy = puppyData.data.puppies.find((puppy: Data) => puppy.id === puppyId)
      if(filteredPuppy) {
        filteredPuppy.name = _req.body.name,
        filteredPuppy.breed = _req.body.breed,
        filteredPuppy.birthDate = _req.body.birthDate
        let updatedPup = JSON.stringify(puppyData)
      fs.writeFile(dataFile, updatedPup, 'utf-8', (err: string) => {
        if (err) {
          res.status(404).send('Failed to update the database')
          return
        }
        return res.status(200).json(filteredPuppy)
      })
      } else {
        return res.status(404).send('Failed to update the database')
      }

      }
    return
  })
});

app.delete('/api/puppies/:id', (_req: Request, res: Response) => {
  fs.readFile(dataFile, 'utf8', (err: string, data: string) => {
    if (err) {
      return res.status(404).send('Error reading data file')
    } else {
      const puppyData = JSON.parse(data)
      const puppyId = Number(_req.params.id)
      const filteredPuppy = puppyData.data.puppies.find((puppy: Data) => puppy.id === puppyId)
      if(filteredPuppy) {
        const indexPuppy = puppyData.data.puppies.indexOf(filteredPuppy)
        puppyData.data.puppies.splice(indexPuppy,1)
  
      let newPuppyData = JSON.stringify(puppyData)
      fs.writeFile(dataFile, newPuppyData, 'utf-8', (err: string) => {
        if (err) {
          res.status(404).send('Failed to update the database')
          return
        }
        return res.status(200).send()
      })
      } else {
        return res.status(404).send('Failed to update the database')
      }

      }
    return
  })
});

export default app;
