import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {pokeApi} from "@/api";
import {Pokemon, PokemonListResponse} from "@/interfaces";
import {useEffect, useState} from "react";
import {getPokemonInfo, localFavorites} from "@/utils";
import confetti from "canvas-confetti";
import {Layout} from "@/components/layout";
import {Button, Card, Container, Grid, Image, Text} from "@nextui-org/react";

interface Props {
    pokemon: Pokemon;
}
const PokemonPageByName: NextPage<Props> = ({ pokemon }) => {

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

    const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=151`)

    return {
        paths: data.results.map(({name}) => ({
            params: { name }
        })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { name } = params as { name: string };
    return {
        props: {
            pokemon: await getPokemonInfo(name)
        }
    }
}

export default PokemonPageByName;
