import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="bg-no-repeat bg-cover px-4 py-8 md:px-6 lg:px-8 text-center"
        style={{
          height: '60rem',
          background:
            'linear-gradient(rgba(14, 19, 21, 1), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url(/public/wallpaper.avif)',
        }}
      >
        <div className="text-white text-5xl font-bold mb-4 text-white z-1">Promo Title Placeholder</div>
        <p className="line-height-3 mt-0 mb-6 p-0 text-white text-3xl">
          Malesuada bibendum arcu vitae elementum curabitur vitae nunc. Aliquam nulla facilisi cras fermentum. Et
          egestas quis ipsum suspendisse ultrices.
        </p>
        <Button size="large" label="Смотреть товары" onClick={() => navigate('/marketplace')} />
      </div>

      <div></div>
    </div>
  );
}
