import clsx from 'clsx';
import { Link } from 'react-router-dom';

// Put your logo image in public/stc-logo.png, or replace this with a hosted image URL.
const LOGO_SRC = 'https://ik.imagekit.io/77nsbwefl/website.png';

export default function BrandLogo({
  className = '',
  textClassName = '',
  imgClassName = '',
  iconSize = 55,
  asLink = true,
}) {
  const content = (
    <>
      <img
        src={LOGO_SRC}
        alt="Soft Tricks Code logo"
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
