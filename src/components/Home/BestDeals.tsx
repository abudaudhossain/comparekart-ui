
export const dynamic = 'force-dynamic';
import BestDealsProducts from './BestDealsProducts';
import Link from 'next/link';
import NotFound from '@/app/not-found';



const BestDeals = async () => {
  const products = await fetch(`${process.env.BACKEND_URL}/public/products?limit=10&sort=discount`,{
    cache: 'no-store',
  })
    .then((res) => res.json()).then((data) => data.data).catch((err) => {
      //console.log(err)
      throw NotFound()
    })

  if (!products || products.length === 0) {
    return;
  }


  return (
    <div className='bg-[#D7E3EF] py-6  px-6'>
      <div className='container  '>
        <BestDealsProducts title={"Our Best Deals"} data={products} />

      </div>
      <div className='mt-6 flex  justify-center'>
        <Link href={"/products"} className='bg-[#0257b2cc]  text-white shadow-theme-xs hover:bg-[#0257b2] inline-flex px-8 py-4 rounded-sm transition '>
          More Top Deals
        </Link>
      </div>
    </div>
  )
}

export default BestDeals