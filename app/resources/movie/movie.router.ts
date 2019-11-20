import { Router } from 'express';
import controllers from './movie.controllers';

const router = Router();

router.route('/movies').get(controllers.getMany);

router.route('/movies/:id').get(controllers.getOne);

export default router;
