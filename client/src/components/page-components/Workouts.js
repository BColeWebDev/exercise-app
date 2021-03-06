import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Link from 'next/link';
import plansServices from '../../redux/features/plans/plansServices';
import Typography from '@mui/material/Typography';
import { Button, Container, Box } from '@mui/material';
import Exercise from './Exercise';

const Workouts = ({ id, token, currentId }) => {
    // Global State 
    const TrainingDayId = id
    const [plans, setplans] = useState([]);


    useEffect(async () => {
        const response = await plansServices.getAllPlans(id, token)
        setplans(response)
    }, []);
    // Loads in all workouts 
    // When creating a workout the page gets redirect to exercises page
    // user will have the ability to add a exercise from there
    // set the training day id being selected and save in Redux
    // return back to regiments page




    return (<>
        {plans.length === 0 ?

            <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button sx={{ textAlign: "center" }} variant="contained"><Link href={{
                    pathname: "/dashboard/exercises",
                    query: { TrainingDayId: TrainingDayId, CurrentId: currentId },
                }} >Add Workout</Link></Button>
            </Container>

            :
            <>
                <Container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.125rem" }}>
                    <Typography color={"secondary"} fontWeight={"bold"}>workouts: {plans.length}</Typography>
                    <Button sx={{ textAlign: "center" }} variant="contained" color="secondary"><Link href={{
                        pathname: "/dashboard/exercises",
                        query: { TrainingDayId: TrainingDayId, CurrentId: currentId },
                    }} >Add Workout</Link>
                    </Button>
                </Container>

                {plans.map(({ name, equipment, muscle_target, bodyPart, id, imageUrl }) =>
                    <Box key={id}>
                        {/* Workout Details */}
                        <Exercise exercise={{ name, equipment, muscle_target, bodyPart, id, gifUrl: imageUrl }} display={'none'} />
                    </Box>
                )
                }
            </>
        }


    </>);
}

export default Workouts;
