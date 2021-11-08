import { PageProps } from 'gatsby';
import * as React from 'react';
import {
  Configure,
  connectHits,
  connectRefinementList,
  connectSearchBox,
  connectStateResults,
  InstantSearch,
  PoweredBy,
} from 'react-instantsearch-dom';
import Layout from '../components/layout';
import CopyURLs from '../components/ProblemsPage/CopyURLs';
import Difficulty from '../components/ProblemsPage/Difficulty';
import ExcludeURLs from '../components/ProblemsPage/ExcludeURLs';
import Modules from '../components/ProblemsPage/Module';
import ProblemHits from '../components/ProblemsPage/ProblemHits';
import RefinementList from '../components/ProblemsPage/RefinementList';
import SearchBox from '../components/ProblemsPage/SearchBox';
import Section from '../components/ProblemsPage/Section';
import Starred from '../components/ProblemsPage/Starred';
import Status from '../components/ProblemsPage/Status';
import SEO from '../components/seo';
import TopNavigationBar from '../components/TopNavigationBar/TopNavigationBar';
import { searchClient } from '../utils/algoliaSearchClient';

const indexName =
  process.env.NODE_ENV === 'production' ? 'prod_problems' : 'dev_problems';

const CustomModuleSelection = connectRefinementList(Modules);
const CustomDifficultySelection = connectRefinementList(Difficulty);
const CustomStarredSelection = connectRefinementList(Starred);
const CustomSectionSelection = connectRefinementList(Section);
const CustomStatusSelection = connectRefinementList(Status);
const CustomExcludeURLs = connectRefinementList(ExcludeURLs);
const CustomSearchBox = connectSearchBox(SearchBox);
const CustomHits = connectHits(ProblemHits);
const CustomRefinementList = connectRefinementList(RefinementList);
const CustomCopyURLs = connectStateResults(CopyURLs);

export default function ProblemsPage(props: PageProps) {
  return (
    <Layout>
      <SEO title="All Problems" />

      <div className="min-h-screen bg-gray-100 dark:bg-dark-surface">
        <TopNavigationBar />

        <InstantSearch searchClient={searchClient} indexName={indexName}>
          <Configure hitsPerPage={100} />
          <div className="py-16 bg-blue-600 dark:bg-blue-900 px-5">
            <div className="max-w-3xl mx-auto mb-6">
              <h1 className="text-center text-3xl sm:text-5xl font-bold text-white dark:text-dark-high-emphasis mb-6">
                Problems (Beta)
              </h1>
              <CustomSearchBox />
            </div>
          </div>
          <div className="flex mt-4 mb-1 mx-9 justify-center">
            <PoweredBy />
          </div>
          <div className="pt-3 px-9 pb-4 grid grid-cols-10">
            <div className="sm:col-span-4 md:col-span-3 lg:col-span-2 xl:col-span-2 col-span-5 overflow-y-auto">
              <CustomRefinementList attribute="tags" limit={500} searchable />
            </div>
            <div className="py-0.5 px-1 sm:col-span-6 md:col-span-7 lg:col-span-8 xl:col-span-8 col-span-5 overflow-y-auto">
              <div className="flex mb-4 items-center grid grid-cols-2 lg:grid-cols-6 md:gird-cols-3 sm:gird-cols-3 gap-x-5 gap-y-3">
                <div className="col-span-2">
                  <CustomDifficultySelection
                    attribute="difficulty"
                    limit={500}
                    searchable
                  />
                </div>
                <div className="col-span-2 md:col-span-3 lg:col-span-4 tw-forms-disable-all-descendants">
                  <CustomModuleSelection
                    attribute="problemModules.title"
                    limit={500}
                    searchable
                  />
                </div>
                <div className="col-span-2 md:col-span-1 lg:col-span-2">
                  <CustomStarredSelection
                    attribute="isStarred"
                    limit={500}
                    searchable
                  />
                </div>
                <div className="col-span-2">
                  <CustomSectionSelection
                    attribute="problemModules.id"
                    limit={500}
                    searchable
                  />
                </div>
                <div className="col-span-2 md:col-span-2">
                  <CustomStatusSelection
                    attribute="objectID"
                    limit={500}
                    searchable
                  />
                </div>
                <div className="flex space-x-4 items-center col-span-2">
                  <CustomExcludeURLs
                    attribute="url"
                    operator="and"
                    limit={500}
                  />
                  <CustomCopyURLs />
                </div>
              </div>
              <CustomHits />
            </div>
          </div>
        </InstantSearch>
      </div>
    </Layout>
  );
}
