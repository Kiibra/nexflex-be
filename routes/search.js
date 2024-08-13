import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as searchCtrl from '../controllers/search.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/multi/:query', checkAuth, searchCtrl.searchMulti)

router.get('/history', checkAuth, searchCtrl.getSearchHistory)
router.delete('/history/:id', checkAuth, searchCtrl.removeFromSearchHistory)

export { router }