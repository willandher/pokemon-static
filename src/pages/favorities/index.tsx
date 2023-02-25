import {useEffect, useState} from "react";
import {Layout} from "@/components/layout";
import {NoFavorities} from "@/components/ui";
import {localFavorites} from "@/utils";
import {Card, Grid} from "@nextui-org/react";
import {FavoritiesPokemon} from "@/components/pokemon/FavoritiesPokemon";


const FavoritePage = () => {

    const [favoritiesPokemon, setFavoritiesPokemons] = useState<number[]>([]);
    useEffect(() => {
      setFavoritiesPokemons ( localFavorites.pokemons )
    }, [])


  return (
      <Layout title={'Pokemon - Favoritos'}>
          {
              favoritiesPokemon.length === 0 ? (<NoFavorities/>) :
                  (
                      <FavoritiesPokemon favoritiesPokemon={favoritiesPokemon}/>
                  )

          }

      </Layout>
  )
}
export default FavoritePage
