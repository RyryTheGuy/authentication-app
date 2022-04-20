import React from "react";
import Head from "next/head";
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar/Navbar';

export default function Home() {
  return (
    <div className={styles[ 'container' ]}>
      <Head>
        <title>Auth App | Home</title>
      </Head>

      <Navbar />
    </div>
  )
};

Home.requireAuth = true;