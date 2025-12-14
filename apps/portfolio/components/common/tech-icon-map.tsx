import {
  Amazonec2,
  Amazons3,
  Amazonwebservices,
  Apacheecharts,
  Astro,
  Createreactapp,
  Css3,
  Express,
  Framer,
  Googledrive,
  Graphql,
  Html5,
  Javascript,
  Mapbox,
  Mui,
  Nextdotjs,
  Nginx,
  Postgresql,
  Python,
  Radixui,
  React,
  Reacthookform,
  Reactquery,
  Remix,
  Stripe,
  Swr,
  Tailwindcss,
  Typescript,
  Vite,
  Zod,
} from "@workspace/ui/icons/tech-stack-icons";
import { cn } from "@workspace/ui/lib/utils";

const defaultStyle = cn(
  "transition-[fill] ease-in-out duration-300 hover:fill-neutral-600 size-7"
);

const defaultProps = {
  size: 28,
  color: "default",
};

export const ICONMAP = {
  react: <React {...defaultProps} className={defaultStyle} />,
  tailwind: <Tailwindcss {...defaultProps} className={defaultStyle} />,
  javascript: (
    <Javascript
      {...defaultProps}
      data-title="Python"
      className={defaultStyle}
    />
  ),
  "framer-motion": (
    <Framer
      {...defaultProps}
      data-title="Framer Motion"
      className={defaultStyle}
    />
  ),
  next: (
    <Nextdotjs
      {...defaultProps}
      data-title="NextJS"
      size={28}
      color="white"
      className={defaultStyle}
    />
  ),
  typescript: (
    <Typescript
      {...defaultProps}
      data-title="Typescript"
      className={defaultStyle}
    />
  ),
  vite: <Vite {...defaultProps} data-title="Vite" className={defaultStyle} />,
  "react-query": (
    <Reactquery
      {...defaultProps}
      data-title="React Query"
      className={defaultStyle}
    />
  ),
  "create-react-app": (
    <Createreactapp
      {...defaultProps}
      data-title="Create React App"
      className={defaultStyle}
    />
  ),
  "react-hook-form": (
    <Reacthookform
      {...defaultProps}
      data-title="React Hook Form"
      className={defaultStyle}
    />
  ),
  swr: (
    <Swr
      {...defaultProps}
      data-title="SWC"
      color="white"
      className={defaultStyle}
    />
  ),
  "material-ui": (
    <Mui {...defaultProps} data-title="Material UI" className={defaultStyle} />
  ),
  "radix-ui": (
    <Radixui
      {...defaultProps}
      data-title="Radix UI"
      size={28}
      color="white"
      className={defaultStyle}
    />
  ),
  echarts: (
    <Apacheecharts
      {...defaultProps}
      data-title="Apache Echarts"
      className={defaultStyle}
    />
  ),
  mapbox: (
    <Mapbox
      {...defaultProps}
      data-title="Mapbox"
      color="white"
      className={defaultStyle}
    />
  ),
  nginx: (
    <Nginx
      {...defaultProps}
      data-title="NGINX"
      color="white"
      className={defaultStyle}
    />
  ),
  zod: (
    <Zod
      {...defaultProps}
      data-title="Zod"
      color="white"
      className={defaultStyle}
    />
  ),
  remix: (
    <Remix {...defaultProps} data-title="RemixJs" className={defaultStyle} />
  ),
  astro: (
    <Astro {...defaultProps} data-title="AstroJs" className={defaultStyle} />
  ),
  stripe: (
    <Stripe {...defaultProps} data-title="Stripe" className={defaultStyle} />
  ),
  python: (
    <Python {...defaultProps} data-title="Python" className={defaultStyle} />
  ),
  express: (
    <Express
      {...defaultProps}
      data-title="ExpressJs"
      color="white"
      className={defaultStyle}
    />
  ),
  aws: (
    <Amazonwebservices
      {...defaultProps}
      data-title="AWS"
      className={defaultStyle}
    />
  ),
  "postgres-sql": (
    <Postgresql
      {...defaultProps}
      data-title="Postgres SQL"
      className={defaultStyle}
    />
  ),
  "simple storage service (s3)": (
    <Amazons3 {...defaultProps} data-title="S3" className={defaultStyle} />
  ),
  "elastic cloud compute (ec2)": (
    <Amazonec2 {...defaultProps} data-title="EC2" className={defaultStyle} />
  ),
  html: <Html5 {...defaultProps} data-title="HTML" className={defaultStyle} />,
  CSS: <Css3 {...defaultProps} data-title="CSS" className={defaultStyle} />,
  "google-drive-api": (
    <Googledrive
      {...defaultProps}
      data-title="Google Drive API"
      className={defaultStyle}
    />
  ),
  graphql: (
    <Graphql {...defaultProps} data-title="GraphQL" className={defaultStyle} />
  ),
};
