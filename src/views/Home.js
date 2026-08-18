import Section from 'components/Section.js';
import songs from 'data/songs';

const GENRES = ['Featured', 'Bollywood', 'English', 'Hip-Hop', 'Electronic', 'Punjabi', 'Rock', 'R&B'];

const GENRE_LABELS = {
  Featured:   'Featured tracks',
  Bollywood:  '🎵 Bollywood Hits',
  English:    '🎧 English Pop',
  'Hip-Hop':  '🔥 Hip-Hop',
  Electronic: '⚡ Electronic',
  Punjabi:    '🥁 Punjabi Beats',
  Rock:       '🎸 Rock Classics',
  'R&B':      '🎶 R&B & Soul',
};

function Home() {
  return (
    <div>
      {GENRES.map(genre => {
        const genreSongs = songs.filter(s => s.genres.includes(genre));
        if (!genreSongs.length) return null;
        return (
          <Section
            key={genre}
            title={GENRE_LABELS[genre] || genre}
            more='#'
            items={genreSongs}
          />
        );
      })}
    </div>
  );
}

export default Home;
