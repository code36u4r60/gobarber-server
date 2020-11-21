import { Router } from 'express';

import CreateUserService from '../service/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const creatUser = new CreateUserService();
  const user = await creatUser.execute({ name, email, password });

  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
  return response.json(userWithoutPassword);
});

export default usersRouter;
