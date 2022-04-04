import Link from '@/components/Link'
import Image from 'next/image'
import { useTheme } from 'next-themes'

const crying_faces = ['(ಥ_ʖಥ)', '(TдT)', '(ಥ﹏ಥ)']
const rnd = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function FourZeroFour() {
  const { theme } = useTheme()
  return (
    <div className="flex flex-col items-center justify-center md:mt-24 md:flex-col md:items-center md:justify-center ">
      <Image
        src={`/static/images/404-${theme}.gif`}
        alt="404"
        width="250px"
        height="250px"
        priority={true}
      />
      <h5 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:px-6 md:text-2xl md:leading-14">
        404
      </h5>
      <div className="space-x-2 pt-2 pb-8 md:space-y-5">
        <h6 className="text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:px-6 md:text-xl md:leading-14">
          我是誰，我在哪 {rnd(crying_faces)}
        </h6>
      </div>
      <Link href="/">
        <button className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500">
          回首頁
        </button>
      </Link>
    </div>
  )
}
