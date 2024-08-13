const BASE_URL='https://api.themoviedb.org/3'
const API_KEY = process.env.TMDB_API_KEY

async function getTrendingTv(req, res) {
  try {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`)
    
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
    
    const { results } = await response.json()
    
    // Check if there are tvShow in the results
    if (results.length > 0) {
      // Pick a random tvShow from the results
      const randomMovie = results[Math.floor(Math.random() * results.length)]
      // Send the random tvShow as the response
      return res.json(randomMovie)
    }

    // If no tvShow found, respond with a 404 error
    res.status(404).json({ error: 'No TvShows found' })
  } catch (err) {
    console.error('Error getting trending Tvs:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

async function getTvTrailers(req, res) {
  try {
    const idx = req.params.id
    
    const response = await fetch(`${BASE_URL}/tv/${idx}/videos?api_key=${API_KEY}&language=en-US`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    
    const trailers = await response.json()
  
    res.json(trailers)
  } catch (err) {
    console.error('Error getting tvShow trailers:', err)
    res.status(500).json({ error: 'Internal Server Error', details: err.message })
  }
}

async function getTvDetails(req, res) {
  try {
    const idx = req.params.id

    const response = await fetch(`${BASE_URL}/tv/${idx}?api_key=${API_KEY}&language=en-US`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const tvShowDetails = await response.json()

    res.json(tvShowDetails)
  } catch (err) {
    console.error('Error getting tvShow details:', err)
    res.status(500).json({ error: 'Internal Server Error', details: err.message })
  }
}

export {
  getTrendingTv, 
  getTvTrailers,
  getTvDetails
}