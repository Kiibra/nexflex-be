import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as tvShowsCtrl from '../controllers/tvShows.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/trending', checkAuth, tvShowsCtrl.getTrendingTv)
router.get('/:id/trailers',checkAuth, tvShowsCtrl.getTvTrailers)
router.get('/:id/details', checkAuth, tvShowsCtrl.getTvDetails)
router.get('/:id/similar', checkAuth, tvShowsCtrl.getSimilarTvs)
router.get('/:category', checkAuth, tvShowsCtrl.getTvsByCategory)

export { router }