import Head from 'next/head'
import { CatalogPageStyles as styles } from 'styles/pages'

export default function Home() {
  return (
    <>
      <Head>
        <title>LOYLEN Catalog</title>
        <meta name='description' content='clothes catalog LOYLEN' />
      </Head>
      <div className={`${styles.catalogPage} container`}>
        <h3 className={styles.pageHeader}>Каталог</h3>
      </div>
    </>
  )
}
