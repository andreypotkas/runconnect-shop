import { Product } from '../../types/product.type';

export default function ProductInfo({ product }: { product: Product }) {
  return (
    <div>
      <div className="flex gap-2  flex-wrap">
        <div className="flex  flex-column gap-2 ">
          <img width={270} height={270} alt="Card" src={product.images[0]} />
          {product.images && (
            <img
              width={270}
              height={270}
              alt="Card"
              src={'https://amped-x-music-uploaded-images.s3.eu-north-1.amazonaws.com/sorts/' + product.images[0]}
            />
          )}
        </div>
        <div className="flex  flex-column gap-2" style={{ maxWidth: '30rem' }}>
          <div className="flex gap-2">
            <span className="font-bold">Название:</span>
            <div>{product.title}</div>
          </div>

          <div className="flex gap-2">
            {/* <span className="font-bold">Описание:</span> */}
            <div>{product.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
