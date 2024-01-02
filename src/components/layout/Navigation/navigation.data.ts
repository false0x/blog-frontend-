import HomeImage from '@/public/navigation/items/home.svg'
import ManageImage from '@/public/navigation/items/manage.svg'

export const NavigationData = [
    {
        Image: HomeImage,
        path: '/'
    },
    {
        Image: ManageImage,
        path: '/manage'
    }
]

export type NavigationItemType = typeof NavigationData[number];