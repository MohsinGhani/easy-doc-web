type IconProps = React.HTMLAttributes<SVGElement>;

export const GoogleIcon = (props: IconProps) => (
  <svg
    width="29"
    height="28"
    viewBox="0 0 29 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_2066_512)">
      <path
        d="M28.227 14.3225C28.227 13.3709 28.1499 12.414 27.9853 11.4778H14.78V16.8689H22.342C22.0283 18.6077 21.02 20.1458 19.5436 21.1232V24.6213H24.0551C26.7044 22.1829 28.227 18.582 28.227 14.3225Z"
        fill="#4285F4"
      />
      <path
        d="M14.78 28.0009C18.5559 28.0009 21.7402 26.7611 24.0602 24.6211L19.5487 21.1231C18.2935 21.977 16.6731 22.4606 14.7852 22.4606C11.1328 22.4606 8.03596 19.9965 6.92481 16.6836H2.26929V20.2897C4.64592 25.0172 9.48663 28.0009 14.78 28.0009Z"
        fill="#34A853"
      />
      <path
        d="M6.91966 16.6837C6.33322 14.9449 6.33322 13.0621 6.91966 11.3234V7.71729H2.26928C0.283612 11.6732 0.283612 16.3339 2.26928 20.2898L6.91966 16.6837Z"
        fill="#FBBC04"
      />
      <path
        d="M14.78 5.54127C16.776 5.51041 18.7051 6.26146 20.1506 7.64012L24.1477 3.64305C21.6167 1.26642 18.2575 -0.0402103 14.78 0.000943444C9.48663 0.000943444 4.64592 2.98459 2.26929 7.71728L6.91966 11.3234C8.02567 8.00536 11.1276 5.54127 14.78 5.54127Z"
        fill="#EA4335"
      />
    </g>
    <defs>
      <clipPath id="clip0_2066_512">
        <rect width="28" height="28" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
);

export const SpinnerIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
