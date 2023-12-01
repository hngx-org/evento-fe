import { toast } from 'react-toastify';
import AuthInstance from './AuthInstance';
import { UserProfile2, getAuthToken, getUserId } from './profileapi';

export interface UserProfile {
  email?: string;
  bio?: string;
  firstName?: string;
  lastName?: string;
}

export interface UserSocials {
  websiteURL?: string;
  twitterURL?: string;
  facebookURL?: string;
  instagramURL?: string;
}

export interface socialsData {
  facebookURL?: string;
  instagramURL?: string;
  linkID?: string;
  twitterURL?: string;
  userID?: string;
  websiteURL?: string;
}

const BaseUrl = 'https://evento-qo6d.onrender.com/api/v1';

//evento-qo6d.onrender.com/api/v1
const $AuthHttp = AuthInstance(BaseUrl);

export const getUserProfile = async (setData: React.Dispatch<React.SetStateAction<UserProfile>>) => {
  const authToken = getAuthToken();
  const userId = getUserId();

  try {
    const getUserData = await $AuthHttp.get(`/user/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const userData: UserProfile = getUserData?.data?.data;
    setData((prev) => ({
      ...prev,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
      bio: userData?.bio,
    }));
  } catch (e: any) {
    toast.error('An error occurred while fetching user info');

    throw e?.response?.data || { message: e.message };
  }
};

export const getUserSocials = async (setSocialsData: React.Dispatch<React.SetStateAction<UserSocials>>) => {
  const authToken = getAuthToken();
  const userId = getUserId();

  try {
    const getUserData = await $AuthHttp.get(`/user/profile/social/${userId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const userData: socialsData = getUserData?.data?.data[0];
    // console.log(userData);
    setSocialsData((prev) => ({
      ...prev,
      websiteURL: userData?.websiteURL ? userData?.websiteURL : '',
      twitterURL: userData?.twitterURL ? userData?.twitterURL : '',
      instagramURL: userData?.instagramURL ? userData?.instagramURL : '',
      facebookURL: userData?.facebookURL ? userData?.facebookURL : '',
    }));
  } catch (e: any) {
    toast.error('An error occurred while fetching user socials.');
    throw e?.response?.data || { message: e.message };
  }
};

export const editUserAccount = async (
  data: UserProfile2,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const authToken = getAuthToken();
  const userId = getUserId();
  setLoading(true);
  try {
    const editUserData = await $AuthHttp.patch(`/user/profile/edit/${userId}`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    setLoading(false);
    if (editUserData.status === 200) {
      toast.success('profile updated');
    }
  } catch (err: any) {
    setLoading(false);
    toast.error(err.message);
  }
};

export const editUserSocials = async (data: UserSocials, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  const authToken = getAuthToken();
  const userId = getUserId();
  setLoading(true);
  try {
    const editUserData = await $AuthHttp.post(`/user/profile/social/add/${userId}`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    //   console.log(editUserData);
    setLoading(false);
    if (editUserData.status === 200) {
      toast.success('profile updated');
    }
  } catch (err: any) {
    console.log(err);
    setLoading(false);
    toast.error(err.message);
  }
};

export const uploadUserImage = async (data: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  const authToken = getAuthToken();
  const userId = getUserId();
  setLoading(true);
  //   console.log(data);
  let image = new FormData();
  image.append('file', data);

  const config = {
    method: 'post',
    url: `/user/profile/image/upload/${userId}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
    data: image,
  };
  try {
    const editUserData = await $AuthHttp(config);

    // console.log(editUserData);
    setLoading(false);
    if (editUserData.status === 200) {
      toast.success('profile updated');
    }
  } catch (err: any) {
    console.log(err);
    setLoading(false);
    toast.error(err.message);
  }
};

// import axios, { AxiosError } from 'axios';
// export const uploadUserImage = async (data: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
//   const authToken = getAuthToken();
//   const userId = getUserId();
//   setLoading(true);

//   try {
//     let image = new FormData();
//     image.append('file', data);

//     const response = await axios.post(
//       `https://evento-qo6d.onrender.com/api/v1/user/profile/image/upload/${userId}`,
//       image,
//       {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//           'Access-Control-Allow-Origin': '*',
//           'Content-Type': 'multipart/form-data',
//           Accept: 'application/json',
//         },
//       },
//     );

//     // Handle success, if needed
//     console.log('Image uploaded successfully:', response.data);
//     toast.success('Image uploaded successfully');
//   } catch (error: any) {
//     // Use type assertion to specify the type of 'error'
//     const axiosError = error as AxiosError;

//     if (axiosError.response) {
//       // The request was made and the server responded with a status code
//       console.error('Upload failed with status code:', axiosError.response.status);
//       toast.error(`Upload failed with status code: ${axiosError.response.status}`);
//     } else if (axiosError.request) {
//       // The request was made but no response was received
//       console.error('No response received from the server');
//       toast.error('No response received from the server');
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.error('Error setting up the request:', axiosError.message);
//       toast.error(`Error setting up the request: ${axiosError.message}`);
//     }

//     // Handle other errors if necessary
//   } finally {
//     setLoading(false);
//   }
// };
