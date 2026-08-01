import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { BRAND_ASSETS } from '../../constants/brand';

export default function BrandLogo({
  className = '',
  textClassName = '',
  imgClassName = '',
  iconSize = 50,
  asLink = true,
}) {
  const content = (
    <>
      <img
        src={BRAND_ASSETS.logoOnDark}
        alt="Soft Tricks Code logo"
        width={iconSize}
        height={iconSize}
        decoding="async"
        draggable="false"
        className={clsx('shrink-0 object-contain', imgClassName)}
        style={{ width: iconSize, height: iconSize }}
      />
      <span
        className={clsx(
          'truncate font-heading font-extrabold logo-wordmark',
          textClassName || 'text-base sm:text-lg md:text-xl'
        )}
      >
        SoftTricksCode
      </span>
    </>
  );

  const wrapperClass = clsx('inline-flex min-w-0 items-center gap-2', className);

  if (asLink) {
    return (
      <Link to="/" className={wrapperClass} aria-label="SoftTricksCode Home">
        {content}
      </Link>
    );
  }

  return <div className={wrapperClass}>{content}</div>;
}
