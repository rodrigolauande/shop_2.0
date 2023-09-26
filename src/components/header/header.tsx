import { HeaderContainer } from "./styles"
import Logo from "../../assets/Logo.svg"
import Image from "next/image"
import Link from "next/link"
import Cart from "../cart/cart"
import { useRouter } from "next/router"


export default function Header() {

    const { pathname } = useRouter();

  const showCartButton = pathname !== "/success";
  
    return(
        <HeaderContainer>
            <Link href={'/'}>
            <Image src={Logo} alt="" />
            </Link>
            {showCartButton && <Cart />}
        </HeaderContainer>
    )
}