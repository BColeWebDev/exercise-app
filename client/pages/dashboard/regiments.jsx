import {useState, useEffect} from 'react'
import { Typography, Container, Fab, Box, IconButton, Paper, FormControl, TextField, ButtonGroup, Button} from "@mui/material";
import { error,success } from '../../src/components/commons/notifications';
import Modal from "../../src/components/commons/modal"
import { useSelector,useDispatch} from "react-redux";
import {getAllRegiments, createRegiments, deleteRegiment, updateRegiment, reset} from "../../src/redux/features/regiments/regimentsSlice"
import Navbar from '../../src/components/commons/navbar';
import DashboardLayout from '../../src/components/page-components/dashboard-layout';
import Spinner from "../../src/components/commons/spinner"
import Regiment from "../../src/components/page-components/Regiment"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView"
import { FaRegWindowClose } from "react-icons/fa"


const Regiments = () => {
    // Modal State
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Global State
    const dispatch = useDispatch()
    const { user, token} = useSelector((state) => state.auth)
    const { regiments , isError, isSuccess,message,isLoading } = useSelector((state) => state.regiments)
      
    // Component State
    const initalState = { list: "secondary", grid: "info", display: "dashboard-body__list", cardDisplay: "dashboard-card__list" }
    const [view, setview] = useState(initalState);
    const modalInitialState = {name:"",description:"", btnName:"Submit", title:"Create Regiment", currentId:null}
    const [form, setForm] = useState(modalInitialState);
    // Handles Cards Display
    const hanldeView = () => {
        if (view.list === 'secondary') {
            setview({ list: "info", grid: "secondary", display: "dashboard-body__grid", cardDisplay: "dashboard-card__grid" })
        }
        if (view.grid === 'secondary') {
            setview(initalState)
        }
    }
    // Component Handlers
    const handleModalChange = (e) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const createRegiment = ()=>{
        // Send Regiment 
        dispatch(createRegiments(form))

        // Close Modal
        setOpen(false)

        // Reset Form 
        setForm(modalInitialState)
    }

    // Reopens Edit Form
    const handleEdit = (name, description, id) =>{
        // Open Form
        setOpen(true)   
        // temp state change
        const  obj = {
            name: name,
            description: description,
            btnName:"Update", 
            title:"Update Regiment",
            currentId:id

        }

        // Set Form to Current Name and Description
        setForm(obj)

    }

    const updateRegiments = (id)=>{
        // Submits update regiment
        dispatch(updateRegiment({name:form.name, description: form.description, id}))
          // Close Modal
          setOpen(false)

          // Reset Form 
          setForm(modalInitialState)
    }
    const handleDelete = (id) =>{
        // Returns a message if success
       dispatch(deleteRegiment(id))
       dispatch(getAllRegiments())

    }


    useEffect(() => {
    // user is not logged in anymore return to login page
           if (user === null || token === null) {
            router.push("/")
           }
        // Error Handling 
           if(isError){
            error(message)
         }
        // Successful Message
        if(isSuccess){
            message === "" ? null : success(message)
        }
    
     // Get All regiments
        dispatch(getAllRegiments())

    // Reset Global State 
    return () => {
        dispatch(reset())
      }
        
    }, [user, token, message, isError, dispatch]);


    return (
    <>     
  {user && regiments ?
    <>
    <Navbar/>
        <DashboardLayout routes={{regiments:"regiments",exercises:"exercises", profile:"profile"}}>

            {/* Regiment Header */}
            <Paper elevation={2}>
            <Container className='dashbord-header'  sx={{marginBottom:"1.125rem"}}>
            <Typography textAlign={'Center'} padding={'1rem'} variant="h3" component={'h1'}>Regiments</Typography>
            <hr></hr>
            {/*Regiment Buttons */}
            <Box>
            <Box sx={{display:"flex", justifyContent:"flex-start"}}>
            <Fab variant="extended" sx={{ fontWeight: "700"}} color="primary" onClick={handleOpen}>Create +</Fab>
            </Box>

            </Box>
            <Box sx={{display:"flex",flexDirection:"column-reverse", alignItems:"flex-end"}}>
            <Typography  color="text.primary" fontSize={'20px'}>Results: {regiments.length} </Typography>

                <Container sx={{display:"flex", justifyContent:"flex-end"}} >
                <IconButton aria-label="list-view" onClick={hanldeView}>
                    <FormatListBulletedIcon color={view.list} fontSize="large" />
                </IconButton>
                <Typography fontSize={'40px'} color={'white'} >|</Typography>
                <IconButton onClick={hanldeView}>
                    <GridViewIcon color={view.grid} fontSize="large" />
                </IconButton>
                </Container>
            </Box>
            </Container>
            </Paper>
         
            <Paper className='dashboard-body-wrapper' elevation={0} sx={{height:"100%"}}>
            <Typography color="papayawhip" variant="h4" textAlign={'center'} component={'h2'}  sx={{marginBottom:"1.125rem"}} >Custom Regiments</Typography>
            
            {/* All Regiments */}
            {regiments.length === 0 ?
            <Box >
            <Typography color="primary" textAlign={'center'}>No Regiments. Create a regiment</Typography>
            </Box> 
            :
            <Box component={'ul'} className={`dashboard-body ${view.display}`}>


            <Regiment regiments={regiments} display={view.cardDisplay} handleDelete={handleDelete} handleEdit={handleEdit}/>
             </Box>
            }
            </Paper>     

    {/* Modal Display */}
    <Modal handleClose={handleClose} open={open} sx={{ display: "flex" }} >
                <Container sx={{ display: "flex", alignItems: "center", marginBottom: "1.125rem", justifyContent: "space-between" }}>
                    <Typography variant="h6" color={'primary'}   fontWeight={'bold'} marginRight={"1.125rem"}>{form.title}</Typography>
                    <FaRegWindowClose fontSize={30} onClick={handleClose} />
                </Container>
                <Container sx={{padding:"0px"}}>
                    <FormControl component={'form'} onSubmit={e =>{
                        e.preventDefault()
                        form.btnName === "Submit" ?
                        createRegiment()
                        :
                        updateRegiments(form.currentId)

                    }}>
                    <Box sx={{marginBottom:"1.125rem"}}>
                    <TextField id="name" label="Name" variant="outlined" type={'text'} name="name"  value={form.name}  onChange={handleModalChange} required  />
                    </Box>

                    <Box sx={{marginBottom:"1.125rem"}}>
                    <TextField id="description" label="Description" variant="outlined" type={"text"} value={form.description} name="description" onChange={handleModalChange} required/>
                    </Box>

                    <ButtonGroup sx={{display:"flex", justifyContent:"center"}}>
                        <Button variant="contained" type={'submit'}>{form.btnName}</Button>
                    </ButtonGroup>
                    </FormControl>
                </Container>
        </Modal>
        </DashboardLayout> 
    </>
    :
    <Spinner/>
    }   

    </>

    
    );

}
 
export default Regiments;