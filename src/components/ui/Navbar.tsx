import NextLink from "next/link"
import { Link, Spacer, Text, useTheme } from "@nextui-org/react"
import Image from "next/image"

export const Navbar = () => {
  const { theme } = useTheme()

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'start',
      padding: '0x 20px',
      backgroundColor: theme?.colors.gray400.value
    }}>
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
        alt="Icono de la app"
        width={70}
        height={70}
      />
      <Link href='/' as={NextLink}>
        <Text h2 css={{ m: '0' }}>
          P
        </Text>
        <Text h3 css={{ m: '0' }}>
          okémon
        </Text>
      </Link>
      <Spacer css={{ flex: 1 }} />
      <Link href="/favorities" as={NextLink}>
        <Text color="white">Favoritos</Text>
      </Link>


    </div>
  )
}