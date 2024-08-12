const BASE_URL='https://api.themoviedb.org/3'
const API_KEY = process.env.TMDB_API_KEY

async function getTrendingMovie(req, res) {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
    
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
    
    const { results } = await response.json()
    
    // Check if there are movies in the results
    if (results.length > 0) {
      // Pick a random movie from the results
      const randomMovie = results[Math.floor(Math.random() * results.length)]
      // Send the random movie as the response
      return res.json(randomMovie)
    }

    // If no movies found, respond with a 404 error
    res.status(404).json({ error: 'No movies found' })
  } catch (err) {
    console.error('Error getting trending movies:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}


async function getMovieTrailers(req, res) {
  try {
    const idx = req.params.id
    
    const response = await fetch(`${BASE_URL}/movie/${idx}/videos?api_key=${API_KEY}&language=en-US`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    
    const trailers = await response.json()
  
    res.json(trailers)
  } catch (err) {
    // Log and respond with error details
    console.error('Error getting trailers:', err)
    res.status(500).json({ error: 'Internal Server Error', details: err.message })
  }
}

async function getMovieDetails(req, res) {
  try {
    const idx = req.params.id

    const response = await fetch(`${BASE_URL}/movie/${idx}?api_key=${API_KEY}&language=en-US`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const movieDetails = await response.json()

    res.json(movieDetails)
  } catch (err) {
    console.error('Error getting movie details:', err)
    res.status(500).json({ error: 'Internal Server Error', details: err.message })
  }
}


export {
  getTrendingMovie,
  getMovieTrailers,
  getMovieDetails
}