import tw, { styled } from 'twin.macro';
import PropTypes from 'prop-types';
import { GraphQLClient, gql } from 'graphql-request';
import Link from 'next/link';
import { HiOutlineTruck } from 'react-icons/hi';
import Button from '../components/Button';

const NavBar = styled.nav(tw`
  p-4
  flex
  flex-row
`);

const MainWrapper = styled.div(tw`
  flex
  flex-col
  mx-10
  space-y-1.5
  h-screen
`);

const HeroSection = styled.section(tw`
  grid
  grid-cols-6
  items-center
`);

const HeroText = styled.div(tw`
  text-purple-400
  col-span-3
  z-10
  space-y-4
  
`);
const HeroSubText = styled.p(tw`
  text-black
  text-2xl
  font-thin
`);
const HeroIcon = styled(HiOutlineTruck)(tw`
  col-span-3
  w-full
  h-3/4
  text-purple-400
`);

const Index = ({ heroTitle }) => (
  <MainWrapper>
    <NavBar>
      <span>TMS</span>
    </NavBar>
    <HeroSection>
      <HeroText>
        <h1 css={tw`text-7xl leading-tight font-bold`}>
          Dla spedytorów od spedytorów.
        </h1>
        <HeroSubText>{heroTitle}</HeroSubText>
        <div tw='flex flex-row w-full justify-between'>
          <Link href='/dashboard' passhref>
            <Button variant='primary'>Zaloguj się!</Button>
          </Link>
          <Button variant='secondary'>Idź sobie!</Button>
        </div>
      </HeroText>
      <HeroIcon />
    </HeroSection>
  </MainWrapper>
);

Index.PageTitle = 'Main Page';
Index.propTypes = {
  heroTitle: PropTypes.string.isRequired,
};
export default Index;
/**
 *
 *
 * @export
 * @param {import('next').GetStaticPropsContext} context
 * @return {*}
 */
export async function getStaticProps() {
  const cms = new GraphQLClient(process.env.GRAPH_CMS_API);
  const {
    page: { heroText: heroTitle },
  } = await cms.request(gql`
    query {
      page(where: { identifier: "main" }, locales: [pl]) {
        heroText
      }
    }
  `);
  return {
    props: {
      heroTitle,
    },
  };
}
