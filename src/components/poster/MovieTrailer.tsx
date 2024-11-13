import { Col } from 'react-bootstrap';
import { Film } from 'react-bootstrap-icons';

interface MovieTrailerProps {
  trailer?: string;
  title: string;
}

const convertToEmbedLink = (trailerUrl: string) => {
  let videoId = '';
  if (trailerUrl.includes('watch?v=')) {
    videoId = trailerUrl.split('v=')[1].split('&')[0];
  } else if (trailerUrl.includes('youtu.be/')) {
    videoId = trailerUrl.split('youtu.be/')[1].split('?')[0];
  }
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return trailerUrl;
};

export default function MovieTrailer({ trailer, title }: MovieTrailerProps) {
  return (
    <Col>
      {trailer ? (
        <iframe
          style={{ width: '100%', height: '38vh' }}
          src={convertToEmbedLink(trailer)}
          title={`${title} trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '38vh',
          }}
          className=" d-flex align-items-center justify-content-center flex-column bg-rosa text-dark gap-3 rounded"
        >
          <Film style={{ fontSize: '4em', color: 'black' }} />
          <p>Inga trailer tillgängliga för den här filmen</p>
        </div>
      )}
    </Col>
  );
}
