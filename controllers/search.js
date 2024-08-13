const BASE_URL='https://api.themoviedb.org/3'
const API_KEY = process.env.TMDB_API_KEY
import { User } from '../models/user.js'

async function searchMulti(req, res) {
  try {
    const query = encodeURIComponent(req.params.query)
    const response = await fetch(`${BASE_URL}/search/multi?query=${query}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const searchMultiData = await response.json()

    // If no results are found, return a 404 status with a message
    if (searchMultiData.results.length === 0) {
      return res.status(404).json({ message: 'No results found for the given query' })
    }
    // push the searched item/person to searchHistory with the id, image, title, searchType, and date
    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        searchHistory: {
          id:searchMultiData.results[0].id,
          image: searchMultiData.results[0].poster_path || searchMultiData.results[0].profile_path,
          title: searchMultiData.results[0].name || searchMultiData.results[0].title,
          searchTypes: searchMultiData.results[0].media_type,
          createdAt: new Date(),
        }
      }
    })

    // Return the search results
    res.status(200).json({ success: true, content: searchMultiData.results })
  } catch (err) {
    console.error('Error searching for input:', err.message)
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
}


async function getSearchHistory (req, res) {
  try {
    res.status(200).json({success: true, content: req.user.searchHistory})
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message })
  }
}

async function removeFromSearchHistory(req, res) {
  
}
export {
  searchMulti,
  getSearchHistory,
}