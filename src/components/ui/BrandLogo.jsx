import clsx from 'clsx';
import { Link } from 'react-router-dom';

function LogoMark({ size = 36, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={clsx('shrink-0', className)}
      aria-hidden
    >
      <path
        d="M12 44 L32 12 L52 44"
        stroke="#00f5ff"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="38" r="5" fill="#0066ff" />
    </svg>
  );
}

/** Original SoftTricksCode lockup: triangle mark + gradient wordmark */
export default function BrandLogo({
  className = '',
  textClassName = '',
  iconSize = 36,
  asLink = true,
}) {
  const content = (
    <>
      <LogoMark size={iconSize} />
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
