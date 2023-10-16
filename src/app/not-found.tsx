import { NextPage } from "next";
import Link from "next/link";

const NotFound: NextPage = () => {
    return <div className="container not-found">
        <h2>NOT FOUND 404</h2>
        <Link href='/'>Return to home</Link>
    </div>
}

export default NotFound;