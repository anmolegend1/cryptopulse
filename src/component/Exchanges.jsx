import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {server} from '../main'
import { Container, Heading, HStack, Image, Text, VStack} from '@chakra-ui/react'
import Loader from './Loader'
import Errorcomponent from './Errorcomponent'

const Exchanges = () => {

  const [exchanges,setexchanges]=useState([])
  
  const [loading,setloading]=useState(true)

  const [error, seterror] = useState(false)

 
 useEffect(()=>{

  const fetchexchanges = async()=>{
  try {
    const {data} = await axios.get(`${server}/exchanges`)
  setexchanges(data)
  setloading(false)
    
  } catch (error) {

    seterror(true)

    setloading(false)
    
  }
   }
   fetchexchanges();
 },[])


 if(error) return <Errorcomponent message={"Error While fetching exchanges"}/>
 
  return (
   <Container maxW={'container.xl'}>
  
      {loading?(<Loader/> ):(<>

            <HStack
            wrap={"wrap"}>{exchanges.map((i)=>(<Exchangecard name={i.name} 
              img={i.image} rank={i.trust_score_rank} url={i.url}
            />))}</HStack>

          

      </>)}
   </Container>
  )
}



const Exchangecard = ({name,img,rank,url})=>
  
    (<a href={url} target={'blank'} >
    <VStack w={52} shadow={"lg"} p={8} borderRadius={"lg"} transition={"all 0.3s"}
    m={4}
    css={{"&:hover":{transform:"scale(1.1)"}}}
    >
      <Image src={img} w={'10'} h={'10'} objectFit={'contain'} alt='Exchange'/>
        <Heading size={'md'} noOfLines={1}>
        {rank}
  
        </Heading>
        <Text noOfLines={1}>
          {name}
        </Text>
    </VStack>
  
    </a>)
  



export default Exchanges


