import Link from 'next/link';
import logo from "../../../public/logo-smaller-white.svg"
import Image from 'next/image'
import { Box } from '@mui/material';

const Logo = ({ route }) => {
    return (<>
        <Box sx={{ paddingLeft: "0.75rem", paddingRight: "0.75rem" }}>
            <Link href={route}>
                <a>
                    <Image src={logo} width={242.25} height={72.5} priority />
                </a>
            </Link>
        </Box>
    </>
    );
}

export default Logo;