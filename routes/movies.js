import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as moviesCtrl from '../controllers/movies.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/trending', moviesCtrl.getTrendingMovie)
router.get('/:id/trailers', moviesCtrl.getMovieTrailers)
router.get('/:id/details', moviesCtrl.getMovieDetails)
router.get('/:id/similar', moviesCtrl.getSimilarMovies)
router.get('/:category', moviesCtrl.getMoviesByCategory)

export { router }