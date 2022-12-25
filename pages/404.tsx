import Head from 'next/head'
import { Button } from 'components/ui'
import Link from 'next/link'
import { NotFoundPage as styles } from 'styles/pages'

export default function Home() {
  return (
    <>
      <Head>
        <title>LOYLEN Catalog</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={`${styles.notFound} container`}>
        <h4>ошибка 404</h4>
        <p>Кажется, что-то пошло не так</p>
        <p>Эта страница не существует или переехала на другой адрес</p>
        <Link href={'/'}>
          <Button>на главную</Button>
        </Link>
      </div>
    </>
  )
}