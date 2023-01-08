import {Router} from 'express';
import {PetsService} from '~/resources/pets/pets.service';
import {BadRequestException, NotFoundException} from '~/utils/exceptions';


// We create a `Router` Express, it allows us to create routes outside the `src/index.ts` file
const PetsController = Router();
const service = new PetsService();

// Find all pets
PetsController.get('/', (req, res) => {
  return res
    .status(200)
    .json(service.findAll());
});

// Find a specific animal
PetsController.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    throw new BadRequestException('Invalid ID');
  }

  const pet = service.findOne(id);

  if (!pet) {
    throw new NotFoundException('Animal not found');
  }

  return res
    .status(200)
    .json(pet);
});

// Create an animal
PetsController.post('/', (req, res) => {
  const createdPet = service.create(req.body);

  return res
    .status(201)
    .json(createdPet);
});

// Update an animal
PetsController.patch('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    throw new BadRequestException('Invalid ID');
  }

  const updatedPet = service.update(req.body, id);

  return res
    .status(200)
    .json(updatedPet);
});

// Delete an animal
PetsController.delete('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    throw new BadRequestException('Invalid ID');
  }

  return res
    .status(200)
    .json(service.delete(id));
});

// We expose our controller for use in `src/index.ts`
export {PetsController};
