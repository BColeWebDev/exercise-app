import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const success = (msg) => toast.success(msg, { autoClose: 3000 });
const error = (msg) => toast.error(msg, { autoClose: 3000 })
const info = (msg) => toast.info(msg, { autoClose: 3000 })
const warning = (msg) => toast.error(msg, { autoClose: 3000 })

export { success, error, info, warning }