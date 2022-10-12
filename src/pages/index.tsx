import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../common/components/layout/Layout';
import AccountSection from '../common/components/layout/AccountSection';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Salesforce NextAuth Demo</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <AccountSection />
            </Layout>
        </>
    );
};

export default Home;
