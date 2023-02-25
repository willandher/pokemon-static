import {Card, Grid} from "@nextui-org/react";
import {FC} from "react";
import {FavoriteCardPokemon} from "./";


interface Props {
    favoritiesPokemon: number[]
}
export const FavoritiesPokemon: FC<Props> = ({favoritiesPokemon}) => {
 return (
     <Grid.Container gap = {2} direction = 'row' justify = 'flex-start'>
         {
             favoritiesPokemon.map(id => (
                     <FavoriteCardPokemon key={id} id={id}/>
             ))
         }
     </Grid.Container>
 );
};

