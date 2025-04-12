
  
  import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IPostApiResponse } from '@/types/post'
import useAxiosAuth from '../useAuth';
  
  
  export const useUpdateCoverImage = () => {
  
    const queryClient = useQueryClient()
    const axiosInstance = useAxiosAuth();
    return useMutation({
      mutationKey: ['changeCoverImage'],
      mutationFn: async ({ params }: { params: string }) => {
        const res = await axiosInstance.patch<IPostApiResponse>(`/social-media/profile/cover-image`, { params },{headers:{
            'Content-Type': 'multipart/form-data',
        }});
        if (res.status !== 200) {
          throw new Error('Network response was not ok');
        }
        console.log(res.data)
        return res.data.data;
      },
      onSettled: () => {
        // 🚀 Invalidate and refetch all posts after successful upload
        queryClient.invalidateQueries({ queryKey: ['myProfile'] })
      },
    },
  
    )
  
  }
  