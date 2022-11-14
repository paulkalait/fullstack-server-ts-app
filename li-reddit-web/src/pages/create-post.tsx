import { Button, Box, Textarea } from '@chakra-ui/react';
import { create } from 'domain';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import router from 'next/router';
import React from 'react'
import InputField from '../components/inputField';
import { TextArea } from '../components/TextArea';
import Wrapper from '../components/Wrapper';
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorsMap } from '../utils/toErrorsMap';



export const CreatePost: React.FC<{}> = ({}) => {
  const [, createPost] = useCreatePostMutation();
        return (
            <Wrapper variant="small">
                <Formik
        initialValues={{ text: "", title: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await createPost({options: values});

          if (response.data?.createPost.errors) {
            //converts the array of objects into an object and then gets displayed
            setErrors(toErrorsMap(response.data.createPost.errors));
          } else if (response.data?.createPost) {
            //worked navigate to landing page with next js useRouter
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box  mt={3}>
              <InputField
                name="title"
                placeholder="Title"
                label="title"
                variant='filled'
              />
              <TextArea
                name="text"
                placeholder="text"
                label="text"
                type="text"
                variant='filled'
                height='100px'
                focusBorderColor='none'
                resize="vertical"
              />
              
            </Box>
            <Button
              mt={3}
              variant="teal"
              isLoading={isSubmitting}
              type="submit"
              bg="#001f54"
              color="white"
            >
              Create
            </Button>
          </Form>
        )}
      </Formik>


            </Wrapper>
        );
}

export default  withUrqlClient(createUrqlClient)(CreatePost);