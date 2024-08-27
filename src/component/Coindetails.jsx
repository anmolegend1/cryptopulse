import { Badge, Box, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatDownArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import React, {useState} from 'react'
import Loader from './Loader'
import axios from 'axios'
import {server} from '../main'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Errorcomponent from './Errorcomponent'
import Chart from './Chart'
import { Button } from '@chakra-ui/react'


const Coindetails = () => {

  
  const param = useParams()

  const [coins,setcoins]=useState([])
  
  const [loading,setloading]=useState(true)

  const [error, seterror] = useState(false)

  const [currency,setcurrency]=useState("inr")

  const [days,setDays]=useState("24h")

  const [chartarray,setchartarray]=useState([])

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];
  
  const currencySymbol= currency === "inr"?"₹":currency === "eur"?"€":"$"

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setloading(true);
        break;
      case "7d":
        setDays("7d");
        setloading(true);
        break;
      case "14d":
        setDays("14d");
        setloading(true);
        break;
      case "30d":
        setDays("30d");
        setloading(true);
        break;
      case "60d":
        setDays("60d");
        setloading(true);
        break;
      case "200d":
        setDays("200d");
        setloading(true);
        break;
      case "1y":
        setDays("365d");
        setloading(true);
        break;
      case "max":
        setDays("max");
        setloading(true);
        break;

      default:
        setDays("24h");
        setloading(true);
        break;
    }
  };




  

  useEffect(()=>{

const fetchcoins = async()=>{
try {
const {data} = await axios.get(`${server}/coins/${param.id}`)
const { data: chartData } = await axios.get(
  `${server}/coins/${param.id}/market_chart?vs_currency=${currency}&days=${days}`
);


setcoins(data)
setchartarray(chartData.prices)
setloading(false)
  
} catch (error) {

  seterror(true)

  setloading(false)
  
}
 }
 fetchcoins();
},[param.id,currency,days])


if(error) return <Errorcomponent message={"Error While fetching coins"}/>


return (

 
<Container maxW={"container.xl"}>
{
      loading?<Loader/>:(
        <>
          <Box w={"full"} borderWidth={"1"}>
          <Chart arr={chartarray} currency={currency} days={days} />
          </Box>


          <HStack p="4" overflowX={"auto"}>
            {btns.map((i) => (
              <Button
                disabled={days === i}
                key={i}
                onClick={() => switchChartStats(i)}
              >
                {i}
              </Button>
            ))}
          </HStack>

        <RadioGroup value={currency} onChange={setcurrency} p={8}>
              <HStack spacing={4} >
                <Radio value={"inr"}>INR</Radio>
                <Radio value={"usd"}>USD</Radio>
                <Radio value={"eur"}>EUR</Radio>
              </HStack>
            </RadioGroup>

        <VStack spacing={"4"} p={"18"}  alignItems={"flex-start"}>
          <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"} >
             Last Updated on {Date(coins.market_data.last_updated).split("G")[0]}
          </Text>
          <Image src={coins.image.large} w={"16"} h={"16"} objectFit={"contain"} />

            <Stat>

                <StatLabel>

                  {coins.name}

                </StatLabel>

                <StatNumber>
                  {currencySymbol}
                  {coins.market_data.current_price[currency]}
                </StatNumber>
                <StatHelpText>
                  <StatDownArrow type={coins.market_data.price_change_percentage_24h_in_currency[currency] >0? "increase":"decrease"} />
                  {coins.market_data.price_change_percentage_24h_in_currency[currency]}%
                </StatHelpText>

            </Stat>

            <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"} color={"white"}>
              #{coins.market_cap_rank}
            </Badge>
            <CustomBar high={`${coins.market_data.high_24h[currency]}`} low= {`${coins.market_data.low_24h[currency]}`} />
            <Box  w={"full"} p={"4"} >
              <Item title={"Max Supply"} value={coins.market_data.max_supply} />
              <Item title={"Circulating Supply"} value={coins.market_data.circulating_supply} />
              <Item title={"Market Capital"} value={`${coins.market_data.market_cap[currency]}`} />
              <Item title={"All Time High"} value={ `${currencySymbol}${coins.market_data.ath[currency]}`} />
              <Item title={"All Time Low"} value={`${currencySymbol}${coins.market_data.atl[currency]}`} />


            </Box>

        </VStack>
 


        </>
      )
    }

    </Container>
  )
}

const CustomBar = ({high,low})=>
(
  <VStack w={"full"} >
    <Progress value={"50"} colorScheme='teal' w={"full"} />
    <HStack justifyContent={'space-between'} w={"full"} >
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={low} colorScheme={"green"} />

    </HStack>
  </VStack>
)

const Item=({title,value})=>(
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
    <Text>{value}</Text>

  </HStack>
)


export default Coindetails