import { useState } from 'react';
import axios from 'axios';

function Dashboard() {
  return (
    <div>


      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white-50 bg-black-950 rounded-md p-6">
            FLIX
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

function YouTubeSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([]);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchVideos();
  };

  const fetchVideos = async () => {
    const apiKey = "AIzaSyBzkrecHSWUAC9ByRbuTzo1bZo1JHlVIQ0"; // Replace with your own API key
    const data = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchQuery}&type=video&key=${apiKey}`)
    console.log(data);
    // fetch(
    //   `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchQuery}&type=video&key=${apiKey}`
    // )
    //   .then((response) => response.json())
    //   .then((data) => setVideos(data.items))
    //   .catch((error) => console.error('Error fetching videos:', error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchQuery} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>

      {videos.map((video) => (
        <div key={video.id.videoId}>
          <h2>{video.snippet.title}</h2>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            title={video.snippet.title}
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
}

// export default YouTubeSearch;
export default Dashboard;