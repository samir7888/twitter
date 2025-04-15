import { useMutation, useQueryClient } from "@tanstack/react-query"
import useAxiosAuth from "../useAuth"

export const useUpdateProfile = () => {
    const axiosInstance = useAxiosAuth()
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['updateAvatar'],
        mutationFn: async () => {
            const res = await axiosInstance.patch(`/users/avatar`, {}, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (res.status !== 200) {
                throw new Error('Network response was not ok')
            }

            return res.data.data;
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['myProfile'] });

        },

    })
}