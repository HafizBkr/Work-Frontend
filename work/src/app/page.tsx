"use client";

import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Welcome to My Website</h1>
      <p>This is the homepage.</p>
      <Link href="/about">About</Link>
    </>
  );
}
