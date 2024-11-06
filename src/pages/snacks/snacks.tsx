import { ScrollRestoration } from 'react-router-dom';

function Snacks() {
  return (
    <div>
      <div style={{ marginBottom: '50rem' }}>
        <p>snacks</p>
      </div>
      <section id="teknik">
        <ScrollRestoration />
        <p>teknik</p>
      </section>
    </div>
  );
}

export default Snacks;
