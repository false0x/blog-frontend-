import { useTypedSelector } from '@/src/hooks/useTypedSelector'

export const useAuth = () => useTypedSelector(state => state.admin)