import Link from "next/link";
import { Suspense } from "react";

const products = [{ name: "bag",query:"bag" }, { name: "shoes",query:"shoes" }, { name: "socks",query:"socks" }];

export default function Home() {
  return (
    <div>

      <ul>
        
        
        <li>
        <Link href="/three">
            Three
          </Link>
        </li>
      </ul>
      <h1>Hello Next.js</h1>
        
    </div>
  );
}