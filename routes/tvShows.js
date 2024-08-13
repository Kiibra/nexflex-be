import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as tvShowsCtrl from '../controllers/tvShows.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/trending', tvShowsCtrl.getTrendingTv)
router.get('/:id/trailers', tvShowsCtrl.getTvTrailers)
router.get('/:id/details', tvShowsCtrl.getTvDetails)
router.get('/:id/similar', tvShowsCtrl.getSimilarTvs)

export { router }