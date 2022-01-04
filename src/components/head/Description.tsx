import Head from "next/head";

const Description: React.FC<{ description?: string }> = ({ description }) => {
  description =
    description ||
    "Software engineer, coffee hobbyist, manga fan & a gravel bike rider.";
  return (
    <Head>
      <meta property="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
};
export default Description;
