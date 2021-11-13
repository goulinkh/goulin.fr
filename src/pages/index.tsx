import React, { ReactElement } from 'react';

import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Link from 'next/link';
import GithubSVG from 'public/icons/github.svg';
import StarSVG from 'public/icons/star.svg';
import UrlSVG from 'public/icons/url.svg';
import YoutubeSVG from 'public/icons/youtube.svg';
import initialProjects from 'public/projects.json';
import { Footer } from 'src/components/Footer';
import { Header } from 'src/components/Header';
import { Meta } from 'src/layout/Meta';

const ProjectLink = ({
  children,
  ...props
}:
| {
  children: ReactElement;
}
| React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => (
  <a
    {...props}
    className="transition transform p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400"
  >
    {children}
  </a>
);

const Index = ({ projects }: { projects: any }) => {
  const { t } = useTranslation('home-page');
  const { t: commonT } = useTranslation('common');

  return (
    <>
      <Meta description={commonT('description')} />
      <Header className="flex-none" />
      <div className="glass-bg lg:max-h-screen py-10 h-fit lg:py-0 lg:h-[1000px] flex flex-col justify-start items-center">
        <section className="container main grid grid-rows-1 lg:grid-cols-2 lg:grid-rows-none flex-grow">
          <div className="h-full flex flex-col justify-center space-y-6">
            <h1 className="text-5xl font-bold">{t('profession')}</h1>
            <h2 className="text-3xl text-indigo-500 font-bold">{t('greeting-message')}</h2>
            <p className="text-opacity-80 leading-8">{t('about-me')}</p>
            <Link href="/contact">
              <div className="lg:pt-11 m-0">
                <span className="font-bold text-lg rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 text-gray-100 py-3 px-12 w-fit mx-4 shadow-sm accent-shadow dark:bg-indigo-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-400  dark:focus:ring-offset-gray-800 hover:bg-indigo-600 dark:hover:bg-indigo-700 hover:from-indigo-700 hover:to-indigo-600 cursor-pointer ">
                  {commonT('contact')}
                </span>
              </div>
            </Link>
          </div>
          <div className="hidden lg:block lg:my-40 relative">
            <Image
              src="/images/personal-photo.png"
              alt="Personal photo"
              layout="fill"
              objectFit="contain"
            />
            <div className="absolute top-3/4 right-4 z-10">
              <img
                src="/images/rocket.png"
                className="animate-bounce-slow w-24 h-auto "
                alt="Rocket"
              />
            </div>
            <div className="absolute top-1/4 left-12 z-10">
              <img
                src="/images/lightning.png"
                className="animate-bounce-slow w-20 h-auto  "
                alt="Lightning"
              />
            </div>
            <div className="absolute top-3/4 -left-7">
              <img
                src="/images/finance-card.png"
                className="animate-bounce-slow h-32 w-auto "
                alt="Finance"
              />
            </div>
            <div className="absolute -top-10 right-0">
              <img
                src="/images/shopping-card.png"
                className="animate-bounce-slow w-32 h-auto"
                alt="Shopping"
              />
            </div>
            <div className="absolute -top-1/4 left-4 z-10">
              <img
                src="/images/lamp.png"
                className="animate-bounce-slow w-32 h-auto"
                alt="Lamp"
              />
            </div>
          </div>
        </section>
      </div>
      <h2 className="container text-3xl font-bold mt-10 lg:mt-20 text-center">{t('oss')}</h2>
      <section className="container mx-2 bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg shadow-lg w-[900px] max-w-3xl lg:mx-auto my-10 py-4 px-0">
        {projects.map((project: any) => (
          <div
            key={project.title}
            className="flex flex-col dark:border-gray-600 border-b last:border-b-0 py-3 px-5 space-y-2"
          >
            <div className=" flex lg:flex-row flex-col items-start md:items-center md:mx-auto lg:justify-between lg:mx-0 ">
              <div className="h-full flex flex-col md:flex-row items-start md:items-center md:space-x-5">
                <div className="w-20 h-full flex flex-row items-center justify-center">
                  {project.image && <img src={project.image} alt={project.title} loading="lazy" />}
                  {project.inProgress && (
                    <span className="relative inline-flex rounded-md shadow-sm">
                      <span className="animate-pulse text-center text-sm p-2 bg-opacity-50 bg-indigo-400 text-indigo-700 dark:text-indigo-300 rounded-lg whitespace-nowrap">
                        {commonT('in-progress')}
                      </span>
                    </span>
                  )}
                </div>
                <h2 className="text-base font-bold">
                  {project.title}
                  <span className="font-normal mx-2 opacity-50">/</span>
                  <span className="uppercase font-mono font-normal opacity-60">{project.type}</span>
                </h2>
              </div>
              <div className="flex flex-row items-center">
                {project.starsCount > 0 && (
                  <div className="flex flex-row items-center mx-2 space-x-1">
                    <span className="font-mono text-sm">{project.starsCount}</span>
                    <StarSVG className="w-4" />
                  </div>
                )}
                {project.github && (
                  <ProjectLink href={project.github} title="Github">
                    <GithubSVG className="w-5 cursor-pointer" />
                  </ProjectLink>
                )}
                {project.url.demo && (
                  <ProjectLink href={project.url.demo} title="Demo site">
                    <UrlSVG className="w-5 cursor-pointer" />
                  </ProjectLink>
                )}
                {project.url.youtube && (
                  <ProjectLink href={project.url.youtube} title="Youtube site">
                    <YoutubeSVG className="w-5 cursor-pointer" />
                  </ProjectLink>
                )}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-normal text-base">
              {commonT(project.name)}
            </p>
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
};

export default Index;
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const ps = initialProjects as any;
  // ps = await Promise.all(
  //   ps.map(async (project: any) => {
  //     if (!project.url.github) return { ...project, starsCount: -1 };
  //     const repo = await (await fetch(`https://api.github.com/repos/${project.url.github}`)).json();
  //     return { ...project, starsCount: repo.stargazers_count || -1, github: repo.html_url };
  //   }),
  // );
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['home-page', 'common'])),
      projects: ps.sort((a: any, b: any) => b.starsCount - a.starsCount),
    },
    revalidate: 24 * 3600, // 24 hours
  };
};
