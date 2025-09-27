
import './Offers.css'

import excusive_image from '../assets/exclusive_image.png'
const Offers = () => {
  return (
    <div className='offer'>
      
      <div className="offer-left">
<h1>Exclusive</h1>
<h1>Offers for You</h1>
<p>ONLY ON BEST SELLER PRODUCT </p>
<button>Check Now</button>
      </div>
    
    <div className="offer-right">
<img src={excusive_image} alt="" />
    </div>
    </div>
  )
}

export default Offers
