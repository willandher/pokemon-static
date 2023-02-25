import {useEffect, useState} from "react";
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import { Layout } from '../../components/layout/Layout';
import { pokeApi } from "@/api";
import { Pokemon } from "@/interfaces";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import {getPokemonInfo, localFavorites} from "@/utils";
import confetti from "canvas-confetti";


interface Props {
  pokemon: Pokemon;
}
const PokemonPage: NextPage<Props> = ({ pokemon }) => {

  const [isInFavorite, setIsInFavorite] = useState(localFavorites.existPokemonInFavorites(pokemon.id));

  const onToggleFavorite =  () => {

      localFavorites.toggleFavorite(pokemon.id);
      setIsInFavorite(!isInFavorite)
    if( !isInFavorite) {
        confetti({
          zIndex: 999,
          particleCount: 100,
          spread: 150,
          angle: -100,
          origin: {
            x: 0,
            y: 0
          },
        })
    }
  }


  useEffect(() =>{
    console.log("use effect", localStorage.getItem("favorites"));
  }, [])
  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name}
                width="100%"
                height={200}
              ></Card.Image>
            </Card.Body>
          </Card>

        </Grid>
        <Grid xs={12} sm={8} >
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform='capitalize'> {pokemon.name}</Text>
              <Button color='gradient' ghost={! isInFavorite }
                      onPress={onToggleFavorite}>
                {isInFavorite ? 'En Favoritos': 'Guardar en Favoritos'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>
                Sprites:
              </Text>
              <Container direction='row' display='flex'>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                ></Image>
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                ></Image>
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                ></Image>
              </Container>
            </Card.Body>
          </Card>

        </Grid>

      </Grid.Container>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: pokemons151.map(id => ({
      params: { id }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  return {
    props: {
      pokemon: await getPokemonInfo(id)
    }
  }
}

export default PokemonPage;

