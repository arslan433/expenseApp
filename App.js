import { View, Text, Image, TouchableOpacity, Modal, TextInput, ScrollView, ScrollViewBase } from 'react-native'
import React, { useEffect, useState } from 'react'
import url from './api/apiKey'
export default function App() {

  let [data, setdata] = useState([])
  let [post, setPost] = useState(false)
  let [name, setName] = useState(undefined)
  let [price, setPrice] = useState(undefined)
  let [income, setIncome] = useState(undefined)
  let [update, setUpdate] = useState(false)
  let [selected, setselected] = useState(undefined)

  let [incomeModel, setIncomeModel] = useState(false)
  const getApiData = async () => {
    try {
      let result = await fetch(url)
      result = await result.json()
      // console.warn(result)
      setdata(result)
      // console.log(data)

    } catch (error) {
      console.error("There is an error in fetching api")
    }
  }
  //add total expense
  const totalPrice = data.reduce((total, product) => total + product.price, 0);
  // console.log('Total Price:', totalPrice);
  const totalIncome = data.reduce((total, product) => total + product.income, 0);
  // console.log('Total Income:', totalIncome);


  //Add new product
  const postApi = async () => {
    try {

      let result = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price })
      })
      result = await result.json()
      getApiData()
      // console.warn(result)
    } catch (error) {
      console.error("There is an error in Posting api")
    }
  }
  const AddIncome = async () => {
    try {

      let result = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ income })
      })
      result = await result.json()
      getApiData()
      // console.warn(result)
    } catch (error) {
      console.error("There is an error in Adding income in api")
    }
  }

  const deleteApi = async (_id) => {
    try {
      let result = await fetch(`${url}/${_id}`, {
        method: "delete"
      })
      result = await result.json()
      if (result) {
        console.log("Product deleted")
        getApiData()
      }
    } catch (error) {
      console.log("Error in Deleting Product")
    }
  }

  const showUpdateModal = (data) => {
    setUpdate(true)
    setselected(data)
  }
   
   const addincomeAndClose = () => {
     AddIncome()
    setIncomeModel(false)
    setIncome(undefined)
   }

    const updateproductandClose = () => {
      updateApi();
      setUpdate(false);
      setName(undefined);
      setPrice(undefined);

    }

    const addproductandClose = () =>{
      postApi()
      setPost(false)
      setName(undefined)
      setPrice(undefined)
    }
  const updateApi = async (_id) => {
    try {
      let _id = selected._id
      let result = await fetch(`${url}/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, price })
      })
      result = await result.json()
      if (result) {
        console.log("Product updated")
        getApiData()
      }
    } catch (error) {
      console.log("Error in Updating Product")
    }
  }

  useEffect(() => {
    getApiData()
  }, [])



  return (
    <View className='flex-1 relative'>
      <ScrollView className='bg-gray-400'>
        {/* <Image blurRadius={70} source={require('./images/bg.png')}
          className='absolute w-full h-full '
        /> */}

        <View className=' flex flex-row justify-between space-around bg-blue-300 m-2 rounded-full'>
          <Text className='p-3 text-black text-lg font-bold '>Products</Text>
          <Text className='p-3 text-black text-lg font-bold'>Price</Text>
          <Text className='p-3 text-black text-lg font-bold '>Operation</Text>

        </View>
        <View className=' flex-row justify-between  bg-gray-400 flex m-2'>
          <TouchableOpacity onPress={()=>setIncomeModel(true)}>
            <Text className='text-lg text-black p-2 rounded text-center'>Income </Text>
            <Text className='text-lg text-blue-900  rounded text-center font-bold'>{totalIncome} </Text>

          </TouchableOpacity>

          <View>
            <Text className='text-lg text-black  p-2 rounded text-center'>Expense
            </Text>
            <Text className='text-red-900 text-lg  rounded text-center font-bold'>{totalPrice}</Text>

          </View>
          <TouchableOpacity className='  ' onPress={() => setPost(!post)}>
            <View>
              <Text className='text-lg text-black p-2 rounded text-center'>Add </Text>
              <Text className='text-lg text-black pb-2 rounded text-center'>Product </Text>

            </View>
          </TouchableOpacity>
        </View>
        {/* add new product modal  */}
        {
          post ?
            <View className=' flex-1 justify-center items-center'>
              <Modal transparent >
                <View className='flex-1  justify-center items-center'>
                  <View className='bg-lime-600 rounded-xl p-6 shadow-black	shadow-2xl	'>
                    <TextInput placeholder='Enter Product name' className='border-lime-800 	border-2	pl-6 pr-6 rounded-lg	text-lg text-black-500 m-3' placeholderTextColor={"black"} value={name} onChangeText={(text) => setName(text)} />
                    <TextInput placeholder='Enter Product Price' className='m-3 border-lime-800 	border-2	pl-6 pr-6  rounded-lg	text-lg text-black-500' placeholderTextColor={"black"} value={price} onChangeText={(text) => setPrice(text)} />
                    <View className='flex-row justify-between m-4'>

                      <TouchableOpacity onPress={() => setPost(false)} className=''>
                        <Text className='text-black text-xl border-lime-800 	border-2 pl-4 pr-4 pt-3 pb-3 rounded-lg'>Close</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={addproductandClose}>
                        <Text className='text-black text-xl border-lime-800 border-2 pl-4 pr-4 pt-3 pb-3 rounded-lg'>Save</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>

            </View>
            : null
        }
        {/* add income modal  */}
        {
          incomeModel ?
            <View className=' flex-1 justify-center items-center'>
              <Modal transparent >
                <View className='flex-1  justify-center items-center'>
                  <View className='bg-lime-600 rounded-xl p-6 shadow-black	shadow-2xl	'>
                    <TextInput placeholder='Enter Income' className='border-lime-800 	border-2	pl-6 pr-6 rounded-lg	text-lg text-black-500 m-3' placeholderTextColor={"black"} value={income} onChangeText={(text) => setIncome(text)} />
                    
                    <View className='flex-row justify-between m-4'>

                      <TouchableOpacity onPress={() => setIncomeModel(false)} className='m-2'>
                        <Text className='text-black text-xl border-lime-800 	border-2 pl-4 pr-4 pt-3 pb-3 rounded-lg'>Close</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={addincomeAndClose} className='m-2'>
                        <Text className='text-black text-xl border-lime-800 border-2 pl-4 pr-4 pt-3 pb-3 rounded-lg'>Save</Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                </View>
              </Modal>

            </View>
            : null
        }
        {
          data.map((item, index) => <View
            key={index}
            className=' flex flex-row m-2 bg-green-400 rounded-full'
          >

            <View className='flex-1 mt-1 mb-1 '>
              <Text className='ml-4 text-xl'>{item.name}</Text>

            </View>
            <View className='flex-1  mt-1 mb-1'>
              <Text className='ml-12 text-xl'>{item.price}</Text>

            </View>
            <View className='flex-row  mt-1 mb-1'>
              <TouchableOpacity className='' onPress={() => deleteApi(item._id)}>
                <Text className='text-xl'>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>showUpdateModal(item)} className=''>
                <Text className='mr-4 ml-4 text-xl'>Update</Text>
              </TouchableOpacity>
            </View>

          </View>




          )
        }
                   {/* update modal */}
        {
          update ?
            <View className=' flex-1 justify-center items-center'>
              <Modal transparent >
                <View className='flex-1  justify-center items-center'>
                  <View className='bg-lime-600 rounded-xl p-6 shadow-black	shadow-2xl	'>
                    <TextInput placeholder='Enter Product name' className='border-lime-800 	border-2	pl-6 pr-6 rounded-lg	text-lg text-black-500 m-3' placeholderTextColor={"black"} value={name} onChangeText={(text) => setName(text)} />
                    <TextInput placeholder='Enter Product Price' className='m-3 border-lime-800 	border-2	pl-6 pr-6  rounded-lg	text-lg text-black-500' placeholderTextColor={"black"} value={price} onChangeText={(text) => setPrice(text)} />
                    <View className='flex-row justify-between m-4'>

                      <TouchableOpacity onPress={() => setUpdate(false)} className=''>
                        <Text className='text-black text-xl border-lime-800 	border-2 pl-4 pr-4 pt-3 pb-3 rounded-lg'>Close</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={updateproductandClose} >
                        <Text className='text-black text-xl border-lime-800 border-2 pl-4 pr-4 pt-3 pb-3 rounded-lg'>Save</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            : null
        }
      </ScrollView>
    </View>
  )
}