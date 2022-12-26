import Head from 'next/head'
import Link from 'next/link'
import { Button } from 'components/ui'
import { NotFoundPageStyles as styles } from 'styles/pages'

export default function Home() {
  return (
    <>
      <Head>
        <title>LOYLEN 404</title>
        <meta name='description' content='404 page LOYLEN' />
        
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
