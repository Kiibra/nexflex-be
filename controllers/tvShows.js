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


export {
  getTrendingTv, 
}