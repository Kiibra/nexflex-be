import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as moviesCtrl from '../controllers/movies.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/trending', checkAuth, moviesCtrl.getTrendingMovie)
router.get('/:id/trailers', checkAuth, moviesCtrl.getMovieTrailers)
router.get('/:id/details', checkAuth, moviesCtrl.getMovieDetails)
router.get('/:id/similar', checkAuth, moviesCtrl.getSimilarMovies)
router.get('/:category', checkAuth, moviesCtrl.getMoviesByCategory)

export { router }