import { Grape } from '../../types/product.type';

export default function ProductInfo({ product }: { product: Grape }) {
  return (
    <div>
      <div className="flex gap-2  flex-wrap">
        <div className="flex  flex-column gap-2 ">
          <img
            width={270}
            height={270}
            alt="Card"
            src={'https://amped-x-music-uploaded-images.s3.eu-north-1.amazonaws.com/sorts/' + product.img}
          />
          {product.srcVideo && (
            <iframe
              src={product.srcVideo}
              width={270}
              height={270}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          )}
          {product.additionalImages && (
            <img
              width={270}
              height={270}
              alt="Card"
              src={
                'https://amped-x-music-uploaded-images.s3.eu-north-1.amazonaws.com/sorts/' + product.additionalImages[0]
              }
            />
          )}
        </div>
        <div className="flex  flex-column gap-2" style={{ maxWidth: '30rem' }}>
          <div className="flex gap-2">
            <span className="font-bold">Название:</span>
            <div>{product.title}</div>
          </div>
          {product.ripening && (
            <div className="flex gap-2">
              <span className="font-bold">Созревание:</span>
              <div>{product.ripening}</div>
            </div>
          )}
          {product.seed && (
            <div className="flex gap-2">
              <span className="font-bold">Семечка:</span>
              <div>{product.seed ? 'есть' : 'нет'}</div>
            </div>
          )}

          {product.frostResistance && (
            <div className="flex gap-2">
              <span className="font-bold">Морозостойкость:</span>
              <div>{product.frostResistance}</div>
            </div>
          )}
          {product.color && (
            <div className="flex gap-2">
              <span className="font-bold">Цвет:</span>
              <div>{product.color}</div>
            </div>
          )}
          <div className="flex gap-2">
            {/* <span className="font-bold">Описание:</span> */}
            <div>{product.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
