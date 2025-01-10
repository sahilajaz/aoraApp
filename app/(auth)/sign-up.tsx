import { View, Text, ScrollView, Image, TextInputChangeEventData, Alert } from 'react-native'
import React, { useState } from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {images} from '../../constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '@/lib/appwrite'


const signUp = () => {
   const [isSubmitting , setIsSubmitting] = useState(false)
   const [form , setForm] = useState({
    username: '',
    email : '',
    password: ''
   })

   const submit = async () => {
        if(!form.username || !form.email || !form.password) {
          Alert.alert('Error' , 'Please fill in all the field')
        }
      setIsSubmitting(true)
      try {
          const result = await createUser(
            form.email,
            form.password,
            form.username
          )
          router.replace('/home')
      } catch (error : any) {
        Alert.alert('error' , error.message)
      } finally {
        setIsSubmitting(false)
      }
   }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full mt-20 justify-center min-h-[75vh] px-4 my-6">
          <Image 
            source={images.logo}
            resizeMode='contain'
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl  text-semibold mt-10 font-psemibold" style={{color: 'white'}}>Sign up in to Aora</Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText ={(e) => setForm({...form , username: e})}
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText ={(e) => setForm({...form , email: e})}
            otherStyles="mt-7"
            keyBoardType= "email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
                    title='Sign Up'
                    handlePress={submit}
                    containerStyles='mt-7'
                    isLoading={isSubmitting}
                  />
           <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-sm text-gray-100 font-pregular'>
               Have an account already?
            </Text>
            <Link href="/sign-in" className='text-sm font-psemibold text-secondary'>Sign In</Link>
          </View>       
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default signUp