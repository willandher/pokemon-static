import { Button, Card, Grid, Row, Text } from '@nextui-org/react';
import {NextPage, GetStaticProps} from 'next'; 
import { Layout } from '../components/layout';
import {pokeApi} from '../api';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { PokemonCard } from '@/components/pokemon';

interface Props {
  pokemons: SmallPokemon[];
}

export const HomePage: NextPage<Props> = ({pokemons}) => {
  return (
        <Layout title= 'Listado de Pokemons' >
        
            <Grid.Container gap= {2} justify= 'flex-start'>
              {
                pokemons.map(podemon =>(
                  <PokemonCard key = { podemon.id} pokemon= {podemon}></PokemonCard>
                ))
              }
            </Grid.Container>
        </Layout>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
//- Se ejecutan desde el lado del servidor en el build time
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  const pokemons: SmallPokemon[] = data.results.map((result, i) =>{
    return {
      ...result,
      id: i+1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
    }
  })

  return {
    props: {
      name: 'Willandher',
      pokemons
    }
  }
}

export default HomePage;