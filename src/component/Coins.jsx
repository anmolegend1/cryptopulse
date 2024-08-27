import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {server} from '../main'
import { Button, Container, Heading, HStack, Image, Radio, RadioGroup, Text, VStack } from '@chakra-ui/react'
import Loader from './Loader'
import Errorcomponent from './Errorcomponent'
import CoinCard from './CoinCard'
import { color } from 'framer-motion'

const Coins = () => {

  const [coins,setcoins]=useState([])
  
  const [loading,setloading]=useState(true)

  const [error, seterror] = useState(false)

  const [page,setpage]=useState([])

  const [currency,setcurrency]=useState("inr")


  const changePage = (page)=>{
    setpage(2)
    setloading(true)
  }



  const currencySymbol= currency === "inr"?"₹":currency === "eur"?"€":"$"

 
 useEffect(()=>{

  const fetchcoins = async()=>{
  try {
    const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
  setcoins(data)
  setloading(false)
    
  } catch (error) {

    seterror(true)

    setloading(false)
    
  }
   }
   fetchcoins();
 },[currency,page])


 if(error) return <Errorcomponent message={"Error While fetching coins"}/>
 
  return (
   <Container maxW={'container.xl'}>
  
      {loading?(<Loader/> ):(<>


            <RadioGroup value={currency} onChange={setcurrency}>
              <HStack spacing={4} p={8}>
                <Radio value={"inr"}>INR</Radio>
                <Radio value={"usd"}>USD</Radio>
                <Radio value={"eur"}>EUR</Radio>
              </HStack>
            </RadioGroup>


            <HStack
            wrap={"wrap"} justifyContent={'space-evenly'}>{coins.map((i)=>(<CoinCard
              id={i.id} 
              name={i.name} 
              img={i.image} 
              price={i.current_price} 
              symbol={i.symbol}
              currencySymbol={currencySymbol}
   
            
              
            />))}</HStack>

            <HStack>
              <Button bgColor={"blackAlpha.900"} color={"white"} onClick={()=>changePage(2)}>2</Button>
            </HStack>

          

      </>)}
   </Container>
  )
}
  



export default Coins


