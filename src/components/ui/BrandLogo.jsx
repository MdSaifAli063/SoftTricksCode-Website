import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { BRAND_ASSETS } from '../../constants/brand';

export default function BrandLogo({
  className = '',
  textClassName = '',
  imgClassName = '',
  iconSize = 55,
  showTagline = true,
  theme = 'dark',
  asLink = true,
}) {
  const logoSrc = iconSize <= 60 ? BRAND_ASSETS.logoOnDark100 : BRAND_ASSETS.logoOnDark;
  const isLight = theme === 'light';

  const content = (
    <>
      <picture>
        <source srcSet={logoSrc} type="image/webp" />
        <img
          src={BRAND_ASSETS.logoOnDarkPng}
          alt="Soft Tricks Code logo"
          width={iconSize}
          height={iconSize}
          decoding="async"
          draggable="false"
          className={clsx('shrink-0 object-contain', imgClassName)}
          style={{ width: iconSize, height: iconSize }}
        />
      </picture>
      <div className="flex w-fit flex-col justify-center text-left pt-2 sm:pt-2.5">
        <span
          className={clsx(
            'font-body font-extrabold tracking-tight leading-none block',
            textClassName || 'text-lg sm:text-xl',
            isLight ? 'text-stc-black' : 'text-white'
          )}
        >
          Soft <span className="text-stc-primary-light">Tricks</span> Code
        </span>
        {showTagline && (
          <div className="mt-[1px] sm:mt-[2px] flex w-full items-center justify-between gap-1 text-[0.44rem] sm:text-[0.48rem] font-bold uppercase tracking-[0.14em] text-stc-primary-light">
            <span className="h-[1.5px] flex-1 bg-stc-primary-light/90 rounded-full" />
            <span className="whitespace-nowrap px-0.5">SOFTWARE SOLUTIONS</span>
            <span className="h-[1.5px] flex-1 bg-stc-primary-light/90 rounded-full" />
          </div>
        )}
      </div>
    </>
  );

  const wrapperClass = clsx('inline-flex min-w-0 items-center gap-2.5', className);

  if (asLink) {
    return (
      <Link to="/" className={wrapperClass} aria-label="SoftTricksCode Home">
        {content}
      </Link>
    );
  }

  return <div className={wrapperClass}>{content}</div>;
}
