import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';

const useTypedDispatch: () => AppDispatch = useDispatch;

export default useTypedDispatch;
